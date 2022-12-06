import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, lastValueFrom, Observable, Subject } from 'rxjs';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { ITablerCard, TablerCard } from '../class/card.class';
import { TablerTab } from '../class/tab.class';

export enum OpeningType {
	Home, Tab, Card
}
export interface TabTree {
	home: string | undefined,
	activeTab: TablerTab | undefined,
	activeCard: TablerCard | undefined,
	default: OpeningType,
	cards: TablerCard[]
	tabs: TablerTab[],
}

@Injectable({ providedIn: 'root' })
export class TabManagerService {
	private tabTree$ = new Subject<TabTree>();
	private tabTree: TabTree;
	
	private default: OpeningType = OpeningType.Home;
	private nextOpening: OpeningType = this.default;

	private _cardActivation: TablerCard | undefined = undefined;

	constructor(
		private router: Router,
		private dbService: NgxIndexedDBService,

	) { }

	async start() {
		await this.init();

		this.loadFromDb();

		this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(
			(event: any) => {
				this.processOpening(event.urlAfterRedirects);
			}
		);
	}


	onUpdate(): Observable<TabTree> {
		return this.tabTree$.asObservable();
	}

	setDefault(nextOpening: OpeningType) {
		this.default = nextOpening;
	}

	openInTab() {
		this.nextOpening = OpeningType.Tab;
	}

	openInCard() {
		this.nextOpening = OpeningType.Card;
	}

	async closeTab(id: any) {
		this.updateConfig("activeTab", undefined);
		this.updateConfig("activeCard", undefined);
		
		await lastValueFrom(this.dbService.bulkDelete('tab', [id]));

		let cards = [];
		{
			let cardsDb = await lastValueFrom(this.dbService.getAllByIndex('card', 'tab', id));
			if (cardsDb !== undefined) {
				for await (const cardDb of cardsDb) {
					let card = new TablerCard(cardDb);
					if (card.id === undefined) continue;
					cards.push(card.id);
				}
			}
		}
		await lastValueFrom(this.dbService.bulkDelete('card', cards));

		this.loadFromDb();
	}

	async closeCard(id: number) {
		await lastValueFrom(this.dbService.bulkDelete('card', [id]));
		this.loadFromDb();
	}

	cardActivation(card: TablerCard) {
		this._cardActivation = card;
	}

	tabActivation(tab: TablerTab) {
		this._cardActivation = tab.mainCard;
	}









	private async init() {
		let _loadedConfig: string[] = [];

		let configsDb = await lastValueFrom(this.dbService.getAll('config'));
		for await (const configDb of configsDb) {
			let config: any = configDb;
			_loadedConfig.push(config['name']);
		}

		if (!_loadedConfig.includes("activeTab")) {
			await lastValueFrom(this.dbService.add('config', {
				name: "activeTab",
				value: undefined,
			}));
		}

		if (!_loadedConfig.includes("activeCard")) {
			await lastValueFrom(this.dbService.add('config', {
				name: "activeCard",
				value: undefined,
			}));
		}

		if (!_loadedConfig.includes("home")) {
			await lastValueFrom(this.dbService.add('config', {
				name: "home",
				value: undefined,
			}));
		}
	}

	private async loadFromDb() {
		let newTabTree: TabTree = {
			activeTab: undefined,
			activeCard: undefined,
			home: undefined,
			default: this.default,
			tabs: [],
			cards: []
		};

		// Config
		{
			let configsDb = await lastValueFrom(this.dbService.getAll('config'));
			for await (const configDb of configsDb) {
				let config: any = configDb;
				if (config['value'] === undefined || config['value'] == "undefined") continue;
				switch (config['name']) {
					case "activeTab":
						let tabDb = await lastValueFrom(this.dbService.getByKey('tab', +config['value']));
						let tab = new TablerTab(tabDb)
						newTabTree.activeTab = tab;
						break;
					case "activeCard":
						let cardDb = await lastValueFrom(this.dbService.getByKey('card', +config['value']));
						let card = new TablerCard(cardDb)
						newTabTree.activeCard = card;
						break;
					case "home":
						newTabTree.home = config['value'];
						break;
				}
			}
		}

		// Tabs
		let _tabsDb: any = {};
		{
			let tabsDb = await lastValueFrom(this.dbService.getAll('tab'));
			if (tabsDb !== undefined) {
				let tabs: TablerTab[] = [];
				for await (const tabDb of tabsDb) {
					let tab = new TablerTab(tabDb);
					let mainCard: TablerCard = new TablerCard(await lastValueFrom(this.dbService.getByIndex('card', 'tab', +tab.id)));
					mainCard.tab = tab;
					tab.mainCard = mainCard;
					tabs.push(tab);
					_tabsDb[tab.id] = tab;
				}
				newTabTree.tabs = tabs;
			}
		}

		// Cards
		{
			let cardsDb = await lastValueFrom(this.dbService.getAll('card'))
			if (cardsDb !== undefined) {
				let cards: TablerCard[] = [];
				for await (const cardDb of cardsDb) {
					let card = new TablerCard(cardDb);
					let tabAny: any = cardDb;
					card.tab = _tabsDb[tabAny.tab];
					cards.push(card)
				}
				newTabTree.cards = cards;
			}
		}

		this.tabTree = newTabTree;
		this.tabTree$.next(this.tabTree);
	}



	private updateHome(url: string) {
		this.updateConfig("activeTab", undefined);
		this.updateConfig("activeCard", undefined);
		this.updateConfig("home", url);

		this.loadFromDb();
	}

	private activateCard(card: TablerCard) {
		this.updateConfig("activeTab", ""+card.tab.id);
		this.updateConfig("activeCard", ""+card.id);

		this.loadFromDb();
	}


















	private async processOpening(url: string) {
		if (this._cardActivation) {
			this.activateCard(this._cardActivation);
			this._cardActivation = undefined;
			return;
		}

		let openedCard: TablerCard;
		{
			let cardRequest: ITablerCard = { url: url }
			switch (this.nextOpening) {
				case OpeningType.Tab:
					openedCard = await this.newCard(cardRequest);
					this.activateCard(openedCard);
					break;
				case OpeningType.Card:
					openedCard = await this.newCard(cardRequest, this.tabTree.activeTab);
					this.activateCard(openedCard);
					break;
				default:
					this.updateHome(url);
					break;
			}
			this.nextOpening = this.default;
		}
	}

	async newCard(cardRequest: ITablerCard, tabParent: TablerTab | undefined = undefined): Promise<TablerCard> {
		let isMain: boolean = false;
		if (tabParent === undefined) {
			tabParent = await this.createTab(cardRequest.url);
			isMain = true;
		}

		let card: TablerCard = new TablerCard(await lastValueFrom(this.dbService.add('card', {
			tab: tabParent.id,
			url: cardRequest.url,
			isMain: isMain
		})));

		card.tab = tabParent;

		return card;
	}

	private async createTab(url: string) {
		let tab: TablerTab = new TablerTab(await lastValueFrom(this.dbService.add('tab', {
			url: url
		})));
		return tab;
	}

	
	private async updateConfig(config: string, value: string | undefined) {
		await lastValueFrom(this.dbService.update('config', {
			name: config,
			value: value,
		}));
	}
/*
	private async openTab(url: string) {
		let tab: TablerTab = new TablerTab(await lastValueFrom(this.dbService.add('tab', {
			url: url
		})));

		// Scrive questa cosa in db
		this.tabTree.activeTab = tab;

		this.loadFromDb();
	}
*/
	

	/*
	private async openCard(url: string) {
		let tabParent = this.activeTab;
		if (tabParent === undefined) {
			tabParent = await this.createTab(url);
		}

		let card: TablerCard = new TablerCard(await lastValueFrom(this.dbService.add('card', {
			tab: tabParent.id,
			url: url,
		})));

		this.activeCard = card;
		this.tabTree.activeCard = this.activeCard;

		//active card

		this.loadFromDb();
	}
	*/



	/*
	private async createCard(url: string) {
		if (this.activeTab === undefined) {
			this.openTab(url);
			return;
			//throw new Error('No active tab');
		}

		let card: TablerCard = new TablerCard(await lastValueFrom(this.dbService.add('card', {
			tab: this.activeTab.id,
			url: url,
		})));

		this.activeCard = card;
		this.tabTree.activeCard = this.activeCard;

		//active card

		this.loadFromDb();
	}
*/


	


}
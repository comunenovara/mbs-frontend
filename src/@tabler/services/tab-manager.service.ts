import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, lastValueFrom, Observable, Subject } from 'rxjs';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { TablerCard } from '../class/card.class';
import { TablerTab } from '../class/tab.class';

export enum OpeningType {
	Home, Tab, Card
}
export interface TabTree {
	home: string | undefined,
	activeTab: TablerTab | undefined,
	activeCard: TablerCard | undefined,
	default: OpeningType,
	tabs: TablerTab[]
}

@Injectable({ providedIn: 'root' })
export class TabManagerService {
	constructor(
		private router: Router,
		private dbService: NgxIndexedDBService,

	) { }

	private tabTreeSubject = new Subject<TabTree>();

	start() {
		this.loadFromDb();

		this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(
			(event: any) => {
				this.processOpening(event.urlAfterRedirects);
			}
		);
	}

	onUpdate(): Observable<TabTree> {
		return this.tabTreeSubject.asObservable();
	}


	private default: OpeningType = OpeningType.Home;
	private nextOpening: OpeningType = this.default;

	setDefault(nextOpening: OpeningType) {
		this.default = nextOpening;
	}

	openInTab() {
		this.nextOpening = OpeningType.Tab;
	}

	openInCard() {
		this.nextOpening = OpeningType.Card;
	}

	async closeTab(id: number) {
		await lastValueFrom(this.dbService.bulkDelete('tab', [id]));
		this.loadFromDb();
	}

	async closeCard(id: number) {
		await lastValueFrom(this.dbService.bulkDelete('card', [id]));
		this.loadFromDb();
	}

	private activation: boolean = false;
	tabActivation(tab: TablerTab) {
		this.tabTree.activeTab = tab;
		this.tabTree.activeCard = undefined;
		this.activation = true;
	}

	cardActivation(card: TablerCard) {
		this.tabTree.activeCard = card;
		this.activation = true;
	}










	private tabTree: TabTree = {
		home: undefined,
		activeTab: undefined,
		activeCard: undefined,
		default: this.default,
		tabs: []
	};
	private activeTab: TablerTab | undefined;
	private activeCard: TablerCard | undefined;

	private processOpening(url: string) {
		if(this.activation) {
			this.activation = false;
			return;
		}
		switch (this.nextOpening) {
			case OpeningType.Tab:
				this.openTab(url);
				break;
			case OpeningType.Card:
				this.openCard(url);
				break;
			default:
				this.updateHome(url);
				break;
		}
		this.nextOpening = this.default;
	}

	private updateHome(url: string) {
		this.tabTree.home = url;
		this.tabTree.activeTab = undefined;
		this.tabTreeSubject.next(this.tabTree);
	}

	private async openTab(url: string) {
		let tab: TablerTab = new TablerTab(await lastValueFrom(this.dbService.add('tab', {
			url: url
		})));

		// selected tab
		this.activeTab = tab;
		this.tabTree.activeTab = this.activeTab;

		this.loadFromDb();
	}

	private async openCard(url: string) {
		if(this.activeTab === undefined) {
			throw new Error('No active tab');
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

	private async loadFromDb() {
		let tabsDb = await lastValueFrom(this.dbService.getAll('tab'));
		if (tabsDb !== undefined) {
			let tabs: TablerTab[] = [];
			for await(const tabDb of tabsDb) {
				let tab = new TablerTab(tabDb);
				{
					let id: any = tab.id;
					let cardsDb = await lastValueFrom(this.dbService.getAllByIndex('card', 'tab', id))
					if (cardsDb !== undefined) {
						for await (const cardDb of cardsDb) {
							tab.cards.push(new TablerCard(cardDb));
						}
					}
				}
				tabs.push(tab);
			}
			this.tabTree.tabs = tabs;
			this.tabTreeSubject.next(this.tabTree);
		}
	}

}
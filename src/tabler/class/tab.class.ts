import { TablerCard } from "./card.class";

export interface ITablerTab {
	id?: number;
	url: string;
    cards: TablerCard[];
}

export class TablerTab implements ITablerTab {
	id?: number;
	url: string;
    cards: TablerCard[];

	constructor(obj: any) {
		if(obj.url === undefined) {
			throw new Error('No url in obj');
		}
		this.url = obj.url;

        this.cards = obj.cards;
        if(this.cards === undefined) {
			this.cards = [];
		}
		

		this.id = obj.id;
	}
}

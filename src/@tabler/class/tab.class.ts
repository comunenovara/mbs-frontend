import { TablerCard } from "./card.class";

export interface ITablerTab {
	id?: number;
	url: string;
	mainCard?: TablerCard;
}

export class TablerTab implements ITablerTab {
	id: number;
	url: string;
	mainCard?: TablerCard;

	constructor(obj: any) {
		if(obj.url === undefined) {
			throw new Error('No url in obj');
		}
		this.url = obj.url;

		this.id = obj.id;
	}
}

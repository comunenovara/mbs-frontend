export interface ITablerCard {
	id?: number;
	tab: number;
	url: string;
}

export class TablerCard implements ITablerCard {
	id?: number;
	tab: number;
	url: string;

	constructor(obj: any) {
		if(obj.url === undefined) {
			throw new Error('No url in obj');
		}
		this.url = obj.url;

		if(obj.tab === undefined) {
			throw new Error('No tab in obj');
		}
		this.tab = obj.tab;

		this.id = obj.id;
	}
}

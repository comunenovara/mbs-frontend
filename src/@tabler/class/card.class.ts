import { TablerTab } from "./tab.class";

export interface ITablerCard {
	id?: number;
	url: string;
	isMain?: boolean;
	tab?: TablerTab;
}

export class TablerCard implements ITablerCard {
	id: number;
	url: string;
	isMain: boolean;
	tab: TablerTab;

	constructor(obj: any) { //ITablerCard
		if(obj.url === undefined) {
			throw new Error('No url in obj');
		}
		this.url = obj.url;

		if(obj.tab === undefined) {
			throw new Error('No tab in obj');
		}
		this.tab = obj.tab;

		if(obj.isMain === undefined) {
			this.isMain = false;
		} else {
			this.isMain = obj.isMain;
		}

		this.id = obj.id;
	}
}

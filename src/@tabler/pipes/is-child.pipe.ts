import { PipeTransform, Pipe } from '@angular/core';
import { TablerCard } from '@tabler/class/card.class';
import { TablerTab } from '@tabler/class/tab.class';

@Pipe({
	name: 'isChild',
	pure: false
})
export class IsChildPipe implements PipeTransform {
	transform(cards: TablerCard[], tab: TablerTab) {
		if (!cards || !tab) {
			return [];
		}
		let filteredCards: TablerCard[] = [];
		for (let card of cards) {
			if(card.tab.id == tab.id) {
				filteredCards.push(card);
			}
		}
		return filteredCards;
	}
}
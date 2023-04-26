import { Component, Input, OnInit } from '@angular/core';
import { MbsWorkCategoryDto } from '../../../class/work-category-dto.class';

@Component({
	selector: 'mbs-work-category-detail-box',
	templateUrl: './work-category-detail-box.component.html',
	styleUrls: ['./work-category-detail-box.component.scss']
})
export class MbsWorkCategoryDetailBoxComponent {

	@Input()
	workCategory: MbsWorkCategoryDto;

	constructor( ) { }
}
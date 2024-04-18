import { Component, Input, OnInit } from '@angular/core';
import { MbsProcurementTypeDto } from '../../../class/procurement-type-dto.class';

@Component({
	selector: 'mbs-procurement-type-detail-box',
	templateUrl: './procurement-type-detail-box.component.html',
	styleUrls: ['./procurement-type-detail-box.component.scss']
})
export class MbsProcurementTypeDetailBoxComponent {

	@Input()
	procurementType: MbsProcurementTypeDto;

	constructor( ) { }
}
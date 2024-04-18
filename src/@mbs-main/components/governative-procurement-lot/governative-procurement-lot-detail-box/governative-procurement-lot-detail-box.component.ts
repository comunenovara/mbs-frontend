import { Component, Input, OnInit } from '@angular/core';
import { MbsGovernativeProcurementLotDto } from '../../../class/governative-procurement-lot-dto.class';

@Component({
	selector: 'mbs-governative-procurement-lot-detail-box',
	templateUrl: './governative-procurement-lot-detail-box.component.html',
	styleUrls: ['./governative-procurement-lot-detail-box.component.scss']
})
export class MbsGovernativeProcurementLotDetailBoxComponent {

	@Input()
	governativeProcurementLot: MbsGovernativeProcurementLotDto;

	constructor( ) { }
}
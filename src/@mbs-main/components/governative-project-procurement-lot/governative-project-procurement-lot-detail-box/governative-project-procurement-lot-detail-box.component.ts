import { Component, Input, OnInit } from '@angular/core';
import { MbsGovernativeProjectProcurementLotDto } from '../../../class/governative-project-procurement-lot-dto.class';

@Component({
	selector: 'mbs-governative-project-procurement-lot-detail-box',
	templateUrl: './governative-project-procurement-lot-detail-box.component.html',
	styleUrls: ['./governative-project-procurement-lot-detail-box.component.scss']
})
export class MbsGovernativeProjectProcurementLotDetailBoxComponent {

	@Input()
	governativeProjectProcurementLot: MbsGovernativeProjectProcurementLotDto;

	constructor( ) { }
}
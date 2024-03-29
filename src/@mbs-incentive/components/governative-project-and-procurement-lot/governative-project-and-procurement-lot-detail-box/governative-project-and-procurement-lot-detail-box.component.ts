import { Component, Input, OnInit } from '@angular/core';
import { MbsGovernativeProjectAndProcurementLotDto } from '../../../class/governative-project-and-procurement-lot-dto.class';

@Component({
	selector: 'mbs-governative-project-and-procurement-lot-detail-box',
	templateUrl: './governative-project-and-procurement-lot-detail-box.component.html',
	styleUrls: ['./governative-project-and-procurement-lot-detail-box.component.scss']
})
export class MbsGovernativeProjectAndProcurementLotDetailBoxComponent {

	@Input()
	governativeProjectAndProcurementLot: MbsGovernativeProjectAndProcurementLotDto;

	constructor( ) { }
}
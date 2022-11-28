import { Component, Input, OnInit } from '@angular/core';
import { MbsOperationDTO } from '../../../class/operation-dto.class';

@Component({
	selector: 'mbs-operation-detail-box',
	templateUrl: './operation-detail-box.component.html',
	styleUrls: ['./operation-detail-box.component.scss']
})
export class MbsOperationDetailBoxComponent {

	@Input()
	operation: MbsOperationDTO;

	constructor( ) { }
}
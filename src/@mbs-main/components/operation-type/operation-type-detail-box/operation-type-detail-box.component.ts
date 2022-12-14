import { Component, Input, OnInit } from '@angular/core';
import { MbsOperationTypeDto } from '../../../class/operation-type-dto.class';

@Component({
	selector: 'mbs-operation-type-detail-box',
	templateUrl: './operation-type-detail-box.component.html',
	styleUrls: ['./operation-type-detail-box.component.scss']
})
export class MbsOperationTypeDetailBoxComponent {

	@Input()
	operationType: MbsOperationTypeDto;

	constructor( ) { }
}
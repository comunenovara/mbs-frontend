import { Component, Input, OnInit } from '@angular/core';
import { MbsAssignementDto } from '../../../class/assignement-dto.class';

@Component({
	selector: 'mbs-assignement-detail-box',
	templateUrl: './assignement-detail-box.component.html',
	styleUrls: ['./assignement-detail-box.component.scss']
})
export class MbsAssignementDetailBoxComponent {

	@Input()
	assignement: MbsAssignementDto;

	constructor( ) { }
}
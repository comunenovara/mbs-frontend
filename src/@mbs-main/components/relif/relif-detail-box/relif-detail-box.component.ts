import { Component, Input, OnInit } from '@angular/core';
import { MbsRelifDTO } from '../../../class/relif-dto.class';

@Component({
	selector: 'mbs-relif-detail-box',
	templateUrl: './relif-detail-box.component.html',
	styleUrls: ['./relif-detail-box.component.scss']
})
export class MbsRelifDetailBoxComponent {

	@Input()
	relif: MbsRelifDTO;

	constructor( ) { }
}
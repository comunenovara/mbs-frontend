import { Component, Input, OnInit } from '@angular/core';
import { MbsWithheldDto } from '../../../class/withheld-dto.class';

@Component({
	selector: 'mbs-withheld-detail-box',
	templateUrl: './withheld-detail-box.component.html',
	styleUrls: ['./withheld-detail-box.component.scss']
})
export class MbsWithheldDetailBoxComponent {

	@Input()
	withheld: MbsWithheldDto;

	constructor( ) { }
}
import { Component, Input, OnInit } from '@angular/core';
import { MbsNominaDto } from '../../../class/nomina-dto.class';

@Component({
	selector: 'mbs-nomina-detail-box',
	templateUrl: './nomina-detail-box.component.html',
	styleUrls: ['./nomina-detail-box.component.scss']
})
export class MbsNominaDetailBoxComponent {

	@Input()
	nomina: MbsNominaDto;

	constructor( ) { }
}
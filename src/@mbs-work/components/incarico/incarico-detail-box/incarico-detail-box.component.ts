import { Component, Input, OnInit } from '@angular/core';
import { MbsIncaricoDto } from '../../../class/incarico-dto.class';

@Component({
	selector: 'mbs-incarico-detail-box',
	templateUrl: './incarico-detail-box.component.html',
	styleUrls: ['./incarico-detail-box.component.scss']
})
export class MbsIncaricoDetailBoxComponent {

	@Input()
	incarico: MbsIncaricoDto;

	constructor( ) { }
}
import { Component, Input, OnInit } from '@angular/core';
import { MbsProgettoDto } from '../../../class/progetto-dto.class';

@Component({
	selector: 'mbs-progetto-detail-box',
	templateUrl: './progetto-detail-box.component.html',
	styleUrls: ['./progetto-detail-box.component.scss']
})
export class MbsProgettoDetailBoxComponent {

	@Input()
	progetto: MbsProgettoDto;

	constructor( ) { }
}
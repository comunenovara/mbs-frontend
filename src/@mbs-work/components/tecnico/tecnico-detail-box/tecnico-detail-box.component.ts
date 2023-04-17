import { Component, Input, OnInit } from '@angular/core';
import { MbsTecnicoDto } from '../../../class/tecnico-dto.class';

@Component({
	selector: 'mbs-tecnico-detail-box',
	templateUrl: './tecnico-detail-box.component.html',
	styleUrls: ['./tecnico-detail-box.component.scss']
})
export class MbsTecnicoDetailBoxComponent {

	@Input()
	tecnico: MbsTecnicoDto;

	constructor( ) { }
}
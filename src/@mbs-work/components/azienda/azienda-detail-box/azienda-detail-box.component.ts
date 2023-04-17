import { Component, Input, OnInit } from '@angular/core';
import { MbsAziendaDto } from '../../../class/azienda-dto.class';

@Component({
	selector: 'mbs-azienda-detail-box',
	templateUrl: './azienda-detail-box.component.html',
	styleUrls: ['./azienda-detail-box.component.scss']
})
export class MbsAziendaDetailBoxComponent {

	@Input()
	azienda: MbsAziendaDto;

	constructor( ) { }
}
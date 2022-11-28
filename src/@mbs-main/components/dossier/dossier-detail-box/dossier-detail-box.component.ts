import { Component, Input, OnInit } from '@angular/core';
import { MbsDossierDTO } from '../../../class/dossier-dto.class';

@Component({
	selector: 'mbs-dossier-detail-box',
	templateUrl: './dossier-detail-box.component.html',
	styleUrls: ['./dossier-detail-box.component.scss']
})
export class MbsDossierDetailBoxComponent {

	@Input()
	dossier: MbsDossierDTO;

	constructor( ) { }
}
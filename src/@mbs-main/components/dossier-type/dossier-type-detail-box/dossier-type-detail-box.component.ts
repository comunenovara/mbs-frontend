import { Component, Input, OnInit } from '@angular/core';
import { MbsDossierTypeDto } from '../../../class/dossier-type-dto.class';

@Component({
	selector: 'mbs-dossier-type-detail-box',
	templateUrl: './dossier-type-detail-box.component.html',
	styleUrls: ['./dossier-type-detail-box.component.scss']
})
export class MbsDossierTypeDetailBoxComponent {

	@Input()
	dossierType: MbsDossierTypeDto;

	constructor( ) { }
}
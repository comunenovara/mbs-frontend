import { Component, Input, OnInit } from '@angular/core';
import { MbsFaseDto } from '../../../class/fase-dto.class';

@Component({
	selector: 'mbs-fase-detail-box',
	templateUrl: './fase-detail-box.component.html',
	styleUrls: ['./fase-detail-box.component.scss']
})
export class MbsFaseDetailBoxComponent {

	@Input()
	fase: MbsFaseDto;

	constructor( ) { }
}
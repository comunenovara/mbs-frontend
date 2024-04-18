import { Component, Input, OnInit } from '@angular/core';
import { MbsElaborateGroupDto } from '../../../class/elaborate-group-dto.class';

@Component({
	selector: 'mbs-elaborate-group-detail-box',
	templateUrl: './elaborate-group-detail-box.component.html',
	styleUrls: ['./elaborate-group-detail-box.component.scss']
})
export class MbsElaborateGroupDetailBoxComponent {

	@Input()
	elaborateGroup: MbsElaborateGroupDto;

	constructor( ) { }
}
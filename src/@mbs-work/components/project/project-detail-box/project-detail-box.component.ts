import { Component, Input, OnInit } from '@angular/core';
import { MbsProjectDto } from '../../../class/project-dto.class';

@Component({
	selector: 'mbs-project-detail-box',
	templateUrl: './project-detail-box.component.html',
	styleUrls: ['./project-detail-box.component.scss']
})
export class MbsProjectDetailBoxComponent {

	@Input()
	project: MbsProjectDto;

	constructor( ) { }
}
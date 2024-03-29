import { Component, Input, OnInit } from '@angular/core';
import { MbsGovernativeProjectDto } from '../../../class/governative-project-dto.class';

@Component({
	selector: 'mbs-governative-project-detail-box',
	templateUrl: './governative-project-detail-box.component.html',
	styleUrls: ['./governative-project-detail-box.component.scss']
})
export class MbsGovernativeProjectDetailBoxComponent {

	@Input()
	governativeProject: MbsGovernativeProjectDto;

	constructor( ) { }
}
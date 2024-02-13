import { Component, Input, OnInit } from '@angular/core';
import { MbsStageDto } from '../../../class/stage-dto.class';

@Component({
	selector: 'mbs-stage-detail-box',
	templateUrl: './stage-detail-box.component.html',
	styleUrls: ['./stage-detail-box.component.scss']
})
export class MbsStageDetailBoxComponent {

	@Input()
	stage: MbsStageDto;

	constructor( ) { }
}
import { Component, Input, OnInit } from '@angular/core';
import { MbsIncentiveStageDto } from '../../../class/incentive-stage-dto.class';

@Component({
	selector: 'mbs-incentive-stage-detail-box',
	templateUrl: './incentive-stage-detail-box.component.html',
	styleUrls: ['./incentive-stage-detail-box.component.scss']
})
export class MbsIncentiveStageDetailBoxComponent {

	@Input()
	incentiveStage: MbsIncentiveStageDto;

	constructor( ) { }
}
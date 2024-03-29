import { Component, Input, OnInit } from '@angular/core';
import { MbsIncentiveAssignationStageDto } from '../../../class/incentive-assignation-stage-dto.class';

@Component({
	selector: 'mbs-incentive-assignation-stage-detail-box',
	templateUrl: './incentive-assignation-stage-detail-box.component.html',
	styleUrls: ['./incentive-assignation-stage-detail-box.component.scss']
})
export class MbsIncentiveAssignationStageDetailBoxComponent {

	@Input()
	incentiveAssignationStage: MbsIncentiveAssignationStageDto;

	constructor( ) { }
}
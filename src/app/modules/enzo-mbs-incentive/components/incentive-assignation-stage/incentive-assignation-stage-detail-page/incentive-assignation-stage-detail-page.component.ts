import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { DialogService } from 'primeng/dynamicdialog';

import { StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { EngeAppCommonService, EngeAppGenericDetailPageComponent } from "@enge/common-app";

import { MbsIncentiveAssignationStageDto, MbsIncentiveAssignationStageResourceService} from '@mbs-incentive';
import { EnzoIncentiveAssignationStageDialogComponent } from '../incentive-assignation-stage-dialog/incentive-assignation-stage-dialog.component';

@Component({
	selector: 'enzo-incentive-assignation-stage-detail-page',
	templateUrl: './incentive-assignation-stage-detail-page.component.html',
	styleUrls: ['./incentive-assignation-stage-detail-page.component.scss']
})
export class EnzoIncentiveAssignationStageDetailPageComponent extends EngeAppGenericDetailPageComponent {
	constructor(
		eacs: EngeAppCommonService,
		route: ActivatedRoute,
		//public tabManagerService: TabManagerService,
		private dialogService: DialogService,
		private resourceService: MbsIncentiveAssignationStageResourceService,
	) { super(eacs, route); }

	incentiveAssignationStageDto: MbsIncentiveAssignationStageDto;

	override onLoad() {
		this.incentiveAssignationStageDto = this.route.snapshot.data['incentiveAssignationStage'];
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "incentiveAssignationStage") this.reloadPage();
	}

	override async reloadPage() {
		this.incentiveAssignationStageDto = await lastValueFrom(this.resourceService.getIncentiveAssignationStageUsingGET(this.id));
	}

	editIncentiveAssignationStage(incentiveAssignationStage: MbsIncentiveAssignationStageDto) {
		const ref = this.dialogService.open(EnzoIncentiveAssignationStageDialogComponent, {
			data: { incentiveAssignationStage: incentiveAssignationStage },
			header: 'Update incentiveAssignationStage',
			width: '70%'
		});
	}

	async deleteIncentiveAssignationStage(incentiveAssignationStage: MbsIncentiveAssignationStageDto) {
		if(incentiveAssignationStage.id === undefined) return;
		await lastValueFrom(this.resourceService.deleteIncentiveAssignationStageUsingDELETE(incentiveAssignationStage.id));
	}

}




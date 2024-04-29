import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { DialogService } from 'primeng/dynamicdialog';

import { StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';


import { EngeAppCommonService, EngeAppGenericDetailPageComponent } from "@enge/common-app";

import { MbsIncentiveStageDto, MbsIncentiveStageResourceService} from '@mbs-main';
import { EnzoIncentiveStageDialogComponent } from '../incentive-stage-dialog/incentive-stage-dialog.component';
import { EnzoIncentiveRegulationValueDialogComponent } from "../../incentive-regulation-value/incentive-regulation-value-dialog/incentive-regulation-value-dialog.component";

@Component({
	selector: 'enzo-incentive-stage-detail-page',
	templateUrl: './incentive-stage-detail-page.component.html',
	styleUrls: ['./incentive-stage-detail-page.component.scss']
})
export class EnzoIncentiveStageDetailPageComponent extends EngeAppGenericDetailPageComponent {
	constructor(
		eacs: EngeAppCommonService,
		route: ActivatedRoute,
		//public tabManagerService: TabManagerService,
		private dialogService: DialogService,
		private resourceService: MbsIncentiveStageResourceService,
	) { super(eacs, route); }

	incentiveStageDto: MbsIncentiveStageDto;

	override onLoad() {
		this.incentiveStageDto = this.route.snapshot.data['incentiveStage'];
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "incentiveStage") this.reloadPage();
	}

	override async reloadPage() {
		this.incentiveStageDto = await lastValueFrom(this.resourceService.getIncentiveStageUsingGET(this.id));
	}

	editIncentiveStage(incentiveStage: MbsIncentiveStageDto) {
		const ref = this.dialogService.open(EnzoIncentiveStageDialogComponent, {
			data: { incentiveStage: incentiveStage },
			header: 'Update incentiveStage',
			width: '70%'
		});
	}

	async deleteIncentiveStage(incentiveStage: MbsIncentiveStageDto) {
		if(incentiveStage.id === undefined) return;
		await lastValueFrom(this.resourceService.deleteIncentiveStageUsingDELETE(incentiveStage.id));
	}

	createNewIncentiveRegulationValue(incentiveStageDto: MbsIncentiveStageDto) {
		this.dialogService.open(EnzoIncentiveRegulationValueDialogComponent, {
			header: 'Create IncentiveRegulationValue',
			width: '70%',
			data: {
				stage: incentiveStageDto
			}
		});
	}

	protected incentiveRegulationValueTableButtons: any[] = [
		{
			label: "Dettagli",
			hideLabel: true,
			icon: "pi pi-search",
			severity: "secondary",
			class: "p-button-sm p-button-outlined",
			link: "../../../incentive-regulation-value/detail",
			////command: (e: any) => this.tabManagerService.openInCard(),
		}
	];
	protected incentiveRegulationValueListPaginator: StalPaginator = {
		page: 0,
		size: 10
	};
	protected incentiveRegulationValueCount: number;

}




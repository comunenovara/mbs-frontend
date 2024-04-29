import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { DialogService } from 'primeng/dynamicdialog';

import { StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';


import { EngeAppCommonService, EngeAppGenericDetailPageComponent } from "@enge/common-app";

import { MbsIncentiveRoleValueDto, MbsIncentiveRoleValueResourceService} from '@mbs-incentive';
import { EnzoIncentiveRoleValueDialogComponent } from '../incentive-role-value-dialog/incentive-role-value-dialog.component';
import { EnzoIncentiveAssignationStageDialogComponent } from "../../incentive-assignation-stage/incentive-assignation-stage-dialog/incentive-assignation-stage-dialog.component";

@Component({
	selector: 'enzo-incentive-role-value-detail-page',
	templateUrl: './incentive-role-value-detail-page.component.html',
	styleUrls: ['./incentive-role-value-detail-page.component.scss']
})
export class EnzoIncentiveRoleValueDetailPageComponent extends EngeAppGenericDetailPageComponent {
	constructor(
		eacs: EngeAppCommonService,
		route: ActivatedRoute,
		//public tabManagerService: TabManagerService,
		private dialogService: DialogService,
		private resourceService: MbsIncentiveRoleValueResourceService,
	) { super(eacs, route); }

	incentiveRoleValueDto: MbsIncentiveRoleValueDto;

	override onLoad() {
		this.incentiveRoleValueDto = this.route.snapshot.data['incentiveRoleValue'];
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "incentiveRoleValue") this.reloadPage();
	}

	override async reloadPage() {
		this.incentiveRoleValueDto = await lastValueFrom(this.resourceService.getIncentiveRoleValueUsingGET(this.id));
	}

	editIncentiveRoleValue(incentiveRoleValue: MbsIncentiveRoleValueDto) {
		const ref = this.dialogService.open(EnzoIncentiveRoleValueDialogComponent, {
			data: { incentiveRoleValue: incentiveRoleValue },
			header: 'Update incentiveRoleValue',
			width: '70%'
		});
	}

	async deleteIncentiveRoleValue(incentiveRoleValue: MbsIncentiveRoleValueDto) {
		if(incentiveRoleValue.id === undefined) return;
		await lastValueFrom(this.resourceService.deleteIncentiveRoleValueUsingDELETE(incentiveRoleValue.id));
	}

	createNewIncentiveAssignationStage(incentiveRoleValueDto: MbsIncentiveRoleValueDto) {
		this.dialogService.open(EnzoIncentiveAssignationStageDialogComponent, {
			header: 'Create IncentiveAssignationStage',
			width: '70%',
			data: {
				assignationRoleValue: incentiveRoleValueDto
			}
		});
	}

	protected incentiveAssignationStageTableButtons: any[] = [
		{
			label: "Dettagli",
			hideLabel: true,
			icon: "pi pi-search",
			severity: "secondary",
			class: "p-button-sm p-button-outlined",
			link: "../../../incentive-assignation-stage/detail",
			////command: (e: any) => this.tabManagerService.openInCard(),
		}
	];
	protected incentiveAssignationStageListPaginator: StalPaginator = {
		page: 0,
		size: 10
	};
	protected incentiveAssignationStageCount: number;

}




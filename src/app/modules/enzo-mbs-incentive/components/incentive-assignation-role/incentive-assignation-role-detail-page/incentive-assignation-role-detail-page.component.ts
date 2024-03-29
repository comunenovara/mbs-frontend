import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { DialogService } from 'primeng/dynamicdialog';

import { StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { EngeAppCommonService, EngeAppGenericDetailPageComponent } from "@enge/common-app";

import { MbsIncentiveAssignationRoleDto, MbsIncentiveAssignationRoleResourceService} from '@mbs-incentive';
import { EnzoIncentiveAssignationRoleDialogComponent } from '../incentive-assignation-role-dialog/incentive-assignation-role-dialog.component';
import { EnzoIncentiveAssignationStageDialogComponent } from "../../incentive-assignation-stage/incentive-assignation-stage-dialog/incentive-assignation-stage-dialog.component";

@Component({
	selector: 'enzo-incentive-assignation-role-detail-page',
	templateUrl: './incentive-assignation-role-detail-page.component.html',
	styleUrls: ['./incentive-assignation-role-detail-page.component.scss']
})
export class EnzoIncentiveAssignationRoleDetailPageComponent extends EngeAppGenericDetailPageComponent {
	constructor(
		eacs: EngeAppCommonService,
		route: ActivatedRoute,
		//public tabManagerService: TabManagerService,
		private dialogService: DialogService,
		private resourceService: MbsIncentiveAssignationRoleResourceService,
	) { super(eacs, route); }

	incentiveAssignationRoleDto: MbsIncentiveAssignationRoleDto;

	override onLoad() {
		this.incentiveAssignationRoleDto = this.route.snapshot.data['incentiveAssignationRole'];
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "incentiveAssignationRole") this.reloadPage();
	}

	override async reloadPage() {
		this.incentiveAssignationRoleDto = await lastValueFrom(this.resourceService.getIncentiveAssignationRoleUsingGET(this.id));
	}

	editIncentiveAssignationRole(incentiveAssignationRole: MbsIncentiveAssignationRoleDto) {
		const ref = this.dialogService.open(EnzoIncentiveAssignationRoleDialogComponent, {
			data: { incentiveAssignationRole: incentiveAssignationRole },
			header: 'Update incentiveAssignationRole',
			width: '70%'
		});
	}

	async deleteIncentiveAssignationRole(incentiveAssignationRole: MbsIncentiveAssignationRoleDto) {
		if(incentiveAssignationRole.id === undefined) return;
		await lastValueFrom(this.resourceService.deleteIncentiveAssignationRoleUsingDELETE(incentiveAssignationRole.id));
	}

	createNewIncentiveAssignationStage(incentiveAssignationRoleDto: MbsIncentiveAssignationRoleDto) {
		this.dialogService.open(EnzoIncentiveAssignationStageDialogComponent, {
			header: 'Create IncentiveAssignationStage',
			width: '70%',
			data: {
				assignationRole: incentiveAssignationRoleDto
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
			//command: (e: any) => this.tabManagerService.openInCard(),
		}
	];
	protected incentiveAssignationStageListPaginator: StalPaginator = {
		page: 0,
		size: 10
	};
	protected incentiveAssignationStageCount: number;

}




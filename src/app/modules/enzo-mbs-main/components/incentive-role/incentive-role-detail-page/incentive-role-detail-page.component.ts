import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { DialogService } from 'primeng/dynamicdialog';

import { StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';


import { EngeAppCommonService, EngeAppGenericDetailPageComponent } from "@enge/common-app";

import { MbsIncentiveRoleDto, MbsIncentiveRoleResourceService} from '@mbs-main';
import { EnzoIncentiveRoleDialogComponent } from '../incentive-role-dialog/incentive-role-dialog.component';
import { EnzoIncentiveRegulationValueDialogComponent } from "../../incentive-regulation-value/incentive-regulation-value-dialog/incentive-regulation-value-dialog.component";
import { EnzoIncentiveRoleAssignationDialogComponent } from "../../incentive-role-assignation/incentive-role-assignation-dialog/incentive-role-assignation-dialog.component";

@Component({
	selector: 'enzo-incentive-role-detail-page',
	templateUrl: './incentive-role-detail-page.component.html',
	styleUrls: ['./incentive-role-detail-page.component.scss']
})
export class EnzoIncentiveRoleDetailPageComponent extends EngeAppGenericDetailPageComponent {
	constructor(
		eacs: EngeAppCommonService,
		route: ActivatedRoute,
		//public tabManagerService: TabManagerService,
		private dialogService: DialogService,
		private resourceService: MbsIncentiveRoleResourceService,
	) { super(eacs, route); }

	incentiveRoleDto: MbsIncentiveRoleDto;

	override onLoad() {
		this.incentiveRoleDto = this.route.snapshot.data['incentiveRole'];
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "incentiveRole") this.reloadPage();
	}

	override async reloadPage() {
		this.incentiveRoleDto = await lastValueFrom(this.resourceService.getIncentiveRoleUsingGET(this.id));
	}

	editIncentiveRole(incentiveRole: MbsIncentiveRoleDto) {
		const ref = this.dialogService.open(EnzoIncentiveRoleDialogComponent, {
			data: { incentiveRole: incentiveRole },
			header: 'Update incentiveRole',
			width: '70%'
		});
	}

	async deleteIncentiveRole(incentiveRole: MbsIncentiveRoleDto) {
		if(incentiveRole.id === undefined) return;
		await lastValueFrom(this.resourceService.deleteIncentiveRoleUsingDELETE(incentiveRole.id));
	}

	createNewIncentiveRegulationValue(incentiveRoleDto: MbsIncentiveRoleDto) {
		this.dialogService.open(EnzoIncentiveRegulationValueDialogComponent, {
			header: 'Create IncentiveRegulationValue',
			width: '70%',
			data: {
				role: incentiveRoleDto
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

	createNewIncentiveRoleAssignation(incentiveRoleDto: MbsIncentiveRoleDto) {
		this.dialogService.open(EnzoIncentiveRoleAssignationDialogComponent, {
			header: 'Create IncentiveRoleAssignation',
			width: '70%',
			data: {
				role: incentiveRoleDto
			}
		});
	}

	protected incentiveRoleAssignationTableButtons: any[] = [
		{
			label: "Dettagli",
			hideLabel: true,
			icon: "pi pi-search",
			severity: "secondary",
			class: "p-button-sm p-button-outlined",
			link: "../../../incentive-role-assignation/detail",
			////command: (e: any) => this.tabManagerService.openInCard(),
		}
	];
	protected incentiveRoleAssignationListPaginator: StalPaginator = {
		page: 0,
		size: 10
	};
	protected incentiveRoleAssignationCount: number;

}




import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { DialogService } from 'primeng/dynamicdialog';

import { StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { EngeAppCommonService, EngeAppGenericDetailPageComponent } from "@enge/common-app";

import { MbsIncentiveRoleAssignationDto, MbsIncentiveRoleAssignationResourceService} from '@mbs-main';
import { EnzoIncentiveRoleAssignationDialogComponent } from '../incentive-role-assignation-dialog/incentive-role-assignation-dialog.component';
import { EnzoIncentiveAssignationDialogComponent } from "../../incentive-assignation/incentive-assignation-dialog/incentive-assignation-dialog.component";

@Component({
	selector: 'enzo-incentive-role-assignation-detail-page',
	templateUrl: './incentive-role-assignation-detail-page.component.html',
	styleUrls: ['./incentive-role-assignation-detail-page.component.scss']
})
export class EnzoIncentiveRoleAssignationDetailPageComponent extends EngeAppGenericDetailPageComponent {
	constructor(
		eacs: EngeAppCommonService,
		route: ActivatedRoute,
		//public tabManagerService: TabManagerService,
		private dialogService: DialogService,
		private resourceService: MbsIncentiveRoleAssignationResourceService,
	) { super(eacs, route); }

	incentiveRoleAssignationDto: MbsIncentiveRoleAssignationDto;

	override onLoad() {
		this.incentiveRoleAssignationDto = this.route.snapshot.data['incentiveRoleAssignation'];
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "incentiveRoleAssignation") this.reloadPage();
	}

	override async reloadPage() {
		this.incentiveRoleAssignationDto = await lastValueFrom(this.resourceService.getIncentiveRoleAssignationUsingGET(this.id));
	}

	editIncentiveRoleAssignation(incentiveRoleAssignation: MbsIncentiveRoleAssignationDto) {
		const ref = this.dialogService.open(EnzoIncentiveRoleAssignationDialogComponent, {
			data: { incentiveRoleAssignation: incentiveRoleAssignation },
			header: 'Update incentiveRoleAssignation',
			width: '70%'
		});
	}

	async deleteIncentiveRoleAssignation(incentiveRoleAssignation: MbsIncentiveRoleAssignationDto) {
		if(incentiveRoleAssignation.id === undefined) return;
		await lastValueFrom(this.resourceService.deleteIncentiveRoleAssignationUsingDELETE(incentiveRoleAssignation.id));
	}

	createNewIncentiveAssignation(incentiveRoleAssignationDto: MbsIncentiveRoleAssignationDto) {
		this.dialogService.open(EnzoIncentiveAssignationDialogComponent, {
			header: 'Create IncentiveAssignation',
			width: '70%',
			data: {
				assignation: incentiveRoleAssignationDto
			}
		});
	}

	protected incentiveAssignationTableButtons: any[] = [
		{
			label: "Dettagli",
			hideLabel: true,
			icon: "pi pi-search",
			severity: "secondary",
			class: "p-button-sm p-button-outlined",
			link: "../../../incentive-assignation/detail",
			//command: (e: any) => this.tabManagerService.openInCard(),
		}
	];
	protected incentiveAssignationListPaginator: StalPaginator = {
		page: 0,
		size: 10
	};
	protected incentiveAssignationCount: number;

}




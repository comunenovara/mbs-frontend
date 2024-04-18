import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { DialogService } from 'primeng/dynamicdialog';

import { StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { EngeAppCommonService, EngeAppGenericDetailPageComponent } from "@enge/common-app";

import { MbsIncentiveCalculationDto, MbsIncentiveCalculationResourceService} from '@mbs-main';
import { EnzoIncentiveCalculationDialogComponent } from '../incentive-calculation-dialog/incentive-calculation-dialog.component';
import { EnzoIncentiveRoleAssignationDialogComponent } from "../../incentive-role-assignation/incentive-role-assignation-dialog/incentive-role-assignation-dialog.component";
import { EnzoIncentiveCalculationValueDialogComponent } from "../../incentive-calculation-value/incentive-calculation-value-dialog/incentive-calculation-value-dialog.component";

@Component({
	selector: 'enzo-incentive-calculation-detail-page',
	templateUrl: './incentive-calculation-detail-page.component.html',
	styleUrls: ['./incentive-calculation-detail-page.component.scss']
})
export class EnzoIncentiveCalculationDetailPageComponent extends EngeAppGenericDetailPageComponent {
	constructor(
		eacs: EngeAppCommonService,
		route: ActivatedRoute,
		//public tabManagerService: TabManagerService,
		private dialogService: DialogService,
		private resourceService: MbsIncentiveCalculationResourceService,
	) { super(eacs, route); }

	incentiveCalculationDto: MbsIncentiveCalculationDto;

	override onLoad() {
		this.incentiveCalculationDto = this.route.snapshot.data['incentiveCalculation'];
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "incentiveCalculation") this.reloadPage();
	}

	override async reloadPage() {
		this.incentiveCalculationDto = await lastValueFrom(this.resourceService.getIncentiveCalculationUsingGET(this.id));
	}

	editIncentiveCalculation(incentiveCalculation: MbsIncentiveCalculationDto) {
		const ref = this.dialogService.open(EnzoIncentiveCalculationDialogComponent, {
			data: { incentiveCalculation: incentiveCalculation },
			header: 'Update incentiveCalculation',
			width: '70%'
		});
	}

	async deleteIncentiveCalculation(incentiveCalculation: MbsIncentiveCalculationDto) {
		if(incentiveCalculation.id === undefined) return;
		await lastValueFrom(this.resourceService.deleteIncentiveCalculationUsingDELETE(incentiveCalculation.id));
	}

	createNewIncentiveRoleAssignation(incentiveCalculationDto: MbsIncentiveCalculationDto) {
		this.dialogService.open(EnzoIncentiveRoleAssignationDialogComponent, {
			header: 'Create IncentiveRoleAssignation',
			width: '70%',
			data: {
				calculation: incentiveCalculationDto
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
			//command: (e: any) => this.tabManagerService.openInCard(),
		}
	];
	protected incentiveRoleAssignationListPaginator: StalPaginator = {
		page: 0,
		size: 10
	};
	protected incentiveRoleAssignationCount: number;

	createNewIncentiveCalculationValue(incentiveCalculationDto: MbsIncentiveCalculationDto) {
		this.dialogService.open(EnzoIncentiveCalculationValueDialogComponent, {
			header: 'Create IncentiveCalculationValue',
			width: '70%',
			data: {
				calculation: incentiveCalculationDto
			}
		});
	}

	protected incentiveCalculationValueTableButtons: any[] = [
		{
			label: "Dettagli",
			hideLabel: true,
			icon: "pi pi-search",
			severity: "secondary",
			class: "p-button-sm p-button-outlined",
			link: "../../../incentive-calculation-value/detail",
			//command: (e: any) => this.tabManagerService.openInCard(),
		}
	];
	protected incentiveCalculationValueListPaginator: StalPaginator = {
		page: 0,
		size: 10
	};
	protected incentiveCalculationValueCount: number;

}




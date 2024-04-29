import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { DialogService } from 'primeng/dynamicdialog';

import { StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';


import { EngeAppCommonService, EngeAppGenericDetailPageComponent } from "@enge/common-app";

import { MbsIncentiveCalculationValueDto, MbsIncentiveCalculationValueResourceService} from '@mbs-main';
import { EnzoIncentiveCalculationValueDialogComponent } from '../incentive-calculation-value-dialog/incentive-calculation-value-dialog.component';
import { EnzoIncentiveAssignationDialogComponent } from "../../incentive-assignation/incentive-assignation-dialog/incentive-assignation-dialog.component";

@Component({
	selector: 'enzo-incentive-calculation-value-detail-page',
	templateUrl: './incentive-calculation-value-detail-page.component.html',
	styleUrls: ['./incentive-calculation-value-detail-page.component.scss']
})
export class EnzoIncentiveCalculationValueDetailPageComponent extends EngeAppGenericDetailPageComponent {
	constructor(
		eacs: EngeAppCommonService,
		route: ActivatedRoute,
		//public tabManagerService: TabManagerService,
		private dialogService: DialogService,
		private resourceService: MbsIncentiveCalculationValueResourceService,
	) { super(eacs, route); }

	incentiveCalculationValueDto: MbsIncentiveCalculationValueDto;

	override onLoad() {
		this.incentiveCalculationValueDto = this.route.snapshot.data['incentiveCalculationValue'];
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "incentiveCalculationValue") this.reloadPage();
	}

	override async reloadPage() {
		this.incentiveCalculationValueDto = await lastValueFrom(this.resourceService.getIncentiveCalculationValueUsingGET(this.id));
	}

	editIncentiveCalculationValue(incentiveCalculationValue: MbsIncentiveCalculationValueDto) {
		const ref = this.dialogService.open(EnzoIncentiveCalculationValueDialogComponent, {
			data: { incentiveCalculationValue: incentiveCalculationValue },
			header: 'Update incentiveCalculationValue',
			width: '70%'
		});
	}

	async deleteIncentiveCalculationValue(incentiveCalculationValue: MbsIncentiveCalculationValueDto) {
		if(incentiveCalculationValue.id === undefined) return;
		await lastValueFrom(this.resourceService.deleteIncentiveCalculationValueUsingDELETE(incentiveCalculationValue.id));
	}

	createNewIncentiveAssignation(incentiveCalculationValueDto: MbsIncentiveCalculationValueDto) {
		this.dialogService.open(EnzoIncentiveAssignationDialogComponent, {
			header: 'Create IncentiveAssignation',
			width: '70%',
			data: {
				calculationValue: incentiveCalculationValueDto
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
			////command: (e: any) => this.tabManagerService.openInCard(),
		}
	];
	protected incentiveAssignationListPaginator: StalPaginator = {
		page: 0,
		size: 10
	};
	protected incentiveAssignationCount: number;

}




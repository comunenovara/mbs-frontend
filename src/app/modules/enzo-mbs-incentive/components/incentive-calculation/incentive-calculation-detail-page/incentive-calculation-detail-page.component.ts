import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { DialogService } from 'primeng/dynamicdialog';

import { StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';


import { EngeAppCommonService, EngeAppGenericDetailPageComponent } from "@enge/common-app";

import { MbsIncentiveCalculationDto, MbsIncentiveCalculationResourceService} from '@mbs-incentive';
import { EnzoIncentiveCalculationDialogComponent } from '../incentive-calculation-dialog/incentive-calculation-dialog.component';
import { EnzoIncentiveRoleValueDialogComponent } from "../../incentive-role-value/incentive-role-value-dialog/incentive-role-value-dialog.component";

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

	createNewIncentiveRoleValue(incentiveCalculationDto: MbsIncentiveCalculationDto) {
		this.dialogService.open(EnzoIncentiveRoleValueDialogComponent, {
			header: 'Create IncentiveRoleValue',
			width: '70%',
			data: {
				incentiveCalculation: incentiveCalculationDto
			}
		});
	}

	protected incentiveRoleValueTableButtons: any[] = [
		{
			label: "Dettagli",
			hideLabel: true,
			icon: "pi pi-search",
			severity: "secondary",
			class: "p-button-sm p-button-outlined",
			link: "../../../incentive-role-value/detail",
			////command: (e: any) => this.tabManagerService.openInCard(),
		}
	];
	protected incentiveRoleValueListPaginator: StalPaginator = {
		page: 0,
		size: 10
	};
	protected incentiveRoleValueCount: number;

}




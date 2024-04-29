import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { DialogService } from 'primeng/dynamicdialog';

import { StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';


import { EngeAppCommonService, EngeAppGenericDetailPageComponent } from "@enge/common-app";

import { MbsIncentiveRegulationValueDto, MbsIncentiveRegulationValueResourceService} from '@mbs-main';
import { EnzoIncentiveRegulationValueDialogComponent } from '../incentive-regulation-value-dialog/incentive-regulation-value-dialog.component';
import { EnzoIncentiveCalculationValueDialogComponent } from "../../incentive-calculation-value/incentive-calculation-value-dialog/incentive-calculation-value-dialog.component";

@Component({
	selector: 'enzo-incentive-regulation-value-detail-page',
	templateUrl: './incentive-regulation-value-detail-page.component.html',
	styleUrls: ['./incentive-regulation-value-detail-page.component.scss']
})
export class EnzoIncentiveRegulationValueDetailPageComponent extends EngeAppGenericDetailPageComponent {
	constructor(
		eacs: EngeAppCommonService,
		route: ActivatedRoute,
		//public tabManagerService: TabManagerService,
		private dialogService: DialogService,
		private resourceService: MbsIncentiveRegulationValueResourceService,
	) { super(eacs, route); }

	incentiveRegulationValueDto: MbsIncentiveRegulationValueDto;

	override onLoad() {
		this.incentiveRegulationValueDto = this.route.snapshot.data['incentiveRegulationValue'];
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "incentiveRegulationValue") this.reloadPage();
	}

	override async reloadPage() {
		this.incentiveRegulationValueDto = await lastValueFrom(this.resourceService.getIncentiveRegulationValueUsingGET(this.id));
	}

	editIncentiveRegulationValue(incentiveRegulationValue: MbsIncentiveRegulationValueDto) {
		const ref = this.dialogService.open(EnzoIncentiveRegulationValueDialogComponent, {
			data: { incentiveRegulationValue: incentiveRegulationValue },
			header: 'Update incentiveRegulationValue',
			width: '70%'
		});
	}

	async deleteIncentiveRegulationValue(incentiveRegulationValue: MbsIncentiveRegulationValueDto) {
		if(incentiveRegulationValue.id === undefined) return;
		await lastValueFrom(this.resourceService.deleteIncentiveRegulationValueUsingDELETE(incentiveRegulationValue.id));
	}

	createNewIncentiveCalculationValue(incentiveRegulationValueDto: MbsIncentiveRegulationValueDto) {
		this.dialogService.open(EnzoIncentiveCalculationValueDialogComponent, {
			header: 'Create IncentiveCalculationValue',
			width: '70%',
			data: {
				regulationValue: incentiveRegulationValueDto
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
			////command: (e: any) => this.tabManagerService.openInCard(),
		}
	];
	protected incentiveCalculationValueListPaginator: StalPaginator = {
		page: 0,
		size: 10
	};
	protected incentiveCalculationValueCount: number;

}




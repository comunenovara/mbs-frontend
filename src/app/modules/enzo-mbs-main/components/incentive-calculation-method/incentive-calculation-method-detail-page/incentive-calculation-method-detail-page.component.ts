import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { DialogService } from 'primeng/dynamicdialog';

import { StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { EngeAppCommonService, EngeAppGenericDetailPageComponent } from "@enge/common-app";

import { MbsIncentiveCalculationMethodDto, MbsIncentiveCalculationMethodResourceService} from '@mbs-main';
import { EnzoIncentiveCalculationMethodDialogComponent } from '../incentive-calculation-method-dialog/incentive-calculation-method-dialog.component';
import { EnzoIncentiveCalculationFactorDialogComponent } from "../../incentive-calculation-factor/incentive-calculation-factor-dialog/incentive-calculation-factor-dialog.component";

@Component({
	selector: 'enzo-incentive-calculation-method-detail-page',
	templateUrl: './incentive-calculation-method-detail-page.component.html',
	styleUrls: ['./incentive-calculation-method-detail-page.component.scss']
})
export class EnzoIncentiveCalculationMethodDetailPageComponent extends EngeAppGenericDetailPageComponent {
	constructor(
		eacs: EngeAppCommonService,
		route: ActivatedRoute,
		//public tabManagerService: TabManagerService,
		private dialogService: DialogService,
		private resourceService: MbsIncentiveCalculationMethodResourceService,
	) { super(eacs, route); }

	incentiveCalculationMethodDto: MbsIncentiveCalculationMethodDto;

	override onLoad() {
		this.incentiveCalculationMethodDto = this.route.snapshot.data['incentiveCalculationMethod'];
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "incentiveCalculationMethod") this.reloadPage();
	}

	override async reloadPage() {
		this.incentiveCalculationMethodDto = await lastValueFrom(this.resourceService.getIncentiveCalculationMethodUsingGET(this.id));
	}

	editIncentiveCalculationMethod(incentiveCalculationMethod: MbsIncentiveCalculationMethodDto) {
		const ref = this.dialogService.open(EnzoIncentiveCalculationMethodDialogComponent, {
			data: { incentiveCalculationMethod: incentiveCalculationMethod },
			header: 'Update incentiveCalculationMethod',
			width: '70%'
		});
	}

	async deleteIncentiveCalculationMethod(incentiveCalculationMethod: MbsIncentiveCalculationMethodDto) {
		if(incentiveCalculationMethod.id === undefined) return;
		await lastValueFrom(this.resourceService.deleteIncentiveCalculationMethodUsingDELETE(incentiveCalculationMethod.id));
	}

	createNewIncentiveCalculationFactor(incentiveCalculationMethodDto: MbsIncentiveCalculationMethodDto) {
		this.dialogService.open(EnzoIncentiveCalculationFactorDialogComponent, {
			header: 'Create IncentiveCalculationFactor',
			width: '70%',
			data: {
				incentiveCalculationMethod: incentiveCalculationMethodDto
			}
		});
	}

	protected incentiveCalculationFactorTableButtons: any[] = [
		{
			label: "Dettagli",
			hideLabel: true,
			icon: "pi pi-search",
			severity: "secondary",
			class: "p-button-sm p-button-outlined",
			link: "../../../incentive-calculation-factor/detail",
			//command: (e: any) => this.tabManagerService.openInCard(),
		}
	];
	protected incentiveCalculationFactorListPaginator: StalPaginator = {
		page: 0,
		size: 10
	};
	protected incentiveCalculationFactorCount: number;

}




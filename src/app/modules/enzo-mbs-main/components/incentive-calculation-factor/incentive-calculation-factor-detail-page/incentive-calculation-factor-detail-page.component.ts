import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { DialogService } from 'primeng/dynamicdialog';

import { StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { EngeAppCommonService, EngeAppGenericDetailPageComponent } from "@enge/common-app";

import { MbsIncentiveCalculationFactorDto, MbsIncentiveCalculationFactorResourceService} from '@mbs-main';
import { EnzoIncentiveCalculationFactorDialogComponent } from '../incentive-calculation-factor-dialog/incentive-calculation-factor-dialog.component';

@Component({
	selector: 'enzo-incentive-calculation-factor-detail-page',
	templateUrl: './incentive-calculation-factor-detail-page.component.html',
	styleUrls: ['./incentive-calculation-factor-detail-page.component.scss']
})
export class EnzoIncentiveCalculationFactorDetailPageComponent extends EngeAppGenericDetailPageComponent {
	constructor(
		eacs: EngeAppCommonService,
		route: ActivatedRoute,
		//public tabManagerService: TabManagerService,
		private dialogService: DialogService,
		private resourceService: MbsIncentiveCalculationFactorResourceService,
	) { super(eacs, route); }

	incentiveCalculationFactorDto: MbsIncentiveCalculationFactorDto;

	override onLoad() {
		this.incentiveCalculationFactorDto = this.route.snapshot.data['incentiveCalculationFactor'];
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "incentiveCalculationFactor") this.reloadPage();
	}

	override async reloadPage() {
		this.incentiveCalculationFactorDto = await lastValueFrom(this.resourceService.getIncentiveCalculationFactorUsingGET(this.id));
	}

	editIncentiveCalculationFactor(incentiveCalculationFactor: MbsIncentiveCalculationFactorDto) {
		const ref = this.dialogService.open(EnzoIncentiveCalculationFactorDialogComponent, {
			data: { incentiveCalculationFactor: incentiveCalculationFactor },
			header: 'Update incentiveCalculationFactor',
			width: '70%'
		});
	}

	async deleteIncentiveCalculationFactor(incentiveCalculationFactor: MbsIncentiveCalculationFactorDto) {
		if(incentiveCalculationFactor.id === undefined) return;
		await lastValueFrom(this.resourceService.deleteIncentiveCalculationFactorUsingDELETE(incentiveCalculationFactor.id));
	}

}




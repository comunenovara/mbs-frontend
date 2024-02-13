import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { DialogService } from 'primeng/dynamicdialog';

import { StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { EngeAppCommonService, EngeAppGenericDetailPageComponent } from "@enge/common-app";

import { MbsCalculationFactorDto, MbsCalculationFactorResourceService} from '@mbs-incentive';
import { EnzoCalculationFactorDialogComponent } from '../calculation-factor-dialog/calculation-factor-dialog.component';

@Component({
	selector: 'enzo-calculation-factor-detail-page',
	templateUrl: './calculation-factor-detail-page.component.html',
	styleUrls: ['./calculation-factor-detail-page.component.scss']
})
export class EnzoCalculationFactorDetailPageComponent extends EngeAppGenericDetailPageComponent {
	constructor(
		eacs: EngeAppCommonService,
		route: ActivatedRoute,
		//public tabManagerService: TabManagerService,
		private dialogService: DialogService,
		private resourceService: MbsCalculationFactorResourceService,
	) { super(eacs, route); }

	calculationFactorDto: MbsCalculationFactorDto;

	override onLoad() {
		this.calculationFactorDto = this.route.snapshot.data['calculationFactor'];
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "calculationFactor") this.reloadPage();
	}

	override async reloadPage() {
		this.calculationFactorDto = await lastValueFrom(this.resourceService.getCalculationFactorUsingGET(this.id));
	}

	editCalculationFactor(calculationFactor: MbsCalculationFactorDto) {
		const ref = this.dialogService.open(EnzoCalculationFactorDialogComponent, {
			data: { calculationFactor: calculationFactor },
			header: 'Update calculationFactor',
			width: '70%'
		});
	}

	async deleteCalculationFactor(calculationFactor: MbsCalculationFactorDto) {
		if(calculationFactor.id === undefined) return;
		await lastValueFrom(this.resourceService.deleteCalculationFactorUsingDELETE(calculationFactor.id));
	}

}




import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { DialogService } from 'primeng/dynamicdialog';

import { StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { EngeAppCommonService, EngeAppGenericDetailPageComponent } from "@enge/common-app";

import { MbsCalculationMethodDto, MbsCalculationMethodResourceService} from '@mbs-incentive';
import { EnzoCalculationMethodDialogComponent } from '../calculation-method-dialog/calculation-method-dialog.component';
import { EnzoCalculationFactorDialogComponent } from "../../calculation-factor/calculation-factor-dialog/calculation-factor-dialog.component";

@Component({
	selector: 'enzo-calculation-method-detail-page',
	templateUrl: './calculation-method-detail-page.component.html',
	styleUrls: ['./calculation-method-detail-page.component.scss']
})
export class EnzoCalculationMethodDetailPageComponent extends EngeAppGenericDetailPageComponent {
	constructor(
		eacs: EngeAppCommonService,
		route: ActivatedRoute,
		//public tabManagerService: TabManagerService,
		private dialogService: DialogService,
		private resourceService: MbsCalculationMethodResourceService,
	) { super(eacs, route); }

	calculationMethodDto: MbsCalculationMethodDto;

	override onLoad() {
		this.calculationMethodDto = this.route.snapshot.data['calculationMethod'];
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "calculationMethod") this.reloadPage();
	}

	override async reloadPage() {
		this.calculationMethodDto = await lastValueFrom(this.resourceService.getCalculationMethodUsingGET(this.id));
	}

	editCalculationMethod(calculationMethod: MbsCalculationMethodDto) {
		const ref = this.dialogService.open(EnzoCalculationMethodDialogComponent, {
			data: { calculationMethod: calculationMethod },
			header: 'Update calculationMethod',
			width: '70%'
		});
	}

	async deleteCalculationMethod(calculationMethod: MbsCalculationMethodDto) {
		if(calculationMethod.id === undefined) return;
		await lastValueFrom(this.resourceService.deleteCalculationMethodUsingDELETE(calculationMethod.id));
	}

	createNewCalculationFactor(calculationMethodDto: MbsCalculationMethodDto) {
		this.dialogService.open(EnzoCalculationFactorDialogComponent, {
			header: 'Create CalculationFactor',
			width: '70%',
			data: {
				method: calculationMethodDto
			}
		});
	}

	protected calculationFactorTableButtons: any[] = [
		{
			label: "Dettagli",
			hideLabel: true,
			icon: "pi pi-search",
			severity: "secondary",
			class: "p-button-sm p-button-outlined",
			link: "../../../calculation-factor/detail",
			//command: (e: any) => this.tabManagerService.openInCard(),
		}
	];
	protected calculationFactorListPaginator: StalPaginator = {
		page: 0,
		size: 10
	};
	protected calculationFactorCount: number;

}




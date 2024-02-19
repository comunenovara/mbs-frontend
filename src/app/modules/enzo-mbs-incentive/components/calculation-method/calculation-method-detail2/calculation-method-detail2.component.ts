import { Component, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { DialogService } from 'primeng/dynamicdialog';

import { StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { EngeAppCommonService, EngeAppGenericDetailPageComponent } from "@enge/common-app";

import { MbsCalculationFactorResourceService, MbsCalculationMethodDto, MbsCalculationMethodResourceService} from '@mbs-incentive';
import { EnzoCalculationMethodDialogComponent } from '../calculation-method-dialog/calculation-method-dialog.component';
import { EnzoCalculationFactorDialogComponent } from "../../calculation-factor/calculation-factor-dialog/calculation-factor-dialog.component";

@Component({
	selector: 'enzo-calculation-method-detail2',
	templateUrl: './calculation-method-detail2.component.html',
	styleUrls: ['./calculation-method-detail2.component.scss']
})
export class EnzoCalculationMethodDetail2Component extends EngeAppGenericDetailPageComponent {
	constructor(
		eacs: EngeAppCommonService,
		route: ActivatedRoute,
		//public tabManagerService: TabManagerService,
		private dialogService: DialogService,
		private resourceService: MbsCalculationMethodResourceService,
		private calculationFactorResourceService: MbsCalculationFactorResourceService,
	) { super(eacs, route); }

	@Input()
	calculationMethod: MbsCalculationMethodDto;

	override onLoad() {
		this.calculationMethod = this.route.snapshot.data['calculationMethod'];
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "calculationMethod") this.reloadPage();
	}

	override async reloadPage() {
		this.calculationMethod = await lastValueFrom(this.resourceService.getCalculationMethodUsingGET(this.id));
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
			header: 'Crea fascia',
			width: '70%',
			data: {
				method: calculationMethodDto
			}
		});
	}

	protected calculationFactorTableButtons: any[] = [
		{
			label: "Modifica",
			hideLabel: true,
			icon: "pi pi-pencil",
			severity: "secondary",
			class: "p-button-sm p-button-outlined",
			command: (e: any) => {
				const ref = this.dialogService.open(EnzoCalculationFactorDialogComponent, {
					data: { method: e.method, calculationFactor: { ...e } },
					header: 'Modifica fascia',
					width: '70%'
				});
			},
			childs: [
				{
					label: "Cancella",
					hideLabel: true,
					icon: "pi pi-trash",
					severity: "secondary",
					class: "p-button-sm p-button-outlined",
					command: async (e: any) => {
						await lastValueFrom(this.calculationFactorResourceService.deleteCalculationFactorUsingDELETE(e.item.data.id));
						this.eacs.eventer.launchReloadContent("calculationFactor");
					}
				}
			]
		}
	];
	protected calculationFactorListPaginator: StalPaginator = {
		page: 0,
		size: 10
	};
	protected calculationFactorCount: number;

}




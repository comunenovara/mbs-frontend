import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { DialogService } from 'primeng/dynamicdialog';

import { StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { EngeAppCommonService, EngeAppGenericDetailPageComponent } from "@enge/common-app";

import { MbsProcurementTypeDto, MbsProcurementTypeResourceService} from '@mbs-incentive';
import { EnzoProcurementTypeDialogComponent } from '../procurement-type-dialog/procurement-type-dialog.component';
import { EnzoCalculationMethodDialogComponent } from "../../calculation-method/calculation-method-dialog/calculation-method-dialog.component";

@Component({
	selector: 'enzo-procurement-type-detail-page',
	templateUrl: './procurement-type-detail-page.component.html',
	styleUrls: ['./procurement-type-detail-page.component.scss']
})
export class EnzoProcurementTypeDetailPageComponent extends EngeAppGenericDetailPageComponent {
	constructor(
		eacs: EngeAppCommonService,
		route: ActivatedRoute,
		//public tabManagerService: TabManagerService,
		private dialogService: DialogService,
		private resourceService: MbsProcurementTypeResourceService,
	) { super(eacs, route); }

	procurementTypeDto: MbsProcurementTypeDto;

	override onLoad() {
		this.procurementTypeDto = this.route.snapshot.data['procurementType'];
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "procurementType") this.reloadPage();
	}

	override async reloadPage() {
		this.procurementTypeDto = await lastValueFrom(this.resourceService.getProcurementTypeUsingGET(this.id));
	}

	editProcurementType(procurementType: MbsProcurementTypeDto) {
		const ref = this.dialogService.open(EnzoProcurementTypeDialogComponent, {
			data: { procurementType: procurementType },
			header: 'Update procurementType',
			width: '70%'
		});
	}

	async deleteProcurementType(procurementType: MbsProcurementTypeDto) {
		if(procurementType.id === undefined) return;
		await lastValueFrom(this.resourceService.deleteProcurementTypeUsingDELETE(procurementType.id));
	}

	createNewCalculationMethod(procurementTypeDto: MbsProcurementTypeDto) {
		this.dialogService.open(EnzoCalculationMethodDialogComponent, {
			header: 'Create CalculationMethod',
			width: '70%',
			data: {
				procurementType: procurementTypeDto
			}
		});
	}

	protected calculationMethodTableButtons: any[] = [
		{
			label: "Dettagli",
			hideLabel: true,
			icon: "pi pi-search",
			severity: "secondary",
			class: "p-button-sm p-button-outlined",
			link: "../../../calculation-method/detail",
			//command: (e: any) => this.tabManagerService.openInCard(),
		}
	];
	protected calculationMethodListPaginator: StalPaginator = {
		page: 0,
		size: 10
	};
	protected calculationMethodCount: number;

}




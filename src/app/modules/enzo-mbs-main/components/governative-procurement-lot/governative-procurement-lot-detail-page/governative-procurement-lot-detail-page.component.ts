import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { DialogService } from 'primeng/dynamicdialog';

import { StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { EngeAppCommonService, EngeAppGenericDetailPageComponent } from "@enge/common-app";

import { MbsGovernativeProcurementLotDto, MbsGovernativeProcurementLotResourceService} from '@mbs-main';
import { EnzoGovernativeProcurementLotDialogComponent } from '../governative-procurement-lot-dialog/governative-procurement-lot-dialog.component';
import { EnzoGovernativeProjectProcurementLotDialogComponent } from "../../governative-project-procurement-lot/governative-project-procurement-lot-dialog/governative-project-procurement-lot-dialog.component";
import { EnzoIncentiveCalculationDialogComponent } from "../../incentive-calculation/incentive-calculation-dialog/incentive-calculation-dialog.component";

@Component({
	selector: 'enzo-governative-procurement-lot-detail-page',
	templateUrl: './governative-procurement-lot-detail-page.component.html',
	styleUrls: ['./governative-procurement-lot-detail-page.component.scss']
})
export class EnzoGovernativeProcurementLotDetailPageComponent extends EngeAppGenericDetailPageComponent {
	constructor(
		eacs: EngeAppCommonService,
		route: ActivatedRoute,
		//public tabManagerService: TabManagerService,
		private dialogService: DialogService,
		private resourceService: MbsGovernativeProcurementLotResourceService,
	) { super(eacs, route); }

	governativeProcurementLotDto: MbsGovernativeProcurementLotDto;

	override onLoad() {
		this.governativeProcurementLotDto = this.route.snapshot.data['governativeProcurementLot'];
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "governativeProcurementLot") this.reloadPage();
	}

	override async reloadPage() {
		this.governativeProcurementLotDto = await lastValueFrom(this.resourceService.getGovernativeProcurementLotUsingGET(this.id));
	}

	editGovernativeProcurementLot(governativeProcurementLot: MbsGovernativeProcurementLotDto) {
		const ref = this.dialogService.open(EnzoGovernativeProcurementLotDialogComponent, {
			data: { governativeProcurementLot: governativeProcurementLot },
			header: 'Modifica appalto',
			width: '70%'
		});
	}

	async deleteGovernativeProcurementLot(governativeProcurementLot: MbsGovernativeProcurementLotDto) {
		if(governativeProcurementLot.id === undefined) return;
		await lastValueFrom(this.resourceService.deleteGovernativeProcurementLotUsingDELETE(governativeProcurementLot.id));
	}

	createNewGovernativeProjectProcurementLot(governativeProcurementLotDto: MbsGovernativeProcurementLotDto) {
		this.dialogService.open(EnzoGovernativeProjectProcurementLotDialogComponent, {
			header: 'Create GovernativeProjectProcurementLot',
			width: '70%',
			data: {
				procurementLot: governativeProcurementLotDto
			}
		});
	}

	protected governativeProjectProcurementLotTableButtons: any[] = [
		{
			label: "Dettagli",
			hideLabel: true,
			icon: "pi pi-search",
			severity: "secondary",
			class: "p-button-sm p-button-outlined",
			command: (e: any) => this.eacs.router.navigate(["/main/governative-project/detail/", e.projectId]),
		}
	];
	protected governativeProjectProcurementLotListPaginator: StalPaginator = {
		page: 0,
		size: 10
	};
	protected governativeProjectProcurementLotCount: number;

	createNewIncentiveCalculation(governativeProcurementLotDto: MbsGovernativeProcurementLotDto) {
		this.dialogService.open(EnzoIncentiveCalculationDialogComponent, {
			header: 'Create IncentiveCalculation',
			width: '70%',
			data: {
				governativeProcurementLot: governativeProcurementLotDto
			}
		});
	}

	protected incentiveCalculationTableButtons: any[] = [
		{
			label: "Dettagli",
			hideLabel: true,
			icon: "pi pi-search",
			severity: "secondary",
			class: "p-button-sm p-button-outlined",
			link: "../../../incentive-calculation/detail",
			//command: (e: any) => this.tabManagerService.openInCard(),
		}
	];
	protected incentiveCalculationListPaginator: StalPaginator = {
		page: 0,
		size: 10
	};
	protected incentiveCalculationCount: number;

}




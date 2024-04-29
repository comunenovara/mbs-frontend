import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { DialogService } from 'primeng/dynamicdialog';

import { StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';


import { EngeAppCommonService, EngeAppGenericDetailPageComponent } from "@enge/common-app";

import { MbsProcurementTypeDto, MbsProcurementTypeResourceService} from '@mbs-main';
import { EnzoProcurementTypeDialogComponent } from '../procurement-type-dialog/procurement-type-dialog.component';
import { EnzoGovernativeProcurementLotDialogComponent } from "../../governative-procurement-lot/governative-procurement-lot-dialog/governative-procurement-lot-dialog.component";
import { EnzoIncentiveWithheldDialogComponent } from "../../incentive-withheld/incentive-withheld-dialog/incentive-withheld-dialog.component";
import { EnzoIncentiveCalculationMethodDialogComponent } from "../../incentive-calculation-method/incentive-calculation-method-dialog/incentive-calculation-method-dialog.component";
import { EnzoIncentiveStageDialogComponent } from "../../incentive-stage/incentive-stage-dialog/incentive-stage-dialog.component";
import { EnzoIncentiveRoleDialogComponent } from "../../incentive-role/incentive-role-dialog/incentive-role-dialog.component";

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

	createNewGovernativeProcurementLot(procurementTypeDto: MbsProcurementTypeDto) {
		this.dialogService.open(EnzoGovernativeProcurementLotDialogComponent, {
			header: 'Create GovernativeProcurementLot',
			width: '70%',
			data: {
				procurementType: procurementTypeDto
			}
		});
	}

	protected governativeProcurementLotTableButtons: any[] = [
		{
			label: "Dettagli",
			hideLabel: true,
			icon: "pi pi-search",
			severity: "secondary",
			class: "p-button-sm p-button-outlined",
			link: "../../../governative-procurement-lot/detail",
			////command: (e: any) => this.tabManagerService.openInCard(),
		}
	];
	protected governativeProcurementLotListPaginator: StalPaginator = {
		page: 0,
		size: 10
	};
	protected governativeProcurementLotCount: number;

	createNewIncentiveWithheld(procurementTypeDto: MbsProcurementTypeDto) {
		this.dialogService.open(EnzoIncentiveWithheldDialogComponent, {
			header: 'Create IncentiveWithheld',
			width: '70%',
			data: {
				procurementType: procurementTypeDto
			}
		});
	}

	protected incentiveWithheldTableButtons: any[] = [
		{
			label: "Dettagli",
			hideLabel: true,
			icon: "pi pi-search",
			severity: "secondary",
			class: "p-button-sm p-button-outlined",
			link: "../../../incentive-withheld/detail",
			////command: (e: any) => this.tabManagerService.openInCard(),
		}
	];
	protected incentiveWithheldListPaginator: StalPaginator = {
		page: 0,
		size: 10
	};
	protected incentiveWithheldCount: number;

	createNewIncentiveCalculationMethod(procurementTypeDto: MbsProcurementTypeDto) {
		this.dialogService.open(EnzoIncentiveCalculationMethodDialogComponent, {
			header: 'Create IncentiveCalculationMethod',
			width: '70%',
			data: {
				procurementType: procurementTypeDto
			}
		});
	}

	protected incentiveCalculationMethodTableButtons: any[] = [
		{
			label: "Dettagli",
			hideLabel: true,
			icon: "pi pi-search",
			severity: "secondary",
			class: "p-button-sm p-button-outlined",
			link: "../../../incentive-calculation-method/detail",
			////command: (e: any) => this.tabManagerService.openInCard(),
		}
	];
	protected incentiveCalculationMethodListPaginator: StalPaginator = {
		page: 0,
		size: 10
	};
	protected incentiveCalculationMethodCount: number;

	createNewIncentiveStage(procurementTypeDto: MbsProcurementTypeDto) {
		this.dialogService.open(EnzoIncentiveStageDialogComponent, {
			header: 'Create IncentiveStage',
			width: '70%',
			data: {
				procurementType: procurementTypeDto
			}
		});
	}

	protected incentiveStageTableButtons: any[] = [
		{
			label: "Dettagli",
			hideLabel: true,
			icon: "pi pi-search",
			severity: "secondary",
			class: "p-button-sm p-button-outlined",
			link: "../../../incentive-stage/detail",
			////command: (e: any) => this.tabManagerService.openInCard(),
		}
	];
	protected incentiveStageListPaginator: StalPaginator = {
		page: 0,
		size: 10
	};
	protected incentiveStageCount: number;

	createNewIncentiveRole(procurementTypeDto: MbsProcurementTypeDto) {
		this.dialogService.open(EnzoIncentiveRoleDialogComponent, {
			header: 'Create IncentiveRole',
			width: '70%',
			data: {
				procurementType: procurementTypeDto
			}
		});
	}

	protected incentiveRoleTableButtons: any[] = [
		{
			label: "Dettagli",
			hideLabel: true,
			icon: "pi pi-search",
			severity: "secondary",
			class: "p-button-sm p-button-outlined",
			link: "../../../incentive-role/detail",
			////command: (e: any) => this.tabManagerService.openInCard(),
		}
	];
	protected incentiveRoleListPaginator: StalPaginator = {
		page: 0,
		size: 10
	};
	protected incentiveRoleCount: number;

}




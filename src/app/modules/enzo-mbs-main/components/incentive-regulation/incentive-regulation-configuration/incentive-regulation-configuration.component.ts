import { Component, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { DialogService } from 'primeng/dynamicdialog';
import { MenuItem } from "primeng/api";

import { StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
import { EngeAppCommonService, EngeAppGenericDetailPageComponent } from "@enge/common-app";

import { MbsIncentiveRegulationDto, MbsIncentiveRegulationResourceService, MbsProcurementTypeDto, MbsProcurementTypeResourceService} from '@mbs-main';

import { EnzoIncentiveWithheldDialogComponent } from "../../incentive-withheld/incentive-withheld-dialog/incentive-withheld-dialog.component";
import { EnzoIncentiveCalculationMethodDialogComponent } from "../../incentive-calculation-method/incentive-calculation-method-dialog/incentive-calculation-method-dialog.component";
import { EnzoIncentiveStageDialogComponent } from "../../incentive-stage/incentive-stage-dialog/incentive-stage-dialog.component";
import { EnzoIncentiveRoleDialogComponent } from "../../incentive-role/incentive-role-dialog/incentive-role-dialog.component";
import { EnzoIncentiveCalculationDialogComponent } from "../../incentive-calculation/incentive-calculation-dialog/incentive-calculation-dialog.component";


@Component({
	templateUrl: './incentive-regulation-configuration.component.html',
	styleUrls: ['./incentive-regulation-configuration.component.scss'],
})
export class EnzoIncentiveRegulationConfigurationComponent extends EngeAppGenericDetailPageComponent {
	constructor(
		eacs: EngeAppCommonService,
		route: ActivatedRoute,
		//public tabManagerService: TabManagerService,
		private dialogService: DialogService,
		private resourceService: MbsIncentiveRegulationResourceService,
		private procurementTypeResourceService: MbsProcurementTypeResourceService,
	) { super(eacs, route); }

	incentiveRegulationDto: MbsIncentiveRegulationDto = {
        id: 1,
        description: 'Test'
    };
	items: MenuItem[] | undefined;

	override onLoad() {
		
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "incentiveRegulation") this.reloadPage();
	}

	override async reloadPage() {
		
	}











/**
	createNewIncentiveCalculationMethod(incentiveRegulationDto: MbsIncentiveRegulationDto) {
		this.dialogService.open(EnzoIncentiveCalculationMethodDialogComponent, {
			header: 'Create IncentiveCalculationMethod',
			width: '70%',
			data: {
				regulation: incentiveRegulationDto
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
			//command: (e: any) => this.tabManagerService.openInCard(),
		}
	];
	protected incentiveCalculationMethodListPaginator: StalPaginator = {
		page: 0,
		size: 10
	};
	protected incentiveCalculationMethodCount: number;
 */




















    createNewIncentiveWithheld(incentiveRegulationDto: MbsIncentiveRegulationDto) {
		this.dialogService.open(EnzoIncentiveWithheldDialogComponent, {
			header: 'Create IncentiveWithheld',
			width: '70%',
			data: {
				regulation: incentiveRegulationDto
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
			//command: (e: any) => this.tabManagerService.openInCard(),
		}
	];
	protected incentiveWithheldListPaginator: StalPaginator = {
		page: 0,
		size: 10
	};
	protected incentiveWithheldCount: number;

	createNewIncentiveStage(incentiveRegulationDto: MbsIncentiveRegulationDto) {
		this.dialogService.open(EnzoIncentiveStageDialogComponent, {
			header: 'Create IncentiveStage',
			width: '70%',
			data: {
				regulation: incentiveRegulationDto
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
			//command: (e: any) => this.tabManagerService.openInCard(),
		}
	];
	protected incentiveStageListPaginator: StalPaginator = {
		page: 0,
		size: 10
	};
	protected incentiveStageCount: number;

	createNewIncentiveRole(incentiveRegulationDto: MbsIncentiveRegulationDto) {
		this.dialogService.open(EnzoIncentiveRoleDialogComponent, {
			header: 'Create IncentiveRole',
			width: '70%',
			data: {
				regulation: incentiveRegulationDto
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
			//command: (e: any) => this.tabManagerService.openInCard(),
		}
	];
	protected incentiveRoleListPaginator: StalPaginator = {
		page: 0,
		size: 10
	};
	protected incentiveRoleCount: number;

}
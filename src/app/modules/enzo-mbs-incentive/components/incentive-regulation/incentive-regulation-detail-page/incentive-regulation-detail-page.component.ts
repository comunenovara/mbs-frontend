import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { DialogService } from 'primeng/dynamicdialog';

import { StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { EngeAppCommonService, EngeAppGenericDetailPageComponent } from "@enge/common-app";

import { MbsCalculationMethodResourceService, MbsIncentiveRegulationDto, MbsIncentiveRegulationResourceService, MbsRoleResourceService, MbsStageResourceService, MbsWithheldResourceService } from '@mbs-incentive';
import { EnzoIncentiveRegulationDialogComponent } from '../incentive-regulation-dialog/incentive-regulation-dialog.component';
import { EnzoCalculationMethodDialogComponent } from "../../calculation-method/calculation-method-dialog/calculation-method-dialog.component";
import { EnzoWithheldDialogComponent } from "../../withheld/withheld-dialog/withheld-dialog.component";
import { EnzoStageDialogComponent } from "../../stage/stage-dialog/stage-dialog.component";
import { EnzoRoleDialogComponent } from "../../role/role-dialog/role-dialog.component";
import { EnzoCalculationMethodDetailDialogComponent } from "../../calculation-method/calculation-method-detail-dialog/calculation-method-detail-dialog.component";
import { EnzoWithheldDetailPageComponent } from "../../withheld/withheld-detail-page/withheld-detail-page.component";

@Component({
	selector: 'enzo-incentive-regulation-detail-page',
	templateUrl: './incentive-regulation-detail-page.component.html',
	styleUrls: ['./incentive-regulation-detail-page.component.scss']
})
export class EnzoIncentiveRegulationDetailPageComponent extends EngeAppGenericDetailPageComponent {
	constructor(
		eacs: EngeAppCommonService,
		route: ActivatedRoute,
		//public tabManagerService: TabManagerService,
		private dialogService: DialogService,
		private resourceService: MbsIncentiveRegulationResourceService,
		private stageResourceService: MbsStageResourceService,
		private roleResourceService: MbsRoleResourceService,
		private calculationMethodResourceService: MbsCalculationMethodResourceService,
		private withheldResourceService: MbsWithheldResourceService,
	) { super(eacs, route); }

	incentiveRegulationDto: MbsIncentiveRegulationDto;

	override onLoad() {
		this.incentiveRegulationDto = this.route.snapshot.data['incentiveRegulation'];
	}

	protected override reloadFromEvent(event: StalEvent) {
		if (event.data === "calculationMethod") this.reloadPage();
		if (event.data === "incentiveRegulation") this.reloadPage();
		if (event.data === "stage") this.reloadPage();
		if (event.data === "withheld") this.reloadPage();
	}

	override async reloadPage() {
		this.incentiveRegulationDto = await lastValueFrom(this.resourceService.getIncentiveRegulationUsingGET(this.id));
	}

	editIncentiveRegulation(incentiveRegulation: MbsIncentiveRegulationDto) {
		const ref = this.dialogService.open(EnzoIncentiveRegulationDialogComponent, {
			data: { incentiveRegulation: incentiveRegulation },
			header: 'Update incentiveRegulation',
			width: '70%'
		});
	}

	async deleteIncentiveRegulation(incentiveRegulation: MbsIncentiveRegulationDto) {
		if (incentiveRegulation.id === undefined) return;
		await lastValueFrom(this.resourceService.deleteIncentiveRegulationUsingDELETE(incentiveRegulation.id));
	}

	createNewCalculationMethod(incentiveRegulationDto: MbsIncentiveRegulationDto) {
		this.dialogService.open(EnzoCalculationMethodDialogComponent, {
			header: 'Create CalculationMethod',
			width: '70%',
			data: {
				regulation: incentiveRegulationDto
			}
		});
	}

	editCalculationMethodDetail(incentiveRegulationDto: MbsIncentiveRegulationDto) {
		this.dialogService.open(EnzoCalculationMethodDialogComponent, {
			header: 'Modifica fasce di calcolo',
			width: '70%',
			data: {
				regulation: incentiveRegulationDto
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
			command: (e: any) => this.dialogService.open(EnzoCalculationMethodDetailDialogComponent, {
				header: 'Modifica fasce di calcolo',
				width: '70%',
				data: e
			}),
			childs: [
				{
					label: "Modifica",
					hideLabel: true,
					icon: "pi pi-pencil",
					severity: "secondary",
					class: "p-button-sm p-button-outlined",
					command: (e: any) => {
						const ref = this.dialogService.open(EnzoCalculationMethodDialogComponent, {
							data: { regulation: e.item.data.regulation, calculationMethod: { ...e.item.data } },
							header: 'Modifica fascia di calcolo',
							width: '70%'
						});
					},
				},
				{
					label: "Cancella",
					hideLabel: true,
					icon: "pi pi-trash",
					severity: "secondary",
					class: "p-button-sm p-button-outlined",
					command: async (e: any) => {
						await lastValueFrom(this.calculationMethodResourceService.deleteCalculationMethodUsingDELETE(e.item.data.id));
						this.eacs.eventer.launchReloadContent("calculationMethod");
					}
				}
			]
		}
	];
	protected calculationMethodListPaginator: StalPaginator = {
		page: 0,
		size: 10
	};
	protected calculationMethodCount: number;

	createNewWithheld(incentiveRegulationDto: MbsIncentiveRegulationDto) {
		this.dialogService.open(EnzoWithheldDialogComponent, {
			header: 'Create Withheld',
			width: '70%',
			data: {
				regulation: incentiveRegulationDto
			}
		});
	}

	protected withheldTableButtons: any[] = [
		{
			label: "Modifica",
			hideLabel: true,
			icon: "pi pi-pencil",
			severity: "secondary",
			class: "p-button-sm p-button-outlined",
			command: (e: any) => {
				const ref = this.dialogService.open(EnzoWithheldDialogComponent, {
					data: { regulation: e.regulation, withheld: { ...e } },
					header: 'Modifica trattenute',
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
						await lastValueFrom(this.withheldResourceService.deleteWithheldUsingDELETE(e.item.data.id));
						this.eacs.eventer.launchReloadContent("withheld");
					}
				}
			]
		}
	];
	protected withheldListPaginator: StalPaginator = {
		page: 0,
		size: 10
	};
	protected withheldCount: number;

	createNewStage(incentiveRegulationDto: MbsIncentiveRegulationDto) {
		this.dialogService.open(EnzoStageDialogComponent, {
			header: 'Create Stage',
			width: '70%',
			data: {
				regulation: incentiveRegulationDto
			}
		});
	}

	protected stageTableButtons: any[] = [
		{
			label: "Modifica",
			hideLabel: true,
			icon: "pi pi-pencil",
			severity: "secondary",
			class: "p-button-sm p-button-outlined",
			command: (e: any) => {
				const ref = this.dialogService.open(EnzoStageDialogComponent, {
					data: { regulation: e.regulation, stage: { ...e } },
					header: 'Modifica fase',
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
						await lastValueFrom(this.stageResourceService.deleteStageUsingDELETE(e.item.data.id));
						this.eacs.eventer.launchReloadContent("stage");
					}
				}
			]

		}
	];
	protected stageListPaginator: StalPaginator = {
		page: 0,
		size: 10
	};
	protected stageCount: number;

	createNewRole(incentiveRegulationDto: MbsIncentiveRegulationDto) {
		this.dialogService.open(EnzoRoleDialogComponent, {
			header: 'Create Role',
			width: '70%',
			data: {
				regulation: incentiveRegulationDto
			}
		});
	}

	protected roleTableButtons: any[] = [
		{
			label: "Modifica",
			hideLabel: true,
			icon: "pi pi-pencil",
			severity: "secondary",
			class: "p-button-sm p-button-outlined",
			command: (e: any) => {
				const ref = this.dialogService.open(EnzoRoleDialogComponent, {
					data: { regulation: e.regulation, role: { ...e } },
					header: 'Modifica ruolo',
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
						await lastValueFrom(this.roleResourceService.deleteRoleUsingDELETE(e.item.data.id));
						this.eacs.eventer.launchReloadContent("role");
					}
				}
			]
		}
	];
	protected roleListPaginator: StalPaginator = {
		page: 0,
		size: 10
	};
	protected roleCount: number;

}




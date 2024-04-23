import { Component, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { DialogService } from 'primeng/dynamicdialog';
import { MenuItem } from "primeng/api";

import { StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
import { EngeAppCommonService, EngeAppGenericDetailPageComponent } from "@enge/common-app";

import { MbsIncentiveCalculationFactorResourceService, MbsIncentiveCalculationMethodDto, MbsIncentiveCalculationMethodResourceService, MbsIncentiveRegulationDto, MbsIncentiveRegulationResourceService, MbsIncentiveRoleResourceService, MbsIncentiveStageResourceService, MbsIncentiveWithheldResourceService, MbsProcurementTypeDto, MbsProcurementTypeResourceService} from '@mbs-main';

import { EnzoIncentiveWithheldDialogComponent } from "../../incentive-withheld/incentive-withheld-dialog/incentive-withheld-dialog.component";
import { EnzoIncentiveCalculationMethodDialogComponent } from "../../incentive-calculation-method/incentive-calculation-method-dialog/incentive-calculation-method-dialog.component";
import { EnzoIncentiveStageDialogComponent } from "../../incentive-stage/incentive-stage-dialog/incentive-stage-dialog.component";
import { EnzoIncentiveRoleDialogComponent } from "../../incentive-role/incentive-role-dialog/incentive-role-dialog.component";
import { EnzoIncentiveCalculationDialogComponent } from "../../incentive-calculation/incentive-calculation-dialog/incentive-calculation-dialog.component";
import { EnzoIncentiveCalculationFactorDialogComponent } from "../../incentive-calculation-factor/incentive-calculation-factor-dialog/incentive-calculation-factor-dialog.component";
import { EnzoIncentiveRegulationDialogComponent } from "../incentive-regulation-dialog/incentive-regulation-dialog.component";


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
		private incentiveRegulationResourceService: MbsIncentiveRegulationResourceService,
		private procurementTypeResourceService: MbsProcurementTypeResourceService,
        private incentiveCalculationMethodResourceService: MbsIncentiveCalculationMethodResourceService,
		private incentiveCalculationFactorResourceService: MbsIncentiveCalculationFactorResourceService,
		private incentiveWithheldResourceService: MbsIncentiveWithheldResourceService,
		private incentiveStageResourceService: MbsIncentiveStageResourceService,
		private incentiveRoleResourceService: MbsIncentiveRoleResourceService,
	) { super(eacs, route); }
    
    incentiveRegulationDto: MbsIncentiveRegulationDto;
    procurementTypeDto: MbsProcurementTypeDto;
    childComponentsFilters: any;
    incentiveCalculationMethodDto: MbsIncentiveCalculationMethodDto | undefined;

	override onLoad() {
		this.incentiveRegulationDto = this.route.snapshot.data['incentiveRegulation'];
        this.procurementTypeDto = this.route.snapshot.data['procurementType'];
		
		if(this.incentiveRegulationDto.id)
			this.id = this.incentiveRegulationDto.id

		this.childComponentsFilters = {
			regulationIdEquals: this.incentiveRegulationDto.id,
			procurementTypeIdEquals: this.procurementTypeDto.id
		}
		
		this.localCalculationMethod();
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "incentiveRegulation") this.reloadPage();
		if(event.data === "incentiveCalculationMethod") this.reloadPage();
		if(event.data === "incentiveCalculationFactor") this.reloadPage();
		if(event.data === "incentiveWithheld") this.reloadPage();
		if(event.data === "incentiveStage") this.reloadPage();
		if(event.data === "incentiveRole") this.reloadPage();
	}

	override async reloadPage() {
		this.incentiveRegulationDto = await lastValueFrom(this.incentiveRegulationResourceService.getIncentiveRegulationUsingGET(this.id));

		await this.localCalculationMethod();
	}



    async localCalculationMethod() {
		let incentiveCalculationMethods = await lastValueFrom(this.incentiveCalculationMethodResourceService.getAllIncentiveCalculationMethodsUsingGET(this.childComponentsFilters));
        if(incentiveCalculationMethods.length > 0)
            this.incentiveCalculationMethodDto = incentiveCalculationMethods[0];
		else
			delete this.incentiveCalculationMethodDto;
	}








	createNewIncentiveCalculationMethod(incentiveRegulationDto: MbsIncentiveRegulationDto, procurementTypeDto: MbsProcurementTypeDto) {
		this.dialogService.open(EnzoIncentiveCalculationMethodDialogComponent, {
			header: 'Aggiungi calcolo',
			width: '70%',
			data: {
				regulation: incentiveRegulationDto,
                procurementType: procurementTypeDto
			}
		});
	}

	editIncentiveCalculationMethod(incentiveCalculationMethodDto: MbsIncentiveCalculationMethodDto, incentiveRegulationDto: MbsIncentiveRegulationDto, procurementTypeDto: MbsProcurementTypeDto) {
		this.dialogService.open(EnzoIncentiveCalculationMethodDialogComponent, {
			header: 'Modifica calcolo',
			width: '70%',
			data: {
				incentiveCalculationMethod: incentiveCalculationMethodDto,
				regulation: incentiveRegulationDto,
                procurementType: procurementTypeDto
			}
		});
	}

	async removeIncentiveCalculationMethod(incentiveCalculationMethod: MbsIncentiveCalculationMethodDto) {
		if(!incentiveCalculationMethod.id) return;
		await lastValueFrom(this.incentiveCalculationMethodResourceService.deleteIncentiveCalculationMethodUsingDELETE(incentiveCalculationMethod.id));
		this.eacs.eventer.launchReloadContent("incentiveCalculationMethod");
	}

	createNewIncentiveCalculationFactor(incentiveCalculationMethodDto: MbsIncentiveCalculationMethodDto) {
		this.dialogService.open(EnzoIncentiveCalculationFactorDialogComponent, {
			header: 'Aggiungi fattore di calcolo',
			width: '70%',
			data: {
				incentiveCalculationMethod: incentiveCalculationMethodDto
			}
		});
	}

	protected incentiveCalculationFactorTableButtons: any[] = [
		
		{
			hideLabel: true,
			label: "Modifica",
			icon: "pi pi-pencil",
			severity: "secondary",
			class: "p-button-sm p-button-outlined",
			command: (e: any) => {
				const ref = this.dialogService.open(EnzoIncentiveCalculationFactorDialogComponent, {
					data: { 
						incentiveCalculationFactor: { ...e },
						incentiveCalculationMethod: { ...e.incentiveCalculationMethod }
					},
					header: 'Modifica fattore di calcolo',
					width: '70%'
				});
			},
			childs: [
				{
					label: "Cancella",
					icon: "pi pi-trash",
					command: async (e: any) => {
						await lastValueFrom(this.incentiveCalculationFactorResourceService.deleteIncentiveCalculationFactorUsingDELETE(e.item.data.id));
						this.eacs.eventer.launchReloadContent("incentiveCalculationFactor");
					}
				}
			]
		}
	];
	protected incentiveCalculationFactorListPaginator: StalPaginator = {
		page: 0,
		size: 10
	};
	protected incentiveCalculationFactorCount: number;













    createNewIncentiveWithheld(incentiveRegulationDto: MbsIncentiveRegulationDto, procurementTypeDto: MbsProcurementTypeDto) {
		this.dialogService.open(EnzoIncentiveWithheldDialogComponent, {
			header: 'Aggiungi trattenuta',
			width: '70%',
			data: {
				regulation: incentiveRegulationDto,
                procurementType: procurementTypeDto
			}
		});
	}

	protected incentiveWithheldTableButtons: any[] = [
		{
			label: "Modifica",
			hideLabel: true,
			icon: "pi pi-pencil",
			severity: "secondary",
			class: "p-button-sm p-button-outlined",
			command: (e: any) => {
				const ref = this.dialogService.open(EnzoIncentiveWithheldDialogComponent, {
					data: { 
						incentiveWithheld: { ...e },
						regulation: { ...e.regulation },
						procurementType: { ...e.procurementType }
					},
					header: 'Modifica trattenuta',
					width: '70%'
				});
			},
			childs: [
				{
					label: "Cancella",
					icon: "pi pi-trash",
					command: async (e: any) => {
						await lastValueFrom(this.incentiveWithheldResourceService.deleteIncentiveWithheldUsingDELETE(e.item.data.id));
						this.eacs.eventer.launchReloadContent("incentiveWithheld");
					}
				}
			]
		}
	];
	protected incentiveWithheldListPaginator: StalPaginator = {
		page: 0,
		size: 10
	};
	protected incentiveWithheldCount: number;












}
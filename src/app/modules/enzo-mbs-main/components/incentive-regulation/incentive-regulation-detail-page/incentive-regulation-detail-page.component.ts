import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { DialogService } from 'primeng/dynamicdialog';

import { StalEvent } from "@stal/eventer";
//import { TabManagerService } from '@stal/carder';

import { EngeAppCommonService, EngeAppGenericDetailPageComponent } from "@enge/common-app";

import { MbsIncentiveRegulationDto, MbsIncentiveRegulationResourceService, MbsProcurementTypeDto, MbsProcurementTypeResourceService} from '@mbs-main';
import { EnzoIncentiveRegulationDialogComponent } from '../incentive-regulation-dialog/incentive-regulation-dialog.component';
import { MenuItem } from "primeng/api";

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
		private procurementTypeResourceService: MbsProcurementTypeResourceService,
	) { super(eacs, route); }

	incentiveRegulationDto: MbsIncentiveRegulationDto;
	items: MenuItem[] | undefined;

	override onLoad() {
		this.incentiveRegulationDto = this.route.snapshot.data['incentiveRegulation'];
		this.loadProcurementTypes();
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "incentiveRegulation") this.reloadPage();
	}

	override async reloadPage() {
		this.incentiveRegulationDto = await lastValueFrom(this.resourceService.getIncentiveRegulationUsingGET(this.id));
		this.loadProcurementTypes();
	}

	async loadProcurementTypes() {
		let items: MenuItem[] = [
            { label: 'Home', icon: 'pi pi-fw pi-home' }
        ];

		let procurementTypes: MbsProcurementTypeDto[] = await lastValueFrom(this.procurementTypeResourceService.getAllProcurementTypesUsingGET({}))
		for(let procurementType of procurementTypes) {
			items.push({
				label: procurementType.description,
				routerLink: 'procurement-type/'+procurementType.id
			});
		}
		this.items = items;
	}

	editIncentiveRegulation(incentiveRegulation: MbsIncentiveRegulationDto) {
		const ref = this.dialogService.open(EnzoIncentiveRegulationDialogComponent, {
			data: { incentiveRegulation: incentiveRegulation },
			header: 'Aggiorna regolamento',
			width: '70%'
		});
	}

	async deleteIncentiveRegulation(incentiveRegulation: MbsIncentiveRegulationDto) {
		if(incentiveRegulation.id === undefined) return;
		await lastValueFrom(this.resourceService.deleteIncentiveRegulationUsingDELETE(incentiveRegulation.id));
	}

	

}




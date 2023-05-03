import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { DialogService } from 'primeng/dynamicdialog';

import { StalEventerService, StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { EngeAppGenericDetailPageComponent, EngeAppCommonService } from "@enge/common-app";

import { MbsFaseDto, MbsFaseResourceService} from '@mbs-work';
import { EnzoFaseDialogComponent } from '../fase-dialog/fase-dialog.component';
import { EnzoNominaDialogComponent } from "../../nomina/nomina-dialog/nomina-dialog.component";

@Component({
	selector: 'enzo-fase-detail-page',
	templateUrl: './fase-detail-page.component.html',
	styleUrls: ['./fase-detail-page.component.scss']
})
export class EnzoFaseDetailPageComponent extends EngeAppGenericDetailPageComponent {
	constructor(
		eacs: EngeAppCommonService,
		//public tabManagerService: TabManagerService,
		private dialogService: DialogService,
		private resourceService: MbsFaseResourceService,
	) { super(eacs); }

	faseDto: MbsFaseDto;

	override onLoad() {
		this.faseDto = this.eacs.route.snapshot.data['fase'];
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "fase") this.reloadPage();
	}

	override async reloadPage() {
		this.faseDto = await lastValueFrom(this.resourceService.getFaseUsingGET(this.id));
	}

	editFase(fase: MbsFaseDto) {
		const ref = this.dialogService.open(EnzoFaseDialogComponent, {
			data: { fase: fase },
			header: 'Update fase',
			width: '70%'
		});
	}

	async deleteFase(fase: MbsFaseDto) {
		if(fase.id === undefined) return;
		await lastValueFrom(this.resourceService.deleteFaseUsingDELETE(fase.id));
	}

	createNewNomina(faseDto: MbsFaseDto) {
		this.dialogService.open(EnzoNominaDialogComponent, {
			header: 'Create Nomina',
			width: '70%',
			data: {
				fase: faseDto
			}
		});
	}

	protected nominaTableButtons: any[] = [
		{
			label: "Dettagli",
			hideLabel: true,
			icon: "pi pi-search",
			severity: "secondary",
			class: "p-button-sm p-button-outlined",
			link: "../../../nomina/detail",
			//command: (e: any) => this.tabManagerService.openInCard(),
		}
	];
	protected nominaListPaginator: StalPaginator = {
		page: 0,
		size: 10
	};
	protected nominaCount: number;

}




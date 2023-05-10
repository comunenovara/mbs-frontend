import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { DialogService } from 'primeng/dynamicdialog';

import { StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { EngeAppCommonService, EngeAppGenericDetailPageComponent } from "@enge/common-app";

import { MbsAziendaDto, MbsAziendaResourceService} from '@mbs-work';
import { EnzoAziendaDialogComponent } from '../azienda-dialog/azienda-dialog.component';
import { EnzoNominaDialogComponent } from "../../nomina/nomina-dialog/nomina-dialog.component";

@Component({
	selector: 'enzo-azienda-detail-page',
	templateUrl: './azienda-detail-page.component.html',
	styleUrls: ['./azienda-detail-page.component.scss']
})
export class EnzoAziendaDetailPageComponent extends EngeAppGenericDetailPageComponent {
	constructor(
		eacs: EngeAppCommonService,
		route: ActivatedRoute,
		//public tabManagerService: TabManagerService,
		private dialogService: DialogService,
		private resourceService: MbsAziendaResourceService,
	) { super(eacs, route); }

	aziendaDto: MbsAziendaDto;

	override onLoad() {
		this.aziendaDto = this.route.snapshot.data['azienda'];
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "azienda") this.reloadPage();
	}

	override async reloadPage() {
		this.aziendaDto = await lastValueFrom(this.resourceService.getAziendaUsingGET(this.id));
	}

	editAzienda(azienda: MbsAziendaDto) {
		const ref = this.dialogService.open(EnzoAziendaDialogComponent, {
			data: { azienda: azienda },
			header: 'Update azienda',
			width: '70%'
		});
	}

	async deleteAzienda(azienda: MbsAziendaDto) {
		if(azienda.id === undefined) return;
		await lastValueFrom(this.resourceService.deleteAziendaUsingDELETE(azienda.id));
	}

	createNewNomina(aziendaDto: MbsAziendaDto) {
		this.dialogService.open(EnzoNominaDialogComponent, {
			header: 'Create Nomina',
			width: '70%',
			data: {
				azienda: aziendaDto
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




import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { DialogService } from 'primeng/dynamicdialog';

import { StalEventerService, StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { EngeAppGenericDetailPageComponent } from "@enge/common-app";

import { MbsProgettoDto, MbsProgettoResourceService} from '@mbs-work';
import { EnzoProgettoDialogComponent } from '../progetto-dialog/progetto-dialog.component';
import { EnzoNominaDialogComponent } from "../../nomina/nomina-dialog/nomina-dialog.component";

@Component({
	selector: 'enzo-progetto-detail-page',
	templateUrl: './progetto-detail-page.component.html',
	styleUrls: ['./progetto-detail-page.component.scss']
})
export class EnzoProgettoDetailPageComponent extends EngeAppGenericDetailPageComponent {
	constructor(
		route: ActivatedRoute,
		router: Router,
		eventer: StalEventerService,
		//public tabManagerService: TabManagerService,
		private dialogService: DialogService,
		private resourceService: MbsProgettoResourceService,
	) { super(route, router, eventer); }

	progettoDto: MbsProgettoDto;

	override onLoad() {
		this.progettoDto = this.route.snapshot.data['progetto'];
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "progetto") this.reloadPage();
	}

	override async reloadPage() {
		this.progettoDto = await lastValueFrom(this.resourceService.getProgettoUsingGET(this.id));
	}

	editProgetto(progetto: MbsProgettoDto) {
		const ref = this.dialogService.open(EnzoProgettoDialogComponent, {
			data: { progetto: progetto },
			header: 'Update progetto',
			width: '70%'
		});
	}

	async deleteProgetto(progetto: MbsProgettoDto) {
		if(progetto.id === undefined) return;
		await lastValueFrom(this.resourceService.deleteProgettoUsingDELETE(progetto.id));
	}

	createNewNomina(progettoDto: MbsProgettoDto) {
		this.dialogService.open(EnzoNominaDialogComponent, {
			header: 'Create Nomina',
			width: '70%',
			data: {
				progetto: progettoDto
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




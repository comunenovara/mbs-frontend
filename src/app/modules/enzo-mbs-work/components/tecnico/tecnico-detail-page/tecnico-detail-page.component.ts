import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { DialogService } from 'primeng/dynamicdialog';

import { StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { EngeAppCommonService, EngeAppGenericDetailPageComponent } from "@enge/common-app";

import { MbsTecnicoDto, MbsTecnicoResourceService} from '@mbs-work';
import { EnzoTecnicoDialogComponent } from '../tecnico-dialog/tecnico-dialog.component';
import { EnzoNominaDialogComponent } from "../../nomina/nomina-dialog/nomina-dialog.component";

@Component({
	selector: 'enzo-tecnico-detail-page',
	templateUrl: './tecnico-detail-page.component.html',
	styleUrls: ['./tecnico-detail-page.component.scss']
})
export class EnzoTecnicoDetailPageComponent extends EngeAppGenericDetailPageComponent {
	constructor(
		eacs: EngeAppCommonService,
		route: ActivatedRoute,
		//public tabManagerService: TabManagerService,
		private dialogService: DialogService,
		private resourceService: MbsTecnicoResourceService,
	) { super(eacs, route); }

	tecnicoDto: MbsTecnicoDto;

	override onLoad() {
		this.tecnicoDto = this.route.snapshot.data['tecnico'];
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "tecnico") this.reloadPage();
	}

	override async reloadPage() {
		this.tecnicoDto = await lastValueFrom(this.resourceService.getTecnicoUsingGET(this.id));
	}

	editTecnico(tecnico: MbsTecnicoDto) {
		const ref = this.dialogService.open(EnzoTecnicoDialogComponent, {
			data: { tecnico: tecnico },
			header: 'Update tecnico',
			width: '70%'
		});
	}

	async deleteTecnico(tecnico: MbsTecnicoDto) {
		if(tecnico.id === undefined) return;
		await lastValueFrom(this.resourceService.deleteTecnicoUsingDELETE(tecnico.id));
	}

	createNewNomina(tecnicoDto: MbsTecnicoDto) {
		this.dialogService.open(EnzoNominaDialogComponent, {
			header: 'Create Nomina',
			width: '70%',
			data: {
				tecnico: tecnicoDto
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




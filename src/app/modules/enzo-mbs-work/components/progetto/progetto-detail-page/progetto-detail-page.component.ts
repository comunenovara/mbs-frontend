import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { DialogService } from 'primeng/dynamicdialog';

import { StalEventerService, StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { EngeAppGenericDetailPageComponent } from "@enge/common-app";

import { MbsFaseDto, MbsFaseResourceService, MbsIncaricoDto, MbsIncaricoResourceService, MbsNominaDto, MbsNominaResourceService, MbsProgettoDto, MbsProgettoResourceService} from '@mbs-work';
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
		private incaricoResourceService: MbsIncaricoResourceService,
		private faseResourceService: MbsFaseResourceService,
		private nominaResourceService: MbsNominaResourceService,
	) { super(route, router, eventer); }

	progettoDto: MbsProgettoDto;

	incaricoDtos: MbsIncaricoDto[] = [];
	faseDtos: MbsFaseDto[] = [];
	nomine: any = {};


	override onLoad() {
		this.progettoDto = this.route.snapshot.data['progetto'];
		this.loadSidecar();
	}

	protected override reloadFromEvent(event: StalEvent) {
		this.reloadPage();
		//if(event.data === "progetto") this.reloadPage();
	}

	override async reloadPage() {
		console.log("reloadPage");
		this.progettoDto = await lastValueFrom(this.resourceService.getProgettoUsingGET(this.id));
		this.loadSidecar();
	}

	async loadSidecar() {
		this.incaricoDtos = await lastValueFrom(this.incaricoResourceService.getAllIncaricosUsingGET({}));
		this.faseDtos = await lastValueFrom(this.faseResourceService.getAllFasesUsingGET({}));

		let nominaDtos = await lastValueFrom(this.nominaResourceService.getAllNominasUsingGET({
			progettoIdEquals: this.progettoDto.id
		}));

		this.nomine = {};
		for(let nomina of nominaDtos) {
			if(nomina.faseId === undefined || nomina.faseId === null || nomina.incaricoId === undefined  || nomina.incaricoId === null) {
				continue;
			}

			if(this.nomine[nomina.faseId] === undefined) {
				this.nomine[nomina.faseId] = {}
			}

			this.nomine[nomina.faseId][nomina.incaricoId] = nomina;
		}		
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

	createNewNominaComplex(progettoDto: MbsProgettoDto, faseDto: MbsFaseDto, incaricoDto: MbsIncaricoDto) {
		this.dialogService.open(EnzoNominaDialogComponent, {
			header: 'Create Nomina',
			width: '70%',
			data: {
				progetto: progettoDto,
				fase: faseDto,
				incarico: incaricoDto
			}
		});
	}

	editNomina(nomina: MbsNominaDto, progettoDto: MbsProgettoDto, faseDto: MbsFaseDto, incaricoDto: MbsIncaricoDto) {
		const ref = this.dialogService.open(EnzoNominaDialogComponent, {
			data: { 
				nomina: nomina,
				progetto: progettoDto,
				fase: faseDto,
				incarico: incaricoDto
			},
			header: 'Update nomina',
			width: '70%'
		});
	}

	async deleteNomina(nomina: MbsNominaDto) {
		if(nomina.id === undefined) return;
		await lastValueFrom(this.nominaResourceService.deleteNominaUsingDELETE(nomina.id));
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




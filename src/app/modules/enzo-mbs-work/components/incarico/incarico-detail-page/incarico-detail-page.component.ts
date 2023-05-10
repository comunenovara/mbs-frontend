import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { DialogService } from 'primeng/dynamicdialog';

import { StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { EngeAppCommonService, EngeAppGenericDetailPageComponent } from "@enge/common-app";

import { MbsIncaricoDto, MbsIncaricoResourceService} from '@mbs-work';
import { EnzoIncaricoDialogComponent } from '../incarico-dialog/incarico-dialog.component';
import { EnzoNominaDialogComponent } from "../../nomina/nomina-dialog/nomina-dialog.component";

@Component({
	selector: 'enzo-incarico-detail-page',
	templateUrl: './incarico-detail-page.component.html',
	styleUrls: ['./incarico-detail-page.component.scss']
})
export class EnzoIncaricoDetailPageComponent extends EngeAppGenericDetailPageComponent {
	constructor(
		eacs: EngeAppCommonService,
		route: ActivatedRoute,
		//public tabManagerService: TabManagerService,
		private dialogService: DialogService,
		private resourceService: MbsIncaricoResourceService,
	) { super(eacs, route); }

	incaricoDto: MbsIncaricoDto;

	override onLoad() {
		this.incaricoDto = this.route.snapshot.data['incarico'];
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "incarico") this.reloadPage();
	}

	override async reloadPage() {
		this.incaricoDto = await lastValueFrom(this.resourceService.getIncaricoUsingGET(this.id));
	}

	editIncarico(incarico: MbsIncaricoDto) {
		const ref = this.dialogService.open(EnzoIncaricoDialogComponent, {
			data: { incarico: incarico },
			header: 'Update incarico',
			width: '70%'
		});
	}

	async deleteIncarico(incarico: MbsIncaricoDto) {
		if(incarico.id === undefined) return;
		await lastValueFrom(this.resourceService.deleteIncaricoUsingDELETE(incarico.id));
	}

	createNewNomina(incaricoDto: MbsIncaricoDto) {
		this.dialogService.open(EnzoNominaDialogComponent, {
			header: 'Create Nomina',
			width: '70%',
			data: {
				incarico: incaricoDto
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




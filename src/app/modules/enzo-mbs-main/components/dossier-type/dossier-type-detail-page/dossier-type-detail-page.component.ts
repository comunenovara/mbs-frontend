import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { DialogService } from 'primeng/dynamicdialog';

import { AgalEvent, AgalEventerService } from "@agal-core/modules/eventer/services/eventer.service";
import { AgalPaginator } from "@agal-core/modules/paginator/components/paginator/paginator.component";
import { TabManagerService } from "@tabler/services/tab-manager.service";

import { EnzoGenericDetailPageComponent } from "app/components/enzo-generic-detail.component";
import { MbsDossierTypeDto, MbsDossierTypeResourceService} from '@mbs-main';
import { EnzoDossierTypeDialogComponent } from '../dossier-type-dialog/dossier-type-dialog.component';
import { EnzoDossierDialogComponent } from "../../dossier/dossier-dialog/dossier-dialog.component";

@Component({
	selector: 'enzo-dossier-type-detail-page',
	templateUrl: './dossier-type-detail-page.component.html',
	styleUrls: ['./dossier-type-detail-page.component.scss']
})
export class EnzoDossierTypeDetailPageComponent extends EnzoGenericDetailPageComponent {
	constructor(
		route: ActivatedRoute,
		router: Router,
		eventer: AgalEventerService,
		public tabManagerService: TabManagerService,
		private dialogService: DialogService,
		private resourceService: MbsDossierTypeResourceService,
	) { super(route, router, eventer); }

	dossierTypeDto: MbsDossierTypeDto;

	override onLoad() {
		this.dossierTypeDto = this.route.snapshot.data['dossierType'];
	}

	protected override reloadFromEvent(event: AgalEvent) {
		if(event.data === "dossierType") this.reloadPage();
	}

	override async reloadPage() {
		this.dossierTypeDto = await lastValueFrom(this.resourceService.getDossierTypeUsingGET(this.id));
	}

	editDossierType(dossierType: MbsDossierTypeDto) {
		const ref = this.dialogService.open(EnzoDossierTypeDialogComponent, {
			data: { dossierType: dossierType },
			header: 'Update dossierType',
			width: '70%'
		});
	}

	async deleteDossierType(dossierType: MbsDossierTypeDto) {
		if(dossierType.id === undefined) return;
		await lastValueFrom(this.resourceService.deleteDossierTypeUsingDELETE(dossierType.id));
	}

	createNewDossier(dossierTypeDto: MbsDossierTypeDto) {
		this.dialogService.open(EnzoDossierDialogComponent, {
			header: 'Crea fascicolo',
			width: '70%',
			data: {
				dossierType: dossierTypeDto
			}
		});
	}

	protected dossierTableButtons: any[] = [
		{
			label: "Dettagli",
			hideLabel: true,
			icon: "pi pi-search",
			severity: "secondary",
			class: "p-button-sm p-button-outlined",
			link: "../../../dossier/detail",
			command: (e: any) => this.tabManagerService.openInCard(),
		}
	];
	protected dossierListPaginator: AgalPaginator = {
		page: 0,
		size: 10
	};
	protected dossierCount: number;

}




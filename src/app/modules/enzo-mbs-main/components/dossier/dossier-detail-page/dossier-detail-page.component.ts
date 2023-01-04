import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { DialogService } from 'primeng/dynamicdialog';

import { StalEventerService, StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
import { TabManagerService } from '@stal/carder';

import { EngeAppGenericDetailPageComponent } from "@enge/common-app";

import { MbsDossierDto, MbsDossierResourceService} from '@mbs-main';
import { EnzoDossierDialogComponent } from '../dossier-dialog/dossier-dialog.component';

@Component({
	selector: 'enzo-dossier-detail-page',
	templateUrl: './dossier-detail-page.component.html',
	styleUrls: ['./dossier-detail-page.component.scss']
})
export class EnzoDossierDetailPageComponent extends EngeAppGenericDetailPageComponent {
	constructor(
		route: ActivatedRoute,
		router: Router,
		eventer: StalEventerService,
		public tabManagerService: TabManagerService,
		private dialogService: DialogService,
		private resourceService: MbsDossierResourceService,
	) { super(route, router, eventer); }

	dossierDto: MbsDossierDto;

	override onLoad() {
		this.dossierDto = this.route.snapshot.data['dossier'];
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "dossier") this.reloadPage();
	}

	override async reloadPage() {
		this.dossierDto = await lastValueFrom(this.resourceService.getDossierUsingGET(this.id));
	}

	editDossier(dossier: MbsDossierDto) {
		const ref = this.dialogService.open(EnzoDossierDialogComponent, {
			data: { dossier: dossier },
			header: 'Update dossier',
			width: '70%'
		});
	}

	async deleteDossier(dossier: MbsDossierDto) {
		if(dossier.id === undefined) return;
		await lastValueFrom(this.resourceService.deleteDossierUsingDELETE(dossier.id));
	}

}




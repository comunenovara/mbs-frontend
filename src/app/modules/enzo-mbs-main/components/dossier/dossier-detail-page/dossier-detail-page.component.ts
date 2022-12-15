import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { DialogService } from 'primeng/dynamicdialog';

import { AgalEvent, AgalEventerService } from "@agal-core/modules/eventer/services/eventer.service";
import { AgalPaginator } from "@agal-core/modules/paginator/components/paginator/paginator.component";
import { TabManagerService } from "@tabler/services/tab-manager.service";

import { EnzoGenericDetailPageComponent } from "app/components/enzo-generic-detail.component";
import { MbsDossierDto, MbsDossierResourceService} from '@mbs-main';
import { EnzoDossierDialogComponent } from '../dossier-dialog/dossier-dialog.component';

@Component({
	selector: 'enzo-dossier-detail-page',
	templateUrl: './dossier-detail-page.component.html',
	styleUrls: ['./dossier-detail-page.component.scss']
})
export class EnzoDossierDetailPageComponent extends EnzoGenericDetailPageComponent {
	constructor(
		route: ActivatedRoute,
		router: Router,
		eventer: AgalEventerService,
		public tabManagerService: TabManagerService,
		private dialogService: DialogService,
		private resourceService: MbsDossierResourceService,
	) { super(route, router, eventer); }

	dossierDto: MbsDossierDto;

	override onLoad() {
		this.dossierDto = this.route.snapshot.data['dossier'];
	}

	protected override reloadFromEvent(event: AgalEvent) {
		if(event.data === "dossier") this.reloadPage();
	}

	override async reloadPage() {
		this.dossierDto = await lastValueFrom(this.resourceService.getDossierUsingGET(this.id));
	}

	editDossier(dossier: MbsDossierDto) {
		const ref = this.dialogService.open(EnzoDossierDialogComponent, {
			data: dossier,
			header: 'Update dossier',
			width: '70%'
		});
	}

	async deleteDossier(dossier: MbsDossierDto) {
		if(dossier.id === undefined) return;
		await lastValueFrom(this.resourceService.deleteDossierUsingDELETE(dossier.id));
	}

}




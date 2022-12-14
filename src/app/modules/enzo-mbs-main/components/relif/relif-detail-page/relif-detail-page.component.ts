import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { DialogService } from 'primeng/dynamicdialog';

import { AgalEvent, AgalEventerService } from "@agal-core/modules/eventer/services/eventer.service";
import { TabManagerService } from "@tabler/services/tab-manager.service";

import { EnzoGenericDetailPageComponent } from "app/components/enzo-generic-detail.component";
import { MbsRelifDto, MbsRelifResourceService} from '@mbs-main';
import { EnzoRelifDialogComponent } from '../relif-dialog/relif-dialog.component';

@Component({
	selector: 'enzo-relif-detail-page',
	templateUrl: './relif-detail-page.component.html',
	styleUrls: ['./relif-detail-page.component.scss']
})
export class EnzoRelifDetailPageComponent extends EnzoGenericDetailPageComponent {
	constructor(
		route: ActivatedRoute,
		router: Router,
		eventer: AgalEventerService,
		public tabManagerService: TabManagerService,
		private dialogService: DialogService,
		private resourceService: MbsRelifResourceService,
	) { super(route, router, eventer); }

	relifDto: MbsRelifDto;

	override onLoad() {
		this.relifDto = this.route.snapshot.data['relif'];
	}

	protected override reloadFromEvent(event: AgalEvent) {
		if(event.data === "relif") this.reloadPage();
	}

	override async reloadPage() {
		this.relifDto = await lastValueFrom(this.resourceService.getRelifUsingGET(this.id));
	}

	editRelif(relif: MbsRelifDto) {
		const ref = this.dialogService.open(EnzoRelifDialogComponent, {
			data: relif,
			header: 'Update relif',
			width: '70%'
		});
	}

	async deleteRelif(relif: MbsRelifDto) {
		if(relif.id === undefined) return;
		await lastValueFrom(this.resourceService.deleteRelifUsingDELETE(relif.id));
	}
}




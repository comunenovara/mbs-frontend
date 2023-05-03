import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { DialogService } from 'primeng/dynamicdialog';

import { StalEventerService, StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { EngeAppGenericDetailPageComponent, EngeAppCommonService } from "@enge/common-app";

import { MbsAssignementDto, MbsAssignementResourceService} from '@mbs-work';
import { EnzoAssignementDialogComponent } from '../assignement-dialog/assignement-dialog.component';

@Component({
	selector: 'enzo-assignement-detail-page',
	templateUrl: './assignement-detail-page.component.html',
	styleUrls: ['./assignement-detail-page.component.scss']
})
export class EnzoAssignementDetailPageComponent extends EngeAppGenericDetailPageComponent {
	constructor(
		eacs: EngeAppCommonService,
		//public tabManagerService: TabManagerService,
		private dialogService: DialogService,
		private resourceService: MbsAssignementResourceService,
	) { super(eacs); }

	assignementDto: MbsAssignementDto;

	override onLoad() {
		this.assignementDto = this.eacs.route.snapshot.data['assignement'];
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "assignement") this.reloadPage();
	}

	override async reloadPage() {
		this.assignementDto = await lastValueFrom(this.resourceService.getAssignementUsingGET(this.id));
	}

	editAssignement(assignement: MbsAssignementDto) {
		const ref = this.dialogService.open(EnzoAssignementDialogComponent, {
			data: { assignement: assignement },
			header: 'Update assignement',
			width: '70%'
		});
	}

	async deleteAssignement(assignement: MbsAssignementDto) {
		if(assignement.id === undefined) return;
		await lastValueFrom(this.resourceService.deleteAssignementUsingDELETE(assignement.id));
	}

}




import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { DialogService } from 'primeng/dynamicdialog';

import { StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { EngeAppCommonService, EngeAppGenericDetailPageComponent } from "@enge/common-app";

import { MbsGovernativeProjectProcurementLotDto, MbsGovernativeProjectProcurementLotResourceService} from '@mbs-main';
import { EnzoGovernativeProjectProcurementLotDialogComponent } from '../governative-project-procurement-lot-dialog/governative-project-procurement-lot-dialog.component';

@Component({
	selector: 'enzo-governative-project-procurement-lot-detail-page',
	templateUrl: './governative-project-procurement-lot-detail-page.component.html',
	styleUrls: ['./governative-project-procurement-lot-detail-page.component.scss']
})
export class EnzoGovernativeProjectProcurementLotDetailPageComponent extends EngeAppGenericDetailPageComponent {
	constructor(
		eacs: EngeAppCommonService,
		route: ActivatedRoute,
		//public tabManagerService: TabManagerService,
		private dialogService: DialogService,
		private resourceService: MbsGovernativeProjectProcurementLotResourceService,
	) { super(eacs, route); }

	governativeProjectProcurementLotDto: MbsGovernativeProjectProcurementLotDto;

	override onLoad() {
		this.governativeProjectProcurementLotDto = this.route.snapshot.data['governativeProjectProcurementLot'];
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "governativeProjectProcurementLot") this.reloadPage();
	}

	override async reloadPage() {
		this.governativeProjectProcurementLotDto = await lastValueFrom(this.resourceService.getGovernativeProjectProcurementLotUsingGET(this.id));
	}

	editGovernativeProjectProcurementLot(governativeProjectProcurementLot: MbsGovernativeProjectProcurementLotDto) {
		const ref = this.dialogService.open(EnzoGovernativeProjectProcurementLotDialogComponent, {
			data: { governativeProjectProcurementLot: governativeProjectProcurementLot },
			header: 'Update governativeProjectProcurementLot',
			width: '70%'
		});
	}

	async deleteGovernativeProjectProcurementLot(governativeProjectProcurementLot: MbsGovernativeProjectProcurementLotDto) {
		if(governativeProjectProcurementLot.id === undefined) return;
		await lastValueFrom(this.resourceService.deleteGovernativeProjectProcurementLotUsingDELETE(governativeProjectProcurementLot.id));
	}

}




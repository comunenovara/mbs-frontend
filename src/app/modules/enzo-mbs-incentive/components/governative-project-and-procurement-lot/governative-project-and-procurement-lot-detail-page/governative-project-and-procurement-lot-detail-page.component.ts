import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { DialogService } from 'primeng/dynamicdialog';

import { StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { EngeAppCommonService, EngeAppGenericDetailPageComponent } from "@enge/common-app";

import { MbsGovernativeProjectAndProcurementLotDto, MbsGovernativeProjectAndProcurementLotResourceService} from '@mbs-incentive';
import { EnzoGovernativeProjectAndProcurementLotDialogComponent } from '../governative-project-and-procurement-lot-dialog/governative-project-and-procurement-lot-dialog.component';

@Component({
	selector: 'enzo-governative-project-and-procurement-lot-detail-page',
	templateUrl: './governative-project-and-procurement-lot-detail-page.component.html',
	styleUrls: ['./governative-project-and-procurement-lot-detail-page.component.scss']
})
export class EnzoGovernativeProjectAndProcurementLotDetailPageComponent extends EngeAppGenericDetailPageComponent {
	constructor(
		eacs: EngeAppCommonService,
		route: ActivatedRoute,
		//public tabManagerService: TabManagerService,
		private dialogService: DialogService,
		private resourceService: MbsGovernativeProjectAndProcurementLotResourceService,
	) { super(eacs, route); }

	governativeProjectAndProcurementLotDto: MbsGovernativeProjectAndProcurementLotDto;

	override onLoad() {
		this.governativeProjectAndProcurementLotDto = this.route.snapshot.data['governativeProjectAndProcurementLot'];
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "governativeProjectAndProcurementLot") this.reloadPage();
	}

	override async reloadPage() {
		this.governativeProjectAndProcurementLotDto = await lastValueFrom(this.resourceService.getGovernativeProjectAndProcurementLotUsingGET(this.id));
	}

	editGovernativeProjectAndProcurementLot(governativeProjectAndProcurementLot: MbsGovernativeProjectAndProcurementLotDto) {
		const ref = this.dialogService.open(EnzoGovernativeProjectAndProcurementLotDialogComponent, {
			data: { governativeProjectAndProcurementLot: governativeProjectAndProcurementLot },
			header: 'Update governativeProjectAndProcurementLot',
			width: '70%'
		});
	}

	async deleteGovernativeProjectAndProcurementLot(governativeProjectAndProcurementLot: MbsGovernativeProjectAndProcurementLotDto) {
		if(governativeProjectAndProcurementLot.id === undefined) return;
		await lastValueFrom(this.resourceService.deleteGovernativeProjectAndProcurementLotUsingDELETE(governativeProjectAndProcurementLot.id));
	}

}




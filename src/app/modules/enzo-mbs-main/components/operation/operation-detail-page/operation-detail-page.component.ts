import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { DialogService } from 'primeng/dynamicdialog';

import { AgalEvent, AgalEventerService } from "@agal-core/modules/eventer/services/eventer.service";
import { TabManagerService } from "@tabler/services/tab-manager.service";

import { EnzoGenericDetailPageComponent } from "app/components/enzo-generic-detail.component";
import { MbsOperationDto, MbsOperationResourceService} from '@mbs-main';
import { EnzoOperationDialogComponent } from '../operation-dialog/operation-dialog.component';

@Component({
	selector: 'enzo-operation-detail-page',
	templateUrl: './operation-detail-page.component.html',
	styleUrls: ['./operation-detail-page.component.scss']
})
export class EnzoOperationDetailPageComponent extends EnzoGenericDetailPageComponent {
	constructor(
		route: ActivatedRoute,
		router: Router,
		eventer: AgalEventerService,
		public tabManagerService: TabManagerService,
		private dialogService: DialogService,
		private resourceService: MbsOperationResourceService,
	) { super(route, router, eventer); }

	operationDto: MbsOperationDto;

	override onLoad() {
		this.operationDto = this.route.snapshot.data['operation'];
	}

	protected override reloadFromEvent(event: AgalEvent) {
		if(event.data === "operation") this.reloadPage();
	}

	override async reloadPage() {
		this.operationDto = await lastValueFrom(this.resourceService.getOperationUsingGET(this.id));
	}

	editOperation(operation: MbsOperationDto) {
		const ref = this.dialogService.open(EnzoOperationDialogComponent, {
			data: operation,
			header: 'Update operation',
			width: '70%'
		});
	}

	async deleteOperation(operation: MbsOperationDto) {
		if(operation.id === undefined) return;
		await lastValueFrom(this.resourceService.deleteOperationUsingDELETE(operation.id));
	}
}




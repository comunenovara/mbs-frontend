import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { DialogService } from 'primeng/dynamicdialog';

import { AgalEvent, AgalEventerService } from "@agal-core/modules/eventer/services/eventer.service";
import { AgalPaginator } from "@agal-core/modules/paginator/components/paginator/paginator.component";
import { TabManagerService } from "@tabler/services/tab-manager.service";

import { EnzoGenericDetailPageComponent } from "app/components/enzo-generic-detail.component";
import { MbsOperationTypeDto, MbsOperationTypeResourceService} from '@mbs-main';
import { EnzoOperationTypeDialogComponent } from '../operation-type-dialog/operation-type-dialog.component';

@Component({
	selector: 'enzo-operation-type-detail-page',
	templateUrl: './operation-type-detail-page.component.html',
	styleUrls: ['./operation-type-detail-page.component.scss']
})
export class EnzoOperationTypeDetailPageComponent extends EnzoGenericDetailPageComponent {
	constructor(
		route: ActivatedRoute,
		router: Router,
		eventer: AgalEventerService,
		public tabManagerService: TabManagerService,
		private dialogService: DialogService,
		private resourceService: MbsOperationTypeResourceService,
	) { super(route, router, eventer); }

	operationTypeDto: MbsOperationTypeDto;

	override onLoad() {
		this.operationTypeDto = this.route.snapshot.data['operationType'];
	}

	protected override reloadFromEvent(event: AgalEvent) {
		if(event.data === "operationType") this.reloadPage();
	}

	override async reloadPage() {
		this.operationTypeDto = await lastValueFrom(this.resourceService.getOperationTypeUsingGET(this.id));
	}

	editOperationType(operationType: MbsOperationTypeDto) {
		const ref = this.dialogService.open(EnzoOperationTypeDialogComponent, {
			data: operationType,
			header: 'Update operationType',
			width: '70%'
		});
	}

	async deleteOperationType(operationType: MbsOperationTypeDto) {
		if(operationType.id === undefined) return;
		await lastValueFrom(this.resourceService.deleteOperationTypeUsingDELETE(operationType.id));
	}

	protected operationTableButtons: any[] = [
		{
			label: "Dettagli",
			hideLabel: true,
			icon: "pi pi-search",
			severity: "secondary",
			class: "p-button-sm p-button-outlined",
			link: "../../../operation/detail",
			command: (e: any) => this.tabManagerService.openInCard(),
		}
	];
	protected operationListPaginator: AgalPaginator = {
		page: 0,
		size: 10
	};
}




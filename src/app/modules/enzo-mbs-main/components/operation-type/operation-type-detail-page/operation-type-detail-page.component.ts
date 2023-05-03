import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { DialogService } from 'primeng/dynamicdialog';

import { StalEventerService, StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
import { TabManagerService } from '@stal/carder';

import { EngeAppGenericDetailPageComponent, EngeAppCommonService } from "@enge/common-app";

import { MbsOperationTypeDto, MbsOperationTypeResourceService} from '@mbs-main';
import { EnzoOperationTypeDialogComponent } from '../operation-type-dialog/operation-type-dialog.component';
import { EnzoOperationDialogComponent } from "../../operation/operation-dialog/operation-dialog.component";

@Component({
	selector: 'enzo-operation-type-detail-page',
	templateUrl: './operation-type-detail-page.component.html',
	styleUrls: ['./operation-type-detail-page.component.scss']
})
export class EnzoOperationTypeDetailPageComponent extends EngeAppGenericDetailPageComponent {
	constructor(
		eacs: EngeAppCommonService,
		public tabManagerService: TabManagerService,
		private dialogService: DialogService,
		private resourceService: MbsOperationTypeResourceService,
	) { super(eacs); }

	operationTypeDto: MbsOperationTypeDto;

	override onLoad() {
		this.operationTypeDto = this.eacs.route.snapshot.data['operationType'];
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "operationType") this.reloadPage();
	}

	override async reloadPage() {
		this.operationTypeDto = await lastValueFrom(this.resourceService.getOperationTypeUsingGET(this.id));
	}

	editOperationType(operationType: MbsOperationTypeDto) {
		const ref = this.dialogService.open(EnzoOperationTypeDialogComponent, {
			data: { operationType: operationType },
			header: 'Update operationType',
			width: '70%'
		});
	}

	async deleteOperationType(operationType: MbsOperationTypeDto) {
		if(operationType.id === undefined) return;
		await lastValueFrom(this.resourceService.deleteOperationTypeUsingDELETE(operationType.id));
	}

	createNewOperation(operationTypeDto: MbsOperationTypeDto) {
		this.dialogService.open(EnzoOperationDialogComponent, {
			header: 'Crea intervento',
			width: '70%',
			data: {
				operationType: operationTypeDto
			}
		});
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
	protected operationListPaginator: StalPaginator = {
		page: 0,
		size: 10
	};
	protected operationCount: number;

}




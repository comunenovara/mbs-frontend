import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { DialogService } from 'primeng/dynamicdialog';

import { StalEventerService, StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
import { TabManagerService } from '@stal/carder';

import { EngeAppGenericDetailPageComponent } from "@enge/common-app";

import { MbsOperationDto, MbsOperationResourceService} from '@mbs-main';
import { EnzoOperationDialogComponent } from '../operation-dialog/operation-dialog.component';
import { EnzoDossierDialogComponent } from "../../dossier/dossier-dialog/dossier-dialog.component";

@Component({
	selector: 'enzo-operation-detail-page',
	templateUrl: './operation-detail-page.component.html',
	styleUrls: ['./operation-detail-page.component.scss']
})
export class EnzoOperationDetailPageComponent extends EngeAppGenericDetailPageComponent {
	constructor(
		route: ActivatedRoute,
		router: Router,
		eventer: StalEventerService,
		public tabManagerService: TabManagerService,
		private dialogService: DialogService,
		private resourceService: MbsOperationResourceService,
	) { super(route, router, eventer); }

	operationDto: MbsOperationDto;

	override onLoad() {
		this.operationDto = this.route.snapshot.data['operation'];
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "operation") this.reloadPage();
	}

	override async reloadPage() {
		this.operationDto = await lastValueFrom(this.resourceService.getOperationUsingGET(this.id));
	}

	editOperation(operation: MbsOperationDto) {
		const ref = this.dialogService.open(EnzoOperationDialogComponent, {
			data: { operation: operation },
			header: 'Update operation',
			width: '70%'
		});
	}

	async deleteOperation(operation: MbsOperationDto) {
		if(operation.id === undefined) return;
		await lastValueFrom(this.resourceService.deleteOperationUsingDELETE(operation.id));
	}

	createNewDossier(operationDto: MbsOperationDto) {
		this.dialogService.open(EnzoDossierDialogComponent, {
			header: 'Create Dossier',
			width: '70%',
			data: {
				operation: operationDto
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
	protected dossierListPaginator: StalPaginator = {
		page: 0,
		size: 10
	};
	protected dossierCount: number;

}




import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { DialogService } from 'primeng/dynamicdialog';

import { StalEventerService, StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { MbsOperationTypeResourceService } from '@mbs-main';
import { EnzoOperationTypeDialogComponent } from '../operation-type-dialog/operation-type-dialog.component';

@Component({
	templateUrl  : './operation-type-list-page.component.html',
	styleUrls: ['./operation-type-list-page.component.scss']
})
export class EnzoOperationTypeListPageComponent {
	constructor(
		private router: Router,
		//public tabManagerService: TabManagerService,
		private resourceService: MbsOperationTypeResourceService,
		private dialogService: DialogService,
		public eventer: StalEventerService,

	) { }

	createNewOperationType() {
		this.dialogService.open(EnzoOperationTypeDialogComponent, {
			header: 'Crea tipo intervento',
			width: '70%'
		});
	}

	operationTypeListPaginator: StalPaginator = {
		page: 0,
		size: 30
	};
	operationTypeCount: number;

	operationTypeListDc = ['_ck', 'id', 'description'];
	paginatorEvent(paginator: any) {
		let operationTypeListPaginator = { ...paginator }
		this.operationTypeListPaginator = operationTypeListPaginator;
	}

	exportButtons: any[] =  [
		{
			label: 'Pdf',
			icon: 'pi pi-file-pdf', command: () => {
				console.log("pdf");
			},
		},
		{
			label: 'Csv',
			icon: 'pi pi-file-excel', command: () => {
				console.log("csv");
			}
		}
	]

	tableButtons: any[] = [
		{
			label: "Dettagli",
			hideLabel: true,
			icon: "pi pi-search",
			severity: "secondary",
			class: "p-button-sm p-button-outlined",
			link: "../detail",
			//command: (e: any) => this.tabManagerService.openInTab(),
			childs: [
				{
					label: "Modifica",
					icon: "pi pi-pencil",
					command: (e: any) => {
						const ref = this.dialogService.open(EnzoOperationTypeDialogComponent, {
							data: { operationType: { ...e.item.data } },
							header: 'Update operationType',
							width: '70%'
						});
					}
				},
				{
					label: "Cancella",
					icon: "pi pi-trash",
					command: async (e: any) => {
						await lastValueFrom(this.resourceService.deleteOperationTypeUsingDELETE(e.item.data.id));
						this.eventer.launchReloadContent("operationType");
					}
				}
			]
		}
	]
}
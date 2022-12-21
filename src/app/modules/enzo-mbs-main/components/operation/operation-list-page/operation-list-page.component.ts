import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { DialogService } from 'primeng/dynamicdialog';

import { AgalEventerService } from '@agal-core/modules/eventer/services/eventer.service';
import { AgalPaginator } from '@agal-core/modules/paginator/components/paginator/paginator.component';
import { TabManagerService } from '@stal/carder';

import { MbsOperationResourceService } from '@mbs-main';
import { EnzoOperationDialogComponent } from '../operation-dialog/operation-dialog.component';

@Component({
	templateUrl  : './operation-list-page.component.html',
	styleUrls: ['./operation-list-page.component.scss']
})
export class EnzoOperationListPageComponent {
	constructor(
		private router: Router,
		public tabManagerService: TabManagerService,
		private resourceService: MbsOperationResourceService,
		private dialogService: DialogService,
		public eventer: AgalEventerService,

	) { }

	createNewOperation() {
		this.dialogService.open(EnzoOperationDialogComponent, {
			header: 'Crea intervento',
			width: '70%'
		});
	}

	operationListPaginator: AgalPaginator = {
		page: 0,
		size: 30
	};
	operationCount: number;

	operationListDc = ['_ck', 'id', 'type.description', 'asset.description', 'description', 'value', 'startDate', 'endDate'];
	paginatorEvent(paginator: any) {
		let operationListPaginator = { ...paginator }
		this.operationListPaginator = operationListPaginator;
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
			command: (e: any) => this.tabManagerService.openInTab(),
			childs: [
				{
					label: "Modifica",
					icon: "pi pi-pencil",
					command: (e: any) => {
						const ref = this.dialogService.open(EnzoOperationDialogComponent, {
							data: { operation: { ...e.item.data } },
							header: 'Modifica intervento',
							width: '70%'
						});
					}
				},
				{
					label: "Cancella",
					icon: "pi pi-trash",
					command: async (e: any) => {
						await lastValueFrom(this.resourceService.deleteOperationUsingDELETE(e.item.data.id));
						this.eventer.launchReloadContent("operation");
					}
				}
			]
		}
	]
}
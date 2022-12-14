import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { DialogService } from 'primeng/dynamicdialog';

import { AgalPaginator } from '@agal-core/modules/paginator/components/paginator/paginator.component';
import { TabManagerService } from '@tabler/services/tab-manager.service';

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
	) { }

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
					label: "Edit",
					icon: "pi pi-pencil",
					command: (e: any) => {
						const ref = this.dialogService.open(EnzoOperationDialogComponent, {
							data: e.item.data,
							header: 'Update operation',
							width: '70%'
						});
					}
				},
				{
					label: "Delete",
					icon: "pi pi-trash",
					command: async (e: any) => {
						await lastValueFrom(this.resourceService.deleteOperationUsingDELETE(e.item.data.id));
					}
				}
			]
		}
	]
}
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { DialogService } from 'primeng/dynamicdialog';

import { StalEventerService, StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';


import { MbsProcurementTypeResourceService } from '@mbs-main';
import { EnzoProcurementTypeDialogComponent } from '../procurement-type-dialog/procurement-type-dialog.component';

@Component({
	templateUrl  : './procurement-type-list-page.component.html',
	styleUrls: ['./procurement-type-list-page.component.scss']
})
export class EnzoProcurementTypeListPageComponent {
	constructor(
		private router: Router,
		//public tabManagerService: TabManagerService,
		private resourceService: MbsProcurementTypeResourceService,
		private dialogService: DialogService,
		public eventer: StalEventerService,

	) { }

	createNewProcurementType() {
		this.dialogService.open(EnzoProcurementTypeDialogComponent, {
			header: 'Create procurementType',
			width: '70%'
		});
	}

	procurementTypeListPaginator: StalPaginator = {
		page: 0,
		size: 30
	};
	procurementTypeCount: number;

	procurementTypeListDc = ['_ck', 'id', 'description'];
	paginatorEvent(paginator: any) {
		let procurementTypeListPaginator = { ...paginator }
		this.procurementTypeListPaginator = procurementTypeListPaginator;
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
			label: "Edit",
			icon: "pi pi-pencil",
			severity: "secondary",
			class: "p-button-sm p-button-outlined",
			hideLabel: true,
			command: (e: any) => {
				console.log(e);
				const ref = this.dialogService.open(EnzoProcurementTypeDialogComponent, {
					data: { procurementType: { ...e } },
					header: 'Update procurementType',
					width: '70%'
				});
			},
			childs: [
				{
					label: "Delete",
					icon: "pi pi-trash",
					command: async (e: any) => {
						await lastValueFrom(this.resourceService.deleteProcurementTypeUsingDELETE(e.item.data.id));
						this.eventer.launchReloadContent("procurementType");
					}
				}
			]
		}
	]
}
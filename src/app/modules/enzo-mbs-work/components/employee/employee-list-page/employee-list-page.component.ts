import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { DialogService } from 'primeng/dynamicdialog';

import { StalEventerService, StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { MbsEmployeeResourceService } from '@mbs-work';
import { EnzoEmployeeDialogComponent } from '../employee-dialog/employee-dialog.component';

@Component({
	templateUrl  : './employee-list-page.component.html',
	styleUrls: ['./employee-list-page.component.scss']
})
export class EnzoEmployeeListPageComponent {
	constructor(
		private router: Router,
		//public tabManagerService: TabManagerService,
		private resourceService: MbsEmployeeResourceService,
		private dialogService: DialogService,
		public eventer: StalEventerService,

	) { }

	createNewEmployee() {
		this.dialogService.open(EnzoEmployeeDialogComponent, {
			header: 'Create employee',
			width: '70%'
		});
	}

	employeeListPaginator: StalPaginator = {
		page: 0,
		size: 30
	};
	employeeCount: number;

	employeeListDc = ['_ck', 'id', 'name'];
	paginatorEvent(paginator: any) {
		let employeeListPaginator = { ...paginator }
		this.employeeListPaginator = employeeListPaginator;
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
					label: "Edit",
					icon: "pi pi-pencil",
					command: (e: any) => {
						const ref = this.dialogService.open(EnzoEmployeeDialogComponent, {
							data: { employee: { ...e.item.data } },
							header: 'Update employee',
							width: '70%'
						});
					}
				},
				{
					label: "Delete",
					icon: "pi pi-trash",
					command: async (e: any) => {
						await lastValueFrom(this.resourceService.deleteEmployeeUsingDELETE(e.item.data.id));
						this.eventer.launchReloadContent("employee");
					}
				}
			]
		}
	]
}
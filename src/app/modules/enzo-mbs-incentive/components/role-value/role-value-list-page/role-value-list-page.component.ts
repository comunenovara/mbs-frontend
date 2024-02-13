import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { DialogService } from 'primeng/dynamicdialog';

import { StalEventerService, StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { MbsRoleValueResourceService } from '@mbs-incentive';
import { EnzoRoleValueDialogComponent } from '../role-value-dialog/role-value-dialog.component';

@Component({
	templateUrl  : './role-value-list-page.component.html',
	styleUrls: ['./role-value-list-page.component.scss']
})
export class EnzoRoleValueListPageComponent {
	constructor(
		private router: Router,
		//public tabManagerService: TabManagerService,
		private resourceService: MbsRoleValueResourceService,
		private dialogService: DialogService,
		public eventer: StalEventerService,

	) { }

	createNewRoleValue() {
		this.dialogService.open(EnzoRoleValueDialogComponent, {
			header: 'Create roleValue',
			width: '70%'
		});
	}

	roleValueListPaginator: StalPaginator = {
		page: 0,
		size: 30
	};
	roleValueCount: number;

	roleValueListDc = ['_ck', 'id'];
	paginatorEvent(paginator: any) {
		let roleValueListPaginator = { ...paginator }
		this.roleValueListPaginator = roleValueListPaginator;
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
						const ref = this.dialogService.open(EnzoRoleValueDialogComponent, {
							data: { roleValue: { ...e.item.data } },
							header: 'Update roleValue',
							width: '70%'
						});
					}
				},
				{
					label: "Delete",
					icon: "pi pi-trash",
					command: async (e: any) => {
						await lastValueFrom(this.resourceService.deleteRoleValueUsingDELETE(e.item.data.id));
						this.eventer.launchReloadContent("roleValue");
					}
				}
			]
		}
	]
}
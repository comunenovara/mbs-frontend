import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { DialogService } from 'primeng/dynamicdialog';

import { StalEventerService, StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { MbsRoleResourceService } from '@mbs-incentive';
import { EnzoRoleDialogComponent } from '../role-dialog/role-dialog.component';

@Component({
	templateUrl  : './role-list-page.component.html',
	styleUrls: ['./role-list-page.component.scss']
})
export class EnzoRoleListPageComponent {
	constructor(
		private router: Router,
		//public tabManagerService: TabManagerService,
		private resourceService: MbsRoleResourceService,
		private dialogService: DialogService,
		public eventer: StalEventerService,

	) { }

	createNewRole() {
		this.dialogService.open(EnzoRoleDialogComponent, {
			header: 'Create role',
			width: '70%'
		});
	}

	roleListPaginator: StalPaginator = {
		page: 0,
		size: 30
	};
	roleCount: number;

	roleListDc = ['_ck', 'id'];
	paginatorEvent(paginator: any) {
		let roleListPaginator = { ...paginator }
		this.roleListPaginator = roleListPaginator;
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
						const ref = this.dialogService.open(EnzoRoleDialogComponent, {
							data: { role: { ...e.item.data } },
							header: 'Update role',
							width: '70%'
						});
					}
				},
				{
					label: "Delete",
					icon: "pi pi-trash",
					command: async (e: any) => {
						await lastValueFrom(this.resourceService.deleteRoleUsingDELETE(e.item.data.id));
						this.eventer.launchReloadContent("role");
					}
				}
			]
		}
	]
}
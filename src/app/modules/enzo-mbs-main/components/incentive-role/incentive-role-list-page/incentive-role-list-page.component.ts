import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { DialogService } from 'primeng/dynamicdialog';

import { StalEventerService, StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { MbsIncentiveRoleResourceService } from '@mbs-main';
import { EnzoIncentiveRoleDialogComponent } from '../incentive-role-dialog/incentive-role-dialog.component';

@Component({
	templateUrl  : './incentive-role-list-page.component.html',
	styleUrls: ['./incentive-role-list-page.component.scss']
})
export class EnzoIncentiveRoleListPageComponent {
	constructor(
		private router: Router,
		//public tabManagerService: TabManagerService,
		private resourceService: MbsIncentiveRoleResourceService,
		private dialogService: DialogService,
		public eventer: StalEventerService,

	) { }

	createNewIncentiveRole() {
		this.dialogService.open(EnzoIncentiveRoleDialogComponent, {
			header: 'Create incentiveRole',
			width: '70%'
		});
	}

	incentiveRoleListPaginator: StalPaginator = {
		page: 0,
		size: 30
	};
	incentiveRoleCount: number;

	incentiveRoleListDc = ['_ck', 'id', 'regulation.description', 'procurementType.description', 'description'];
	paginatorEvent(paginator: any) {
		let incentiveRoleListPaginator = { ...paginator }
		this.incentiveRoleListPaginator = incentiveRoleListPaginator;
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
						const ref = this.dialogService.open(EnzoIncentiveRoleDialogComponent, {
							data: { incentiveRole: { ...e.item.data } },
							header: 'Update incentiveRole',
							width: '70%'
						});
					}
				},
				{
					label: "Delete",
					icon: "pi pi-trash",
					command: async (e: any) => {
						await lastValueFrom(this.resourceService.deleteIncentiveRoleUsingDELETE(e.item.data.id));
						this.eventer.launchReloadContent("incentiveRole");
					}
				}
			]
		}
	]
}
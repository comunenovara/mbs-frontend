import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { DialogService } from 'primeng/dynamicdialog';

import { StalEventerService, StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';


import { MbsIncentiveRoleValueResourceService } from '@mbs-incentive';
import { EnzoIncentiveRoleValueDialogComponent } from '../incentive-role-value-dialog/incentive-role-value-dialog.component';

@Component({
	templateUrl  : './incentive-role-value-list-page.component.html',
	styleUrls: ['./incentive-role-value-list-page.component.scss']
})
export class EnzoIncentiveRoleValueListPageComponent {
	constructor(
		private router: Router,
		//public tabManagerService: TabManagerService,
		private resourceService: MbsIncentiveRoleValueResourceService,
		private dialogService: DialogService,
		public eventer: StalEventerService,

	) { }

	createNewIncentiveRoleValue() {
		this.dialogService.open(EnzoIncentiveRoleValueDialogComponent, {
			header: 'Create incentiveRoleValue',
			width: '70%'
		});
	}

	incentiveRoleValueListPaginator: StalPaginator = {
		page: 0,
		size: 30
	};
	incentiveRoleValueCount: number;

	incentiveRoleValueListDc = ['_ck', 'id'];
	paginatorEvent(paginator: any) {
		let incentiveRoleValueListPaginator = { ...paginator }
		this.incentiveRoleValueListPaginator = incentiveRoleValueListPaginator;
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
			////command: (e: any) => this.tabManagerService.openInTab(),
			childs: [
				{
					label: "Edit",
					icon: "pi pi-pencil",
					command: (e: any) => {
						const ref = this.dialogService.open(EnzoIncentiveRoleValueDialogComponent, {
							data: { incentiveRoleValue: { ...e.item.data } },
							header: 'Update incentiveRoleValue',
							width: '70%'
						});
					}
				},
				{
					label: "Delete",
					icon: "pi pi-trash",
					command: async (e: any) => {
						await lastValueFrom(this.resourceService.deleteIncentiveRoleValueUsingDELETE(e.item.data.id));
						this.eventer.launchReloadContent("incentiveRoleValue");
					}
				}
			]
		}
	]
}
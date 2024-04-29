import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { DialogService } from 'primeng/dynamicdialog';

import { StalEventerService, StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';


import { MbsIncentiveRoleAssignationResourceService } from '@mbs-main';
import { EnzoIncentiveRoleAssignationDialogComponent } from '../incentive-role-assignation-dialog/incentive-role-assignation-dialog.component';

@Component({
	templateUrl  : './incentive-role-assignation-list-page.component.html',
	styleUrls: ['./incentive-role-assignation-list-page.component.scss']
})
export class EnzoIncentiveRoleAssignationListPageComponent {
	constructor(
		private router: Router,
		//public tabManagerService: TabManagerService,
		private resourceService: MbsIncentiveRoleAssignationResourceService,
		private dialogService: DialogService,
		public eventer: StalEventerService,

	) { }

	createNewIncentiveRoleAssignation() {
		this.dialogService.open(EnzoIncentiveRoleAssignationDialogComponent, {
			header: 'Create incentiveRoleAssignation',
			width: '70%'
		});
	}

	incentiveRoleAssignationListPaginator: StalPaginator = {
		page: 0,
		size: 30
	};
	incentiveRoleAssignationCount: number;

	incentiveRoleAssignationListDc = ['_ck', 'id'];
	paginatorEvent(paginator: any) {
		let incentiveRoleAssignationListPaginator = { ...paginator }
		this.incentiveRoleAssignationListPaginator = incentiveRoleAssignationListPaginator;
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
						const ref = this.dialogService.open(EnzoIncentiveRoleAssignationDialogComponent, {
							data: { incentiveRoleAssignation: { ...e.item.data } },
							header: 'Update incentiveRoleAssignation',
							width: '70%'
						});
					}
				},
				{
					label: "Delete",
					icon: "pi pi-trash",
					command: async (e: any) => {
						await lastValueFrom(this.resourceService.deleteIncentiveRoleAssignationUsingDELETE(e.item.data.id));
						this.eventer.launchReloadContent("incentiveRoleAssignation");
					}
				}
			]
		}
	]
}
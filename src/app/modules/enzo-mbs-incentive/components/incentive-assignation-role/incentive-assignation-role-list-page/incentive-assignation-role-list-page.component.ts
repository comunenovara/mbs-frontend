import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { DialogService } from 'primeng/dynamicdialog';

import { StalEventerService, StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { MbsIncentiveAssignationRoleResourceService } from '@mbs-incentive';
import { EnzoIncentiveAssignationRoleDialogComponent } from '../incentive-assignation-role-dialog/incentive-assignation-role-dialog.component';

@Component({
	templateUrl  : './incentive-assignation-role-list-page.component.html',
	styleUrls: ['./incentive-assignation-role-list-page.component.scss']
})
export class EnzoIncentiveAssignationRoleListPageComponent {
	constructor(
		private router: Router,
		//public tabManagerService: TabManagerService,
		private resourceService: MbsIncentiveAssignationRoleResourceService,
		private dialogService: DialogService,
		public eventer: StalEventerService,

	) { }

	createNewIncentiveAssignationRole() {
		this.dialogService.open(EnzoIncentiveAssignationRoleDialogComponent, {
			header: 'Create incentiveAssignationRole',
			width: '70%'
		});
	}

	incentiveAssignationRoleListPaginator: StalPaginator = {
		page: 0,
		size: 30
	};
	incentiveAssignationRoleCount: number;

	incentiveAssignationRoleListDc = ['_ck', 'id'];
	paginatorEvent(paginator: any) {
		let incentiveAssignationRoleListPaginator = { ...paginator }
		this.incentiveAssignationRoleListPaginator = incentiveAssignationRoleListPaginator;
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
						const ref = this.dialogService.open(EnzoIncentiveAssignationRoleDialogComponent, {
							data: { incentiveAssignationRole: { ...e.item.data } },
							header: 'Update incentiveAssignationRole',
							width: '70%'
						});
					}
				},
				{
					label: "Delete",
					icon: "pi pi-trash",
					command: async (e: any) => {
						await lastValueFrom(this.resourceService.deleteIncentiveAssignationRoleUsingDELETE(e.item.data.id));
						this.eventer.launchReloadContent("incentiveAssignationRole");
					}
				}
			]
		}
	]
}
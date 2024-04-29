import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { DialogService } from 'primeng/dynamicdialog';

import { StalEventerService, StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';


import { MbsIncentiveAssignationResourceService } from '@mbs-main';
import { EnzoIncentiveAssignationDialogComponent } from '../incentive-assignation-dialog/incentive-assignation-dialog.component';

@Component({
	templateUrl  : './incentive-assignation-list-page.component.html',
	styleUrls: ['./incentive-assignation-list-page.component.scss']
})
export class EnzoIncentiveAssignationListPageComponent {
	constructor(
		private router: Router,
		//public tabManagerService: TabManagerService,
		private resourceService: MbsIncentiveAssignationResourceService,
		private dialogService: DialogService,
		public eventer: StalEventerService,

	) { }

	createNewIncentiveAssignation() {
		this.dialogService.open(EnzoIncentiveAssignationDialogComponent, {
			header: 'Create incentiveAssignation',
			width: '70%'
		});
	}

	incentiveAssignationListPaginator: StalPaginator = {
		page: 0,
		size: 30
	};
	incentiveAssignationCount: number;

	incentiveAssignationListDc = ['_ck', 'id'];
	paginatorEvent(paginator: any) {
		let incentiveAssignationListPaginator = { ...paginator }
		this.incentiveAssignationListPaginator = incentiveAssignationListPaginator;
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
						const ref = this.dialogService.open(EnzoIncentiveAssignationDialogComponent, {
							data: { incentiveAssignation: { ...e.item.data } },
							header: 'Update incentiveAssignation',
							width: '70%'
						});
					}
				},
				{
					label: "Delete",
					icon: "pi pi-trash",
					command: async (e: any) => {
						await lastValueFrom(this.resourceService.deleteIncentiveAssignationUsingDELETE(e.item.data.id));
						this.eventer.launchReloadContent("incentiveAssignation");
					}
				}
			]
		}
	]
}
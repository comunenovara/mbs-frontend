import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { DialogService } from 'primeng/dynamicdialog';

import { StalEventerService, StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';


import { MbsIncentiveWithheldResourceService } from '@mbs-main';
import { EnzoIncentiveWithheldDialogComponent } from '../incentive-withheld-dialog/incentive-withheld-dialog.component';

@Component({
	templateUrl  : './incentive-withheld-list-page.component.html',
	styleUrls: ['./incentive-withheld-list-page.component.scss']
})
export class EnzoIncentiveWithheldListPageComponent {
	constructor(
		private router: Router,
		//public tabManagerService: TabManagerService,
		private resourceService: MbsIncentiveWithheldResourceService,
		private dialogService: DialogService,
		public eventer: StalEventerService,

	) { }

	createNewIncentiveWithheld() {
		this.dialogService.open(EnzoIncentiveWithheldDialogComponent, {
			header: 'Create incentiveWithheld',
			width: '70%'
		});
	}

	incentiveWithheldListPaginator: StalPaginator = {
		page: 0,
		size: 30
	};
	incentiveWithheldCount: number;

	incentiveWithheldListDc = ['_ck', 'id'];
	paginatorEvent(paginator: any) {
		let incentiveWithheldListPaginator = { ...paginator }
		this.incentiveWithheldListPaginator = incentiveWithheldListPaginator;
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
						const ref = this.dialogService.open(EnzoIncentiveWithheldDialogComponent, {
							data: { incentiveWithheld: { ...e.item.data } },
							header: 'Update incentiveWithheld',
							width: '70%'
						});
					}
				},
				{
					label: "Delete",
					icon: "pi pi-trash",
					command: async (e: any) => {
						await lastValueFrom(this.resourceService.deleteIncentiveWithheldUsingDELETE(e.item.data.id));
						this.eventer.launchReloadContent("incentiveWithheld");
					}
				}
			]
		}
	]
}
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { DialogService } from 'primeng/dynamicdialog';

import { StalEventerService, StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { MbsIncentiveCalculationResourceService } from '@mbs-main';
import { EnzoIncentiveCalculationDialogComponent } from '../incentive-calculation-dialog/incentive-calculation-dialog.component';

@Component({
	templateUrl  : './incentive-calculation-list-page.component.html',
	styleUrls: ['./incentive-calculation-list-page.component.scss']
})
export class EnzoIncentiveCalculationListPageComponent {
	constructor(
		private router: Router,
		//public tabManagerService: TabManagerService,
		private resourceService: MbsIncentiveCalculationResourceService,
		private dialogService: DialogService,
		public eventer: StalEventerService,

	) { }

	createNewIncentiveCalculation() {
		this.dialogService.open(EnzoIncentiveCalculationDialogComponent, {
			header: 'Create incentiveCalculation',
			width: '70%'
		});
	}

	incentiveCalculationListPaginator: StalPaginator = {
		page: 0,
		size: 30
	};
	incentiveCalculationCount: number;

	incentiveCalculationListDc = ['_ck', 'id'];
	paginatorEvent(paginator: any) {
		let incentiveCalculationListPaginator = { ...paginator }
		this.incentiveCalculationListPaginator = incentiveCalculationListPaginator;
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
						const ref = this.dialogService.open(EnzoIncentiveCalculationDialogComponent, {
							data: { incentiveCalculation: { ...e.item.data } },
							header: 'Update incentiveCalculation',
							width: '70%'
						});
					}
				},
				{
					label: "Delete",
					icon: "pi pi-trash",
					command: async (e: any) => {
						await lastValueFrom(this.resourceService.deleteIncentiveCalculationUsingDELETE(e.item.data.id));
						this.eventer.launchReloadContent("incentiveCalculation");
					}
				}
			]
		}
	]
}
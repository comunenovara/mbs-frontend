import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { DialogService } from 'primeng/dynamicdialog';

import { StalEventerService, StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { MbsIncentiveCalculationMethodResourceService } from '@mbs-main';
import { EnzoIncentiveCalculationMethodDialogComponent } from '../incentive-calculation-method-dialog/incentive-calculation-method-dialog.component';

@Component({
	templateUrl  : './incentive-calculation-method-list-page.component.html',
	styleUrls: ['./incentive-calculation-method-list-page.component.scss']
})
export class EnzoIncentiveCalculationMethodListPageComponent {
	constructor(
		private router: Router,
		//public tabManagerService: TabManagerService,
		private resourceService: MbsIncentiveCalculationMethodResourceService,
		private dialogService: DialogService,
		public eventer: StalEventerService,

	) { }

	createNewIncentiveCalculationMethod() {
		this.dialogService.open(EnzoIncentiveCalculationMethodDialogComponent, {
			header: 'Create incentiveCalculationMethod',
			width: '70%'
		});
	}

	incentiveCalculationMethodListPaginator: StalPaginator = {
		page: 0,
		size: 30
	};
	incentiveCalculationMethodCount: number;

	incentiveCalculationMethodListDc = ['_ck', 'id'];
	paginatorEvent(paginator: any) {
		let incentiveCalculationMethodListPaginator = { ...paginator }
		this.incentiveCalculationMethodListPaginator = incentiveCalculationMethodListPaginator;
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
						const ref = this.dialogService.open(EnzoIncentiveCalculationMethodDialogComponent, {
							data: { incentiveCalculationMethod: { ...e.item.data } },
							header: 'Update incentiveCalculationMethod',
							width: '70%'
						});
					}
				},
				{
					label: "Delete",
					icon: "pi pi-trash",
					command: async (e: any) => {
						await lastValueFrom(this.resourceService.deleteIncentiveCalculationMethodUsingDELETE(e.item.data.id));
						this.eventer.launchReloadContent("incentiveCalculationMethod");
					}
				}
			]
		}
	]
}
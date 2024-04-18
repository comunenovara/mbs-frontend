import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { DialogService } from 'primeng/dynamicdialog';

import { StalEventerService, StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { MbsIncentiveCalculationFactorResourceService } from '@mbs-main';
import { EnzoIncentiveCalculationFactorDialogComponent } from '../incentive-calculation-factor-dialog/incentive-calculation-factor-dialog.component';

@Component({
	templateUrl  : './incentive-calculation-factor-list-page.component.html',
	styleUrls: ['./incentive-calculation-factor-list-page.component.scss']
})
export class EnzoIncentiveCalculationFactorListPageComponent {
	constructor(
		private router: Router,
		//public tabManagerService: TabManagerService,
		private resourceService: MbsIncentiveCalculationFactorResourceService,
		private dialogService: DialogService,
		public eventer: StalEventerService,

	) { }

	createNewIncentiveCalculationFactor() {
		this.dialogService.open(EnzoIncentiveCalculationFactorDialogComponent, {
			header: 'Create incentiveCalculationFactor',
			width: '70%'
		});
	}

	incentiveCalculationFactorListPaginator: StalPaginator = {
		page: 0,
		size: 30
	};
	incentiveCalculationFactorCount: number;

	incentiveCalculationFactorListDc = ['_ck', 'id'];
	paginatorEvent(paginator: any) {
		let incentiveCalculationFactorListPaginator = { ...paginator }
		this.incentiveCalculationFactorListPaginator = incentiveCalculationFactorListPaginator;
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
						const ref = this.dialogService.open(EnzoIncentiveCalculationFactorDialogComponent, {
							data: { incentiveCalculationFactor: { ...e.item.data } },
							header: 'Update incentiveCalculationFactor',
							width: '70%'
						});
					}
				},
				{
					label: "Delete",
					icon: "pi pi-trash",
					command: async (e: any) => {
						await lastValueFrom(this.resourceService.deleteIncentiveCalculationFactorUsingDELETE(e.item.data.id));
						this.eventer.launchReloadContent("incentiveCalculationFactor");
					}
				}
			]
		}
	]
}
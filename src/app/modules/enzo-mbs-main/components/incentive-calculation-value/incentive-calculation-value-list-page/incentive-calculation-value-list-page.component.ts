import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { DialogService } from 'primeng/dynamicdialog';

import { StalEventerService, StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { MbsIncentiveCalculationValueResourceService } from '@mbs-main';
import { EnzoIncentiveCalculationValueDialogComponent } from '../incentive-calculation-value-dialog/incentive-calculation-value-dialog.component';

@Component({
	templateUrl  : './incentive-calculation-value-list-page.component.html',
	styleUrls: ['./incentive-calculation-value-list-page.component.scss']
})
export class EnzoIncentiveCalculationValueListPageComponent {
	constructor(
		private router: Router,
		//public tabManagerService: TabManagerService,
		private resourceService: MbsIncentiveCalculationValueResourceService,
		private dialogService: DialogService,
		public eventer: StalEventerService,

	) { }

	createNewIncentiveCalculationValue() {
		this.dialogService.open(EnzoIncentiveCalculationValueDialogComponent, {
			header: 'Create incentiveCalculationValue',
			width: '70%'
		});
	}

	incentiveCalculationValueListPaginator: StalPaginator = {
		page: 0,
		size: 30
	};
	incentiveCalculationValueCount: number;

	incentiveCalculationValueListDc = ['_ck', 'id'];
	paginatorEvent(paginator: any) {
		let incentiveCalculationValueListPaginator = { ...paginator }
		this.incentiveCalculationValueListPaginator = incentiveCalculationValueListPaginator;
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
						const ref = this.dialogService.open(EnzoIncentiveCalculationValueDialogComponent, {
							data: { incentiveCalculationValue: { ...e.item.data } },
							header: 'Update incentiveCalculationValue',
							width: '70%'
						});
					}
				},
				{
					label: "Delete",
					icon: "pi pi-trash",
					command: async (e: any) => {
						await lastValueFrom(this.resourceService.deleteIncentiveCalculationValueUsingDELETE(e.item.data.id));
						this.eventer.launchReloadContent("incentiveCalculationValue");
					}
				}
			]
		}
	]
}
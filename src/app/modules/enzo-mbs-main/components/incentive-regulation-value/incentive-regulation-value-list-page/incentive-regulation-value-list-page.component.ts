import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { DialogService } from 'primeng/dynamicdialog';

import { StalEventerService, StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { MbsIncentiveRegulationValueResourceService } from '@mbs-main';
import { EnzoIncentiveRegulationValueDialogComponent } from '../incentive-regulation-value-dialog/incentive-regulation-value-dialog.component';

@Component({
	templateUrl  : './incentive-regulation-value-list-page.component.html',
	styleUrls: ['./incentive-regulation-value-list-page.component.scss']
})
export class EnzoIncentiveRegulationValueListPageComponent {
	constructor(
		private router: Router,
		//public tabManagerService: TabManagerService,
		private resourceService: MbsIncentiveRegulationValueResourceService,
		private dialogService: DialogService,
		public eventer: StalEventerService,

	) { }

	createNewIncentiveRegulationValue() {
		this.dialogService.open(EnzoIncentiveRegulationValueDialogComponent, {
			header: 'Create incentiveRegulationValue',
			width: '70%'
		});
	}

	incentiveRegulationValueListPaginator: StalPaginator = {
		page: 0,
		size: 30
	};
	incentiveRegulationValueCount: number;

	incentiveRegulationValueListDc = ['_ck', 'id'];
	paginatorEvent(paginator: any) {
		let incentiveRegulationValueListPaginator = { ...paginator }
		this.incentiveRegulationValueListPaginator = incentiveRegulationValueListPaginator;
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
						const ref = this.dialogService.open(EnzoIncentiveRegulationValueDialogComponent, {
							data: { incentiveRegulationValue: { ...e.item.data } },
							header: 'Update incentiveRegulationValue',
							width: '70%'
						});
					}
				},
				{
					label: "Delete",
					icon: "pi pi-trash",
					command: async (e: any) => {
						await lastValueFrom(this.resourceService.deleteIncentiveRegulationValueUsingDELETE(e.item.data.id));
						this.eventer.launchReloadContent("incentiveRegulationValue");
					}
				}
			]
		}
	]
}
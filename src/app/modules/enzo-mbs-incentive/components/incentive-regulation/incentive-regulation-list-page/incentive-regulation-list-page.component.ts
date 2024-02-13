import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { DialogService } from 'primeng/dynamicdialog';

import { StalEventerService, StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { MbsIncentiveRegulationResourceService } from '@mbs-incentive';
import { EnzoIncentiveRegulationDialogComponent } from '../incentive-regulation-dialog/incentive-regulation-dialog.component';

@Component({
	templateUrl  : './incentive-regulation-list-page.component.html',
	styleUrls: ['./incentive-regulation-list-page.component.scss']
})
export class EnzoIncentiveRegulationListPageComponent {
	constructor(
		private router: Router,
		//public tabManagerService: TabManagerService,
		private resourceService: MbsIncentiveRegulationResourceService,
		private dialogService: DialogService,
		public eventer: StalEventerService,

	) { }

	createNewIncentiveRegulation() {
		this.dialogService.open(EnzoIncentiveRegulationDialogComponent, {
			header: 'Create incentiveRegulation',
			width: '70%'
		});
	}

	incentiveRegulationListPaginator: StalPaginator = {
		page: 0,
		size: 30
	};
	incentiveRegulationCount: number;

	incentiveRegulationListDc = ['_ck', 'id'];
	paginatorEvent(paginator: any) {
		let incentiveRegulationListPaginator = { ...paginator }
		this.incentiveRegulationListPaginator = incentiveRegulationListPaginator;
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
						const ref = this.dialogService.open(EnzoIncentiveRegulationDialogComponent, {
							data: { incentiveRegulation: { ...e.item.data } },
							header: 'Update incentiveRegulation',
							width: '70%'
						});
					}
				},
				{
					label: "Delete",
					icon: "pi pi-trash",
					command: async (e: any) => {
						await lastValueFrom(this.resourceService.deleteIncentiveRegulationUsingDELETE(e.item.data.id));
						this.eventer.launchReloadContent("incentiveRegulation");
					}
				}
			]
		}
	]
}
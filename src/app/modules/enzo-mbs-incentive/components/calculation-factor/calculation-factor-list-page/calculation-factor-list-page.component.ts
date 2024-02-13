import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { DialogService } from 'primeng/dynamicdialog';

import { StalEventerService, StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { MbsCalculationFactorResourceService } from '@mbs-incentive';
import { EnzoCalculationFactorDialogComponent } from '../calculation-factor-dialog/calculation-factor-dialog.component';

@Component({
	templateUrl  : './calculation-factor-list-page.component.html',
	styleUrls: ['./calculation-factor-list-page.component.scss']
})
export class EnzoCalculationFactorListPageComponent {
	constructor(
		private router: Router,
		//public tabManagerService: TabManagerService,
		private resourceService: MbsCalculationFactorResourceService,
		private dialogService: DialogService,
		public eventer: StalEventerService,

	) { }

	createNewCalculationFactor() {
		this.dialogService.open(EnzoCalculationFactorDialogComponent, {
			header: 'Create calculationFactor',
			width: '70%'
		});
	}

	calculationFactorListPaginator: StalPaginator = {
		page: 0,
		size: 30
	};
	calculationFactorCount: number;

	calculationFactorListDc = ['_ck', 'id'];
	paginatorEvent(paginator: any) {
		let calculationFactorListPaginator = { ...paginator }
		this.calculationFactorListPaginator = calculationFactorListPaginator;
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
						const ref = this.dialogService.open(EnzoCalculationFactorDialogComponent, {
							data: { calculationFactor: { ...e.item.data } },
							header: 'Update calculationFactor',
							width: '70%'
						});
					}
				},
				{
					label: "Delete",
					icon: "pi pi-trash",
					command: async (e: any) => {
						await lastValueFrom(this.resourceService.deleteCalculationFactorUsingDELETE(e.item.data.id));
						this.eventer.launchReloadContent("calculationFactor");
					}
				}
			]
		}
	]
}
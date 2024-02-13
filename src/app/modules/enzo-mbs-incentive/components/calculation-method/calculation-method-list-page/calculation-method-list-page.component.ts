import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { DialogService } from 'primeng/dynamicdialog';

import { StalEventerService, StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { MbsCalculationMethodResourceService } from '@mbs-incentive';
import { EnzoCalculationMethodDialogComponent } from '../calculation-method-dialog/calculation-method-dialog.component';

@Component({
	templateUrl  : './calculation-method-list-page.component.html',
	styleUrls: ['./calculation-method-list-page.component.scss']
})
export class EnzoCalculationMethodListPageComponent {
	constructor(
		private router: Router,
		//public tabManagerService: TabManagerService,
		private resourceService: MbsCalculationMethodResourceService,
		private dialogService: DialogService,
		public eventer: StalEventerService,

	) { }

	createNewCalculationMethod() {
		this.dialogService.open(EnzoCalculationMethodDialogComponent, {
			header: 'Create calculationMethod',
			width: '70%'
		});
	}

	calculationMethodListPaginator: StalPaginator = {
		page: 0,
		size: 30
	};
	calculationMethodCount: number;

	calculationMethodListDc = ['_ck', 'id'];
	paginatorEvent(paginator: any) {
		let calculationMethodListPaginator = { ...paginator }
		this.calculationMethodListPaginator = calculationMethodListPaginator;
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
						const ref = this.dialogService.open(EnzoCalculationMethodDialogComponent, {
							data: { calculationMethod: { ...e.item.data } },
							header: 'Update calculationMethod',
							width: '70%'
						});
					}
				},
				{
					label: "Delete",
					icon: "pi pi-trash",
					command: async (e: any) => {
						await lastValueFrom(this.resourceService.deleteCalculationMethodUsingDELETE(e.item.data.id));
						this.eventer.launchReloadContent("calculationMethod");
					}
				}
			]
		}
	]
}
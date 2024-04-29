import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { DialogService } from 'primeng/dynamicdialog';

import { StalEventerService, StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';


import { MbsGovernativeProjectAndProcurementLotResourceService } from '@mbs-incentive';
import { EnzoGovernativeProjectAndProcurementLotDialogComponent } from '../governative-project-and-procurement-lot-dialog/governative-project-and-procurement-lot-dialog.component';

@Component({
	templateUrl  : './governative-project-and-procurement-lot-list-page.component.html',
	styleUrls: ['./governative-project-and-procurement-lot-list-page.component.scss']
})
export class EnzoGovernativeProjectAndProcurementLotListPageComponent {
	constructor(
		private router: Router,
		//public tabManagerService: TabManagerService,
		private resourceService: MbsGovernativeProjectAndProcurementLotResourceService,
		private dialogService: DialogService,
		public eventer: StalEventerService,

	) { }

	createNewGovernativeProjectAndProcurementLot() {
		this.dialogService.open(EnzoGovernativeProjectAndProcurementLotDialogComponent, {
			header: 'Create governativeProjectAndProcurementLot',
			width: '70%'
		});
	}

	governativeProjectAndProcurementLotListPaginator: StalPaginator = {
		page: 0,
		size: 30
	};
	governativeProjectAndProcurementLotCount: number;

	governativeProjectAndProcurementLotListDc = ['_ck', 'id'];
	paginatorEvent(paginator: any) {
		let governativeProjectAndProcurementLotListPaginator = { ...paginator }
		this.governativeProjectAndProcurementLotListPaginator = governativeProjectAndProcurementLotListPaginator;
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
						const ref = this.dialogService.open(EnzoGovernativeProjectAndProcurementLotDialogComponent, {
							data: { governativeProjectAndProcurementLot: { ...e.item.data } },
							header: 'Update governativeProjectAndProcurementLot',
							width: '70%'
						});
					}
				},
				{
					label: "Delete",
					icon: "pi pi-trash",
					command: async (e: any) => {
						await lastValueFrom(this.resourceService.deleteGovernativeProjectAndProcurementLotUsingDELETE(e.item.data.id));
						this.eventer.launchReloadContent("governativeProjectAndProcurementLot");
					}
				}
			]
		}
	]
}
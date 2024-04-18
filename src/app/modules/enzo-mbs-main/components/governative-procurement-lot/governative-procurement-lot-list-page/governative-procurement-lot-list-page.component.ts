import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { DialogService } from 'primeng/dynamicdialog';

import { StalEventerService, StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { MbsGovernativeProcurementLotResourceService } from '@mbs-main';
import { EnzoGovernativeProcurementLotDialogComponent } from '../governative-procurement-lot-dialog/governative-procurement-lot-dialog.component';

@Component({
	templateUrl  : './governative-procurement-lot-list-page.component.html',
	styleUrls: ['./governative-procurement-lot-list-page.component.scss']
})
export class EnzoGovernativeProcurementLotListPageComponent {
	constructor(
		private router: Router,
		//public tabManagerService: TabManagerService,
		private resourceService: MbsGovernativeProcurementLotResourceService,
		private dialogService: DialogService,
		public eventer: StalEventerService,

	) { }

	createNewGovernativeProcurementLot() {
		this.dialogService.open(EnzoGovernativeProcurementLotDialogComponent, {
			header: 'Create governativeProcurementLot',
			width: '70%'
		});
	}

	governativeProcurementLotListPaginator: StalPaginator = {
		page: 0,
		size: 30
	};
	governativeProcurementLotCount: number;

	governativeProcurementLotListDc = ['_ck', 'id'];
	paginatorEvent(paginator: any) {
		let governativeProcurementLotListPaginator = { ...paginator }
		this.governativeProcurementLotListPaginator = governativeProcurementLotListPaginator;
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
						const ref = this.dialogService.open(EnzoGovernativeProcurementLotDialogComponent, {
							data: { governativeProcurementLot: { ...e.item.data } },
							header: 'Update governativeProcurementLot',
							width: '70%'
						});
					}
				},
				{
					label: "Delete",
					icon: "pi pi-trash",
					command: async (e: any) => {
						await lastValueFrom(this.resourceService.deleteGovernativeProcurementLotUsingDELETE(e.item.data.id));
						this.eventer.launchReloadContent("governativeProcurementLot");
					}
				}
			]
		}
	]
}
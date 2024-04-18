import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { DialogService } from 'primeng/dynamicdialog';

import { StalEventerService, StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { MbsGovernativeProjectProcurementLotResourceService } from '@mbs-main';
import { EnzoGovernativeProjectProcurementLotDialogComponent } from '../governative-project-procurement-lot-dialog/governative-project-procurement-lot-dialog.component';

@Component({
	templateUrl  : './governative-project-procurement-lot-list-page.component.html',
	styleUrls: ['./governative-project-procurement-lot-list-page.component.scss']
})
export class EnzoGovernativeProjectProcurementLotListPageComponent {
	constructor(
		private router: Router,
		//public tabManagerService: TabManagerService,
		private resourceService: MbsGovernativeProjectProcurementLotResourceService,
		private dialogService: DialogService,
		public eventer: StalEventerService,

	) { }

	createNewGovernativeProjectProcurementLot() {
		this.dialogService.open(EnzoGovernativeProjectProcurementLotDialogComponent, {
			header: 'Create governativeProjectProcurementLot',
			width: '70%'
		});
	}

	governativeProjectProcurementLotListPaginator: StalPaginator = {
		page: 0,
		size: 30
	};
	governativeProjectProcurementLotCount: number;

	governativeProjectProcurementLotListDc = ['_ck', 'id'];
	paginatorEvent(paginator: any) {
		let governativeProjectProcurementLotListPaginator = { ...paginator }
		this.governativeProjectProcurementLotListPaginator = governativeProjectProcurementLotListPaginator;
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
						const ref = this.dialogService.open(EnzoGovernativeProjectProcurementLotDialogComponent, {
							data: { governativeProjectProcurementLot: { ...e.item.data } },
							header: 'Update governativeProjectProcurementLot',
							width: '70%'
						});
					}
				},
				{
					label: "Delete",
					icon: "pi pi-trash",
					command: async (e: any) => {
						await lastValueFrom(this.resourceService.deleteGovernativeProjectProcurementLotUsingDELETE(e.item.data.id));
						this.eventer.launchReloadContent("governativeProjectProcurementLot");
					}
				}
			]
		}
	]
}
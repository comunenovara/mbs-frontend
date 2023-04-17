import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { DialogService } from 'primeng/dynamicdialog';

import { StalEventerService, StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { MbsNominaResourceService } from '@mbs-work';
import { EnzoNominaDialogComponent } from '../nomina-dialog/nomina-dialog.component';

@Component({
	templateUrl  : './nomina-list-page.component.html',
	styleUrls: ['./nomina-list-page.component.scss']
})
export class EnzoNominaListPageComponent {
	constructor(
		private router: Router,
		//public tabManagerService: TabManagerService,
		private resourceService: MbsNominaResourceService,
		private dialogService: DialogService,
		public eventer: StalEventerService,

	) { }

	createNewNomina() {
		this.dialogService.open(EnzoNominaDialogComponent, {
			header: 'Create nomina',
			width: '70%'
		});
	}

	nominaListPaginator: StalPaginator = {
		page: 0,
		size: 30
	};
	nominaCount: number;

	nominaListDc = ['_ck', 'id'];
	paginatorEvent(paginator: any) {
		let nominaListPaginator = { ...paginator }
		this.nominaListPaginator = nominaListPaginator;
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
						const ref = this.dialogService.open(EnzoNominaDialogComponent, {
							data: { nomina: { ...e.item.data } },
							header: 'Update nomina',
							width: '70%'
						});
					}
				},
				{
					label: "Delete",
					icon: "pi pi-trash",
					command: async (e: any) => {
						await lastValueFrom(this.resourceService.deleteNominaUsingDELETE(e.item.data.id));
						this.eventer.launchReloadContent("nomina");
					}
				}
			]
		}
	]
}
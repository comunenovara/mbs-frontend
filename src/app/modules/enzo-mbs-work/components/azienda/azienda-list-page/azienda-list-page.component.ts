import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { DialogService } from 'primeng/dynamicdialog';

import { StalEventerService, StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { MbsAziendaResourceService } from '@mbs-work';
import { EnzoAziendaDialogComponent } from '../azienda-dialog/azienda-dialog.component';

@Component({
	templateUrl  : './azienda-list-page.component.html',
	styleUrls: ['./azienda-list-page.component.scss']
})
export class EnzoAziendaListPageComponent {
	constructor(
		private router: Router,
		//public tabManagerService: TabManagerService,
		private resourceService: MbsAziendaResourceService,
		private dialogService: DialogService,
		public eventer: StalEventerService,

	) { }

	createNewAzienda() {
		this.dialogService.open(EnzoAziendaDialogComponent, {
			header: 'Create azienda',
			width: '70%'
		});
	}

	aziendaListPaginator: StalPaginator = {
		page: 0,
		size: 30
	};
	aziendaCount: number;

	aziendaListDc = ['_ck', 'id', 'name'];
	paginatorEvent(paginator: any) {
		let aziendaListPaginator = { ...paginator }
		this.aziendaListPaginator = aziendaListPaginator;
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
						const ref = this.dialogService.open(EnzoAziendaDialogComponent, {
							data: { azienda: { ...e.item.data } },
							header: 'Update azienda',
							width: '70%'
						});
					}
				},
				{
					label: "Delete",
					icon: "pi pi-trash",
					command: async (e: any) => {
						await lastValueFrom(this.resourceService.deleteAziendaUsingDELETE(e.item.data.id));
						this.eventer.launchReloadContent("azienda");
					}
				}
			]
		}
	]
}
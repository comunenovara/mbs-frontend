import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { DialogService } from 'primeng/dynamicdialog';

import { StalEventerService, StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { MbsProgettoResourceService } from '@mbs-work';
import { EnzoProgettoDialogComponent } from '../progetto-dialog/progetto-dialog.component';

@Component({
	templateUrl  : './progetto-list-page.component.html',
	styleUrls: ['./progetto-list-page.component.scss']
})
export class EnzoProgettoListPageComponent {
	constructor(
		private router: Router,
		//public tabManagerService: TabManagerService,
		private resourceService: MbsProgettoResourceService,
		private dialogService: DialogService,
		public eventer: StalEventerService,

	) { }

	createNewProgetto() {
		this.dialogService.open(EnzoProgettoDialogComponent, {
			header: 'Create progetto',
			width: '70%'
		});
	}

	progettoListPaginator: StalPaginator = {
		page: 0,
		size: 30
	};
	progettoCount: number;

	progettoListDc = ['_ck', 'id'];
	paginatorEvent(paginator: any) {
		let progettoListPaginator = { ...paginator }
		this.progettoListPaginator = progettoListPaginator;
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
						const ref = this.dialogService.open(EnzoProgettoDialogComponent, {
							data: { progetto: { ...e.item.data } },
							header: 'Update progetto',
							width: '70%'
						});
					}
				},
				{
					label: "Delete",
					icon: "pi pi-trash",
					command: async (e: any) => {
						await lastValueFrom(this.resourceService.deleteProgettoUsingDELETE(e.item.data.id));
						this.eventer.launchReloadContent("progetto");
					}
				}
			]
		}
	]
}
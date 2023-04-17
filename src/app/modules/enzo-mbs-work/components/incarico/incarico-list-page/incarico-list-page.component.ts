import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { DialogService } from 'primeng/dynamicdialog';

import { StalEventerService, StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { MbsIncaricoResourceService } from '@mbs-work';
import { EnzoIncaricoDialogComponent } from '../incarico-dialog/incarico-dialog.component';

@Component({
	templateUrl  : './incarico-list-page.component.html',
	styleUrls: ['./incarico-list-page.component.scss']
})
export class EnzoIncaricoListPageComponent {
	constructor(
		private router: Router,
		//public tabManagerService: TabManagerService,
		private resourceService: MbsIncaricoResourceService,
		private dialogService: DialogService,
		public eventer: StalEventerService,

	) { }

	createNewIncarico() {
		this.dialogService.open(EnzoIncaricoDialogComponent, {
			header: 'Create incarico',
			width: '70%'
		});
	}

	incaricoListPaginator: StalPaginator = {
		page: 0,
		size: 30
	};
	incaricoCount: number;

	incaricoListDc = ['_ck', 'id', 'name'];
	paginatorEvent(paginator: any) {
		let incaricoListPaginator = { ...paginator }
		this.incaricoListPaginator = incaricoListPaginator;
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
						const ref = this.dialogService.open(EnzoIncaricoDialogComponent, {
							data: { incarico: { ...e.item.data } },
							header: 'Update incarico',
							width: '70%'
						});
					}
				},
				{
					label: "Delete",
					icon: "pi pi-trash",
					command: async (e: any) => {
						await lastValueFrom(this.resourceService.deleteIncaricoUsingDELETE(e.item.data.id));
						this.eventer.launchReloadContent("incarico");
					}
				}
			]
		}
	]
}
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { DialogService } from 'primeng/dynamicdialog';

import { StalEventerService, StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { MbsFaseResourceService } from '@mbs-work';
import { EnzoFaseDialogComponent } from '../fase-dialog/fase-dialog.component';

@Component({
	templateUrl  : './fase-list-page.component.html',
	styleUrls: ['./fase-list-page.component.scss']
})
export class EnzoFaseListPageComponent {
	constructor(
		private router: Router,
		//public tabManagerService: TabManagerService,
		private resourceService: MbsFaseResourceService,
		private dialogService: DialogService,
		public eventer: StalEventerService,

	) { }

	createNewFase() {
		this.dialogService.open(EnzoFaseDialogComponent, {
			header: 'Create fase',
			width: '70%'
		});
	}

	faseListPaginator: StalPaginator = {
		page: 0,
		size: 30
	};
	faseCount: number;

	faseListDc = ['_ck', 'id', 'name'];
	paginatorEvent(paginator: any) {
		let faseListPaginator = { ...paginator }
		this.faseListPaginator = faseListPaginator;
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
						const ref = this.dialogService.open(EnzoFaseDialogComponent, {
							data: { fase: { ...e.item.data } },
							header: 'Update fase',
							width: '70%'
						});
					}
				},
				{
					label: "Delete",
					icon: "pi pi-trash",
					command: async (e: any) => {
						await lastValueFrom(this.resourceService.deleteFaseUsingDELETE(e.item.data.id));
						this.eventer.launchReloadContent("fase");
					}
				}
			]
		}
	]
}
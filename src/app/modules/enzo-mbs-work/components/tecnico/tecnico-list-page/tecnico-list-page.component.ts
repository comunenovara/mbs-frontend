import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { DialogService } from 'primeng/dynamicdialog';

import { StalEventerService, StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { MbsTecnicoResourceService } from '@mbs-work';
import { EnzoTecnicoDialogComponent } from '../tecnico-dialog/tecnico-dialog.component';

@Component({
	templateUrl  : './tecnico-list-page.component.html',
	styleUrls: ['./tecnico-list-page.component.scss']
})
export class EnzoTecnicoListPageComponent {
	constructor(
		private router: Router,
		//public tabManagerService: TabManagerService,
		private resourceService: MbsTecnicoResourceService,
		private dialogService: DialogService,
		public eventer: StalEventerService,

	) { }

	createNewTecnico() {
		this.dialogService.open(EnzoTecnicoDialogComponent, {
			header: 'Create tecnico',
			width: '70%'
		});
	}

	tecnicoListPaginator: StalPaginator = {
		page: 0,
		size: 30
	};
	tecnicoCount: number;

	tecnicoListDc = ['_ck', 'id', 'name'];
	paginatorEvent(paginator: any) {
		let tecnicoListPaginator = { ...paginator }
		this.tecnicoListPaginator = tecnicoListPaginator;
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
						const ref = this.dialogService.open(EnzoTecnicoDialogComponent, {
							data: { tecnico: { ...e.item.data } },
							header: 'Update tecnico',
							width: '70%'
						});
					}
				},
				{
					label: "Delete",
					icon: "pi pi-trash",
					command: async (e: any) => {
						await lastValueFrom(this.resourceService.deleteTecnicoUsingDELETE(e.item.data.id));
						this.eventer.launchReloadContent("tecnico");
					}
				}
			]
		}
	]
}
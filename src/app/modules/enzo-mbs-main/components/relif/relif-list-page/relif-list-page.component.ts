import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { DialogService } from 'primeng/dynamicdialog';

import { StalEventerService, StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { MbsRelifResourceService } from '@mbs-main';
import { EnzoRelifDialogComponent } from '../relif-dialog/relif-dialog.component';

@Component({
	templateUrl  : './relif-list-page.component.html',
	styleUrls: ['./relif-list-page.component.scss']
})
export class EnzoRelifListPageComponent {
	constructor(
		private router: Router,
		//public tabManagerService: TabManagerService,
		private resourceService: MbsRelifResourceService,
		private dialogService: DialogService,
		public eventer: StalEventerService,

	) { }

	createNewRelif() {
		this.dialogService.open(EnzoRelifDialogComponent, {
			header: 'Create relif',
			width: '70%'
		});
	}

	relifListPaginator: StalPaginator = {
		page: 0,
		size: 30
	};
	relifCount: number;

	relifListDc = ['_ck', 'id'];
	paginatorEvent(paginator: any) {
		let relifListPaginator = { ...paginator }
		this.relifListPaginator = relifListPaginator;
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
						const ref = this.dialogService.open(EnzoRelifDialogComponent, {
							data: { relif: { ...e.item.data } },
							header: 'Update relif',
							width: '70%'
						});
					}
				},
				{
					label: "Delete",
					icon: "pi pi-trash",
					command: async (e: any) => {
						await lastValueFrom(this.resourceService.deleteRelifUsingDELETE(e.item.data.id));
						this.eventer.launchReloadContent("relif");
					}
				}
			]
		}
	]
}
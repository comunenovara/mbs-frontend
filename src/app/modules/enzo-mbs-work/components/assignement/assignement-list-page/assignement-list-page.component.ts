import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { DialogService } from 'primeng/dynamicdialog';

import { StalEventerService, StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { MbsAssignementResourceService } from '@mbs-work';
import { EnzoAssignementDialogComponent } from '../assignement-dialog/assignement-dialog.component';

@Component({
	templateUrl  : './assignement-list-page.component.html',
	styleUrls: ['./assignement-list-page.component.scss']
})
export class EnzoAssignementListPageComponent {
	constructor(
		private router: Router,
		//public tabManagerService: TabManagerService,
		private resourceService: MbsAssignementResourceService,
		private dialogService: DialogService,
		public eventer: StalEventerService,

	) { }

	createNewAssignement() {
		this.dialogService.open(EnzoAssignementDialogComponent, {
			header: 'Create assignement',
			width: '70%'
		});
	}

	assignementListPaginator: StalPaginator = {
		page: 0,
		size: 30
	};
	assignementCount: number;

	assignementListDc = ['_ck', 'id'];
	paginatorEvent(paginator: any) {
		let assignementListPaginator = { ...paginator }
		this.assignementListPaginator = assignementListPaginator;
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
						const ref = this.dialogService.open(EnzoAssignementDialogComponent, {
							data: { assignement: { ...e.item.data } },
							header: 'Update assignement',
							width: '70%'
						});
					}
				},
				{
					label: "Delete",
					icon: "pi pi-trash",
					command: async (e: any) => {
						await lastValueFrom(this.resourceService.deleteAssignementUsingDELETE(e.item.data.id));
						this.eventer.launchReloadContent("assignement");
					}
				}
			]
		}
	]
}
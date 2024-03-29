import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { DialogService } from 'primeng/dynamicdialog';

import { StalEventerService, StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { MbsGovernativeProjectResourceService } from '@mbs-incentive';
import { EnzoGovernativeProjectDialogComponent } from '../governative-project-dialog/governative-project-dialog.component';

@Component({
	templateUrl  : './governative-project-list-page.component.html',
	styleUrls: ['./governative-project-list-page.component.scss']
})
export class EnzoGovernativeProjectListPageComponent {
	constructor(
		private router: Router,
		//public tabManagerService: TabManagerService,
		private resourceService: MbsGovernativeProjectResourceService,
		private dialogService: DialogService,
		public eventer: StalEventerService,

	) { }

	createNewGovernativeProject() {
		this.dialogService.open(EnzoGovernativeProjectDialogComponent, {
			header: 'Create governativeProject',
			width: '70%'
		});
	}

	governativeProjectListPaginator: StalPaginator = {
		page: 0,
		size: 30
	};
	governativeProjectCount: number;

	governativeProjectListDc = ['_ck', 'id'];
	paginatorEvent(paginator: any) {
		let governativeProjectListPaginator = { ...paginator }
		this.governativeProjectListPaginator = governativeProjectListPaginator;
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
						const ref = this.dialogService.open(EnzoGovernativeProjectDialogComponent, {
							data: { governativeProject: { ...e.item.data } },
							header: 'Update governativeProject',
							width: '70%'
						});
					}
				},
				{
					label: "Delete",
					icon: "pi pi-trash",
					command: async (e: any) => {
						await lastValueFrom(this.resourceService.deleteGovernativeProjectUsingDELETE(e.item.data.id));
						this.eventer.launchReloadContent("governativeProject");
					}
				}
			]
		}
	]
}
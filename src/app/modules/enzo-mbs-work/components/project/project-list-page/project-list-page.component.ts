import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { DialogService } from 'primeng/dynamicdialog';

import { StalEventerService, StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { MbsProjectResourceService } from '@mbs-work';
import { EnzoProjectDialogComponent } from '../project-dialog/project-dialog.component';

@Component({
	templateUrl  : './project-list-page.component.html',
	styleUrls: ['./project-list-page.component.scss']
})
export class EnzoProjectListPageComponent {
	constructor(
		private router: Router,
		//public tabManagerService: TabManagerService,
		private resourceService: MbsProjectResourceService,
		private dialogService: DialogService,
		public eventer: StalEventerService,

	) { }

	createNewProject() {
		this.dialogService.open(EnzoProjectDialogComponent, {
			header: 'Create project',
			width: '70%'
		});
	}

	projectListPaginator: StalPaginator = {
		page: 0,
		size: 30
	};
	projectCount: number;

	projectListDc = ['_ck', 'id', 'name'];
	paginatorEvent(paginator: any) {
		let projectListPaginator = { ...paginator }
		this.projectListPaginator = projectListPaginator;
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
						const ref = this.dialogService.open(EnzoProjectDialogComponent, {
							data: { project: { ...e.item.data } },
							header: 'Update project',
							width: '70%'
						});
					}
				},
				{
					label: "Delete",
					icon: "pi pi-trash",
					command: async (e: any) => {
						await lastValueFrom(this.resourceService.deleteProjectUsingDELETE(e.item.data.id));
						this.eventer.launchReloadContent("project");
					}
				}
			]
		}
	]
}
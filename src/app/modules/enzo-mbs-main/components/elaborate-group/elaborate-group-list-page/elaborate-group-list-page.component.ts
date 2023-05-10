import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { DialogService } from 'primeng/dynamicdialog';

import { StalEventerService, StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { MbsElaborateGroupResourceService } from '@mbs-main';
import { EnzoElaborateGroupDialogComponent } from '../elaborate-group-dialog/elaborate-group-dialog.component';

@Component({
	templateUrl  : './elaborate-group-list-page.component.html',
	styleUrls: ['./elaborate-group-list-page.component.scss']
})
export class EnzoElaborateGroupListPageComponent {
	constructor(
		private router: Router,
		//public tabManagerService: TabManagerService,
		private resourceService: MbsElaborateGroupResourceService,
		private dialogService: DialogService,
		public eventer: StalEventerService,

	) { }

	createNewElaborateGroup() {
		this.dialogService.open(EnzoElaborateGroupDialogComponent, {
			header: 'Create elaborateGroup',
			width: '70%'
		});
	}

	elaborateGroupListPaginator: StalPaginator = {
		page: 0,
		size: 30
	};
	elaborateGroupCount: number;

	elaborateGroupListDc = ['_ck', 'id'];
	paginatorEvent(paginator: any) {
		let elaborateGroupListPaginator = { ...paginator }
		this.elaborateGroupListPaginator = elaborateGroupListPaginator;
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
						const ref = this.dialogService.open(EnzoElaborateGroupDialogComponent, {
							data: { elaborateGroup: { ...e.item.data } },
							header: 'Update elaborateGroup',
							width: '70%'
						});
					}
				},
				{
					label: "Delete",
					icon: "pi pi-trash",
					command: async (e: any) => {
						await lastValueFrom(this.resourceService.deleteElaborateGroupUsingDELETE(e.item.data.id));
						this.eventer.launchReloadContent("elaborateGroup");
					}
				}
			]
		}
	]
}
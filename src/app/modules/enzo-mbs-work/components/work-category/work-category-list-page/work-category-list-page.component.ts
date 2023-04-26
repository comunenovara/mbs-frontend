import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { DialogService } from 'primeng/dynamicdialog';

import { StalEventerService, StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { MbsWorkCategoryResourceService } from '@mbs-work';
import { EnzoWorkCategoryDialogComponent } from '../work-category-dialog/work-category-dialog.component';

@Component({
	templateUrl  : './work-category-list-page.component.html',
	styleUrls: ['./work-category-list-page.component.scss']
})
export class EnzoWorkCategoryListPageComponent {
	constructor(
		private router: Router,
		//public tabManagerService: TabManagerService,
		private resourceService: MbsWorkCategoryResourceService,
		private dialogService: DialogService,
		public eventer: StalEventerService,

	) { }

	createNewWorkCategory() {
		this.dialogService.open(EnzoWorkCategoryDialogComponent, {
			header: 'Create workCategory',
			width: '70%'
		});
	}

	workCategoryListPaginator: StalPaginator = {
		page: 0,
		size: 30
	};
	workCategoryCount: number;

	workCategoryListDc = ['_ck', 'id'];
	paginatorEvent(paginator: any) {
		let workCategoryListPaginator = { ...paginator }
		this.workCategoryListPaginator = workCategoryListPaginator;
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
						const ref = this.dialogService.open(EnzoWorkCategoryDialogComponent, {
							data: { workCategory: { ...e.item.data } },
							header: 'Update workCategory',
							width: '70%'
						});
					}
				},
				{
					label: "Delete",
					icon: "pi pi-trash",
					command: async (e: any) => {
						await lastValueFrom(this.resourceService.deleteWorkCategoryUsingDELETE(e.item.data.id));
						this.eventer.launchReloadContent("workCategory");
					}
				}
			]
		}
	]
}
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { DialogService } from 'primeng/dynamicdialog';

import { StalEventerService, StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { MbsCompanyResourceService } from '@mbs-work';
import { EnzoCompanyDialogComponent } from '../company-dialog/company-dialog.component';

@Component({
	templateUrl  : './company-list-page.component.html',
	styleUrls: ['./company-list-page.component.scss']
})
export class EnzoCompanyListPageComponent {
	constructor(
		private router: Router,
		//public tabManagerService: TabManagerService,
		private resourceService: MbsCompanyResourceService,
		private dialogService: DialogService,
		public eventer: StalEventerService,

	) { }

	createNewCompany() {
		this.dialogService.open(EnzoCompanyDialogComponent, {
			header: 'Create company',
			width: '70%'
		});
	}

	companyListPaginator: StalPaginator = {
		page: 0,
		size: 30
	};
	companyCount: number;

	companyListDc = ['_ck', 'id'];
	paginatorEvent(paginator: any) {
		let companyListPaginator = { ...paginator }
		this.companyListPaginator = companyListPaginator;
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
						const ref = this.dialogService.open(EnzoCompanyDialogComponent, {
							data: { company: { ...e.item.data } },
							header: 'Update company',
							width: '70%'
						});
					}
				},
				{
					label: "Delete",
					icon: "pi pi-trash",
					command: async (e: any) => {
						await lastValueFrom(this.resourceService.deleteCompanyUsingDELETE(e.item.data.id));
						this.eventer.launchReloadContent("company");
					}
				}
			]
		}
	]
}
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { DialogService } from 'primeng/dynamicdialog';

import { StalEventerService, StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { MbsWithheldResourceService } from '@mbs-incentive';
import { EnzoWithheldDialogComponent } from '../withheld-dialog/withheld-dialog.component';

@Component({
	templateUrl  : './withheld-list-page.component.html',
	styleUrls: ['./withheld-list-page.component.scss']
})
export class EnzoWithheldListPageComponent {
	constructor(
		private router: Router,
		//public tabManagerService: TabManagerService,
		private resourceService: MbsWithheldResourceService,
		private dialogService: DialogService,
		public eventer: StalEventerService,

	) { }

	createNewWithheld() {
		this.dialogService.open(EnzoWithheldDialogComponent, {
			header: 'Create withheld',
			width: '70%'
		});
	}

	withheldListPaginator: StalPaginator = {
		page: 0,
		size: 30
	};
	withheldCount: number;

	withheldListDc = ['_ck', 'id'];
	paginatorEvent(paginator: any) {
		let withheldListPaginator = { ...paginator }
		this.withheldListPaginator = withheldListPaginator;
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
						const ref = this.dialogService.open(EnzoWithheldDialogComponent, {
							data: { withheld: { ...e.item.data } },
							header: 'Update withheld',
							width: '70%'
						});
					}
				},
				{
					label: "Delete",
					icon: "pi pi-trash",
					command: async (e: any) => {
						await lastValueFrom(this.resourceService.deleteWithheldUsingDELETE(e.item.data.id));
						this.eventer.launchReloadContent("withheld");
					}
				}
			]
		}
	]
}
import { AgalPaginator } from '@agal-core/components/paginator/paginator.component';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { TabManagerService } from '@tabler/services/tab-manager.service';
import { MbsAssetResourceService } from '@mbs-main';

@Component({
	templateUrl  : './asset-list-page.component.html',
})
export class EnzoAssetListPageComponent {
	constructor(
		private router: Router,
		public tabManagerService: TabManagerService,
		private resourceService: MbsAssetResourceService,
	) { }

	assetListPaginator: AgalPaginator = {
		page: 0,
		size: 30
	};
	assetCount: number;

	assetListDc = ['_ck' , 'id', 'description'];
	paginatorEvent(paginator: any) {
		let assetListPaginator = { ...paginator }
		this.assetListPaginator = assetListPaginator;
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
			command: (e: any) => this.tabManagerService.openInTab(),
			childs: [
				{
					label: "Edit",
					icon: "pi pi-pencil",
					command: (e: any) => {
						console.log("edit", e.item.data.id);
					}
				},
				{
					label: "Delete",
					icon: "pi pi-trash",
					command: async (e: any) => {
						await lastValueFrom(this.resourceService.deleteAssetUsingDELETE(e.item.data.id));
					}
				}
			]
		}
	]
}
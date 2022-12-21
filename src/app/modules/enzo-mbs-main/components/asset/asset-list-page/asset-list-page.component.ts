import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { DialogService } from 'primeng/dynamicdialog';

import { AgalEventerService } from '@agal-core/modules/eventer/services/eventer.service';
import { AgalPaginator } from '@agal-core/modules/paginator/components/paginator/paginator.component';
import { TabManagerService } from '@stal/carder';

import { MbsAssetResourceService } from '@mbs-main';
import { EnzoAssetDialogComponent } from '../asset-dialog/asset-dialog.component';

@Component({
	templateUrl  : './asset-list-page.component.html',
	styleUrls: ['./asset-list-page.component.scss']
})
export class EnzoAssetListPageComponent {
	constructor(
		private router: Router,
		public tabManagerService: TabManagerService,
		private resourceService: MbsAssetResourceService,
		private dialogService: DialogService,
		public eventer: AgalEventerService,

	) { }

	createNewAsset() {
		this.dialogService.open(EnzoAssetDialogComponent, {
			header: 'Crea bene immobile',
			width: '70%'
		});
	}

	assetListPaginator: AgalPaginator = {
		page: 0,
		size: 30
	};
	assetCount: number;

	assetListDc = ['_ck', 'id', 'description', 'address', 'mq'];
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
					label: "Modifica",
					icon: "pi pi-pencil",
					command: (e: any) => {
						const ref = this.dialogService.open(EnzoAssetDialogComponent, {
							data: { asset: { ...e.item.data } },
							header: 'Modifica bene immobile',
							width: '70%'
						});
					}
				},
				{
					label: "Cancella",
					icon: "pi pi-trash",
					command: async (e: any) => {
						await lastValueFrom(this.resourceService.deleteAssetUsingDELETE(e.item.data.id));
						this.eventer.launchReloadContent("asset");
					}
				}
			]
		}
	]
}
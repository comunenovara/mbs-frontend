import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { DialogService } from 'primeng/dynamicdialog';

import { StalEventerService, StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
import { TabManagerService } from '@stal/carder';

import { MbsDossierTypeResourceService } from '@mbs-main';
import { EnzoDossierTypeDialogComponent } from '../dossier-type-dialog/dossier-type-dialog.component';

@Component({
	templateUrl  : './dossier-type-list-page.component.html',
	styleUrls: ['./dossier-type-list-page.component.scss']
})
export class EnzoDossierTypeListPageComponent {
	constructor(
		private router: Router,
		public tabManagerService: TabManagerService,
		private resourceService: MbsDossierTypeResourceService,
		private dialogService: DialogService,
		public eventer: StalEventerService,

	) { }

	createNewDossierType() {
		this.dialogService.open(EnzoDossierTypeDialogComponent, {
			header: 'Create dossierType',
			width: '70%'
		});
	}

	dossierTypeListPaginator: StalPaginator = {
		page: 0,
		size: 30
	};
	dossierTypeCount: number;

	dossierTypeListDc = ['_ck', 'id'];
	paginatorEvent(paginator: any) {
		let dossierTypeListPaginator = { ...paginator }
		this.dossierTypeListPaginator = dossierTypeListPaginator;
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
						const ref = this.dialogService.open(EnzoDossierTypeDialogComponent, {
							data: { dossierType: { ...e.item.data } },
							header: 'Update dossierType',
							width: '70%'
						});
					}
				},
				{
					label: "Delete",
					icon: "pi pi-trash",
					command: async (e: any) => {
						await lastValueFrom(this.resourceService.deleteDossierTypeUsingDELETE(e.item.data.id));
						this.eventer.launchReloadContent("dossierType");
					}
				}
			]
		}
	]
}
import { AgalPaginator } from '@agal-core/modules/paginator/components/paginator/paginator.component';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { DialogService } from 'primeng/dynamicdialog';

import { TabManagerService } from '@tabler/services/tab-manager.service';
import { MbsDossierResourceService } from '@mbs-main';
import { EnzoDossierDialogComponent } from '../dossier-dialog/dossier-dialog.component';

@Component({
	templateUrl  : './dossier-list-page.component.html',
	styleUrls: ['./dossier-list-page.component.scss']
})
export class EnzoDossierListPageComponent {
	constructor(
		private router: Router,
		public tabManagerService: TabManagerService,
		private resourceService: MbsDossierResourceService,
		private dialogService: DialogService,
	) { }

	dossierListPaginator: AgalPaginator = {
		page: 0,
		size: 30
	};
	dossierCount: number;

	dossierListDc = ['_ck', 'id'];
	paginatorEvent(paginator: any) {
		let dossierListPaginator = { ...paginator }
		this.dossierListPaginator = dossierListPaginator;
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
						const ref = this.dialogService.open(EnzoDossierDialogComponent, {
							data: e.item.data,
							header: 'Update dossier',
							width: '70%'
						});
					}
				},
				{
					label: "Delete",
					icon: "pi pi-trash",
					command: async (e: any) => {
						await lastValueFrom(this.resourceService.deleteDossierUsingDELETE(e.item.data.id));
					}
				}
			]
		}
	]
}
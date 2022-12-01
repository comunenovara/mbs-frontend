import { AgalPaginator } from '@agal-core/components/paginator/paginator.component';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { TabManagerService } from '@tabler/services/tab-manager.service';
import { MbsDossierResourceService } from '@mbs-main';

@Component({
	templateUrl  : './dossier-list-page.component.html',
})
export class EnzoDossierListPageComponent {
	constructor(
		private router: Router,
		public tabManagerService: TabManagerService,
		private resourceService: MbsDossierResourceService,
	) { }

	dossierListPaginator: AgalPaginator = {
		page: 0,
		size: 30
	};
	dossierCount: number;

	dossierListDc = [ '_ck' , 'id'];
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
						console.log("edit", e.item.data.id);
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
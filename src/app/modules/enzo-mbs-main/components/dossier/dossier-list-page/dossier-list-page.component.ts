import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { DialogService } from 'primeng/dynamicdialog';

import { AgalEventerService } from '@agal-core/modules/eventer/services/eventer.service';
import { AgalPaginator } from '@agal-core/modules/paginator/components/paginator/paginator.component';
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
		public eventer: AgalEventerService,

	) { }

	createNewDossier() {
		this.dialogService.open(EnzoDossierDialogComponent, {
			header: 'Crea fascicolo',
			width: '70%'
		});
	}

	dossierListPaginator: AgalPaginator = {
		page: 0,
		size: 30
	};
	dossierCount: number;

	dossierListDc = ['_ck', 'id', 'asset.description', 'relif.description', 'operation.description', 'type.description', 'description'];
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
					label: "Modifica",
					icon: "pi pi-pencil",
					command: (e: any) => {
						const ref = this.dialogService.open(EnzoDossierDialogComponent, {
							data: { dossier: { ...e.item.data } },
							header: 'Update dossier',
							width: '70%'
						});
					}
				},
				{
					label: "Cancella",
					icon: "pi pi-trash",
					command: async (e: any) => {
						await lastValueFrom(this.resourceService.deleteDossierUsingDELETE(e.item.data.id));
						this.eventer.launchReloadContent("dossier");
					}
				}
			]
		}
	]
}
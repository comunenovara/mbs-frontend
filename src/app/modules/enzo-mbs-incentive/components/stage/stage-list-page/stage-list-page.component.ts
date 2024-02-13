import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { DialogService } from 'primeng/dynamicdialog';

import { StalEventerService, StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { MbsStageResourceService } from '@mbs-incentive';
import { EnzoStageDialogComponent } from '../stage-dialog/stage-dialog.component';

@Component({
	templateUrl  : './stage-list-page.component.html',
	styleUrls: ['./stage-list-page.component.scss']
})
export class EnzoStageListPageComponent {
	constructor(
		private router: Router,
		//public tabManagerService: TabManagerService,
		private resourceService: MbsStageResourceService,
		private dialogService: DialogService,
		public eventer: StalEventerService,

	) { }

	createNewStage() {
		this.dialogService.open(EnzoStageDialogComponent, {
			header: 'Create stage',
			width: '70%'
		});
	}

	stageListPaginator: StalPaginator = {
		page: 0,
		size: 30
	};
	stageCount: number;

	stageListDc = ['_ck', 'id'];
	paginatorEvent(paginator: any) {
		let stageListPaginator = { ...paginator }
		this.stageListPaginator = stageListPaginator;
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
						const ref = this.dialogService.open(EnzoStageDialogComponent, {
							data: { stage: { ...e.item.data } },
							header: 'Update stage',
							width: '70%'
						});
					}
				},
				{
					label: "Delete",
					icon: "pi pi-trash",
					command: async (e: any) => {
						await lastValueFrom(this.resourceService.deleteStageUsingDELETE(e.item.data.id));
						this.eventer.launchReloadContent("stage");
					}
				}
			]
		}
	]
}
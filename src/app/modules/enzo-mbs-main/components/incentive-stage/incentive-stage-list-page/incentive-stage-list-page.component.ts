import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { DialogService } from 'primeng/dynamicdialog';

import { StalEventerService, StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { MbsIncentiveStageResourceService } from '@mbs-main';
import { EnzoIncentiveStageDialogComponent } from '../incentive-stage-dialog/incentive-stage-dialog.component';

@Component({
	templateUrl  : './incentive-stage-list-page.component.html',
	styleUrls: ['./incentive-stage-list-page.component.scss']
})
export class EnzoIncentiveStageListPageComponent {
	constructor(
		private router: Router,
		//public tabManagerService: TabManagerService,
		private resourceService: MbsIncentiveStageResourceService,
		private dialogService: DialogService,
		public eventer: StalEventerService,

	) { }

	createNewIncentiveStage() {
		this.dialogService.open(EnzoIncentiveStageDialogComponent, {
			header: 'Create incentiveStage',
			width: '70%'
		});
	}

	incentiveStageListPaginator: StalPaginator = {
		page: 0,
		size: 30
	};
	incentiveStageCount: number;

	incentiveStageListDc = ['_ck', 'id'];
	paginatorEvent(paginator: any) {
		let incentiveStageListPaginator = { ...paginator }
		this.incentiveStageListPaginator = incentiveStageListPaginator;
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
						const ref = this.dialogService.open(EnzoIncentiveStageDialogComponent, {
							data: { incentiveStage: { ...e.item.data } },
							header: 'Update incentiveStage',
							width: '70%'
						});
					}
				},
				{
					label: "Delete",
					icon: "pi pi-trash",
					command: async (e: any) => {
						await lastValueFrom(this.resourceService.deleteIncentiveStageUsingDELETE(e.item.data.id));
						this.eventer.launchReloadContent("incentiveStage");
					}
				}
			]
		}
	]
}
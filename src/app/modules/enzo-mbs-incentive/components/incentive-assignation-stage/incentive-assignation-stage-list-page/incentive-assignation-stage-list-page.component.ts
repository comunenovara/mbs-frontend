import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { DialogService } from 'primeng/dynamicdialog';

import { StalEventerService, StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { MbsIncentiveAssignationStageResourceService } from '@mbs-incentive';
import { EnzoIncentiveAssignationStageDialogComponent } from '../incentive-assignation-stage-dialog/incentive-assignation-stage-dialog.component';

@Component({
	templateUrl  : './incentive-assignation-stage-list-page.component.html',
	styleUrls: ['./incentive-assignation-stage-list-page.component.scss']
})
export class EnzoIncentiveAssignationStageListPageComponent {
	constructor(
		private router: Router,
		//public tabManagerService: TabManagerService,
		private resourceService: MbsIncentiveAssignationStageResourceService,
		private dialogService: DialogService,
		public eventer: StalEventerService,

	) { }

	createNewIncentiveAssignationStage() {
		this.dialogService.open(EnzoIncentiveAssignationStageDialogComponent, {
			header: 'Create incentiveAssignationStage',
			width: '70%'
		});
	}

	incentiveAssignationStageListPaginator: StalPaginator = {
		page: 0,
		size: 30
	};
	incentiveAssignationStageCount: number;

	incentiveAssignationStageListDc = ['_ck', 'id'];
	paginatorEvent(paginator: any) {
		let incentiveAssignationStageListPaginator = { ...paginator }
		this.incentiveAssignationStageListPaginator = incentiveAssignationStageListPaginator;
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
						const ref = this.dialogService.open(EnzoIncentiveAssignationStageDialogComponent, {
							data: { incentiveAssignationStage: { ...e.item.data } },
							header: 'Update incentiveAssignationStage',
							width: '70%'
						});
					}
				},
				{
					label: "Delete",
					icon: "pi pi-trash",
					command: async (e: any) => {
						await lastValueFrom(this.resourceService.deleteIncentiveAssignationStageUsingDELETE(e.item.data.id));
						this.eventer.launchReloadContent("incentiveAssignationStage");
					}
				}
			]
		}
	]
}
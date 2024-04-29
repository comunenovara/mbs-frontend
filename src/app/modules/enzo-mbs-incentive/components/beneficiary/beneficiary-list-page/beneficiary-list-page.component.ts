import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { DialogService } from 'primeng/dynamicdialog';

import { StalEventerService, StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';


import { MbsBeneficiaryResourceService } from '@mbs-incentive';
import { EnzoBeneficiaryDialogComponent } from '../beneficiary-dialog/beneficiary-dialog.component';

@Component({
	templateUrl  : './beneficiary-list-page.component.html',
	styleUrls: ['./beneficiary-list-page.component.scss']
})
export class EnzoBeneficiaryListPageComponent {
	constructor(
		private router: Router,
		//public tabManagerService: TabManagerService,
		private resourceService: MbsBeneficiaryResourceService,
		private dialogService: DialogService,
		public eventer: StalEventerService,

	) { }

	createNewBeneficiary() {
		this.dialogService.open(EnzoBeneficiaryDialogComponent, {
			header: 'Create beneficiary',
			width: '70%'
		});
	}

	beneficiaryListPaginator: StalPaginator = {
		page: 0,
		size: 30
	};
	beneficiaryCount: number;

	beneficiaryListDc = ['_ck', 'id', 'name'];
	paginatorEvent(paginator: any) {
		let beneficiaryListPaginator = { ...paginator }
		this.beneficiaryListPaginator = beneficiaryListPaginator;
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
			////command: (e: any) => this.tabManagerService.openInTab(),
			childs: [
				{
					label: "Edit",
					icon: "pi pi-pencil",
					command: (e: any) => {
						const ref = this.dialogService.open(EnzoBeneficiaryDialogComponent, {
							data: { beneficiary: { ...e.item.data } },
							header: 'Update beneficiary',
							width: '70%'
						});
					}
				},
				{
					label: "Delete",
					icon: "pi pi-trash",
					command: async (e: any) => {
						await lastValueFrom(this.resourceService.deleteBeneficiaryUsingDELETE(e.item.data.id));
						this.eventer.launchReloadContent("beneficiary");
					}
				}
			]
		}
	]
}
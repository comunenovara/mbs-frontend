import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { DialogService } from 'primeng/dynamicdialog';

import { StalEventerService, StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { MbsIncentiveBeneficiaryResourceService } from '@mbs-main';
import { EnzoIncentiveBeneficiaryDialogComponent } from '../incentive-beneficiary-dialog/incentive-beneficiary-dialog.component';

@Component({
	templateUrl  : './incentive-beneficiary-list-page.component.html',
	styleUrls: ['./incentive-beneficiary-list-page.component.scss']
})
export class EnzoIncentiveBeneficiaryListPageComponent {
	constructor(
		private router: Router,
		//public tabManagerService: TabManagerService,
		private resourceService: MbsIncentiveBeneficiaryResourceService,
		private dialogService: DialogService,
		public eventer: StalEventerService,

	) { }

	createNewIncentiveBeneficiary() {
		this.dialogService.open(EnzoIncentiveBeneficiaryDialogComponent, {
			header: 'Aggiungi beneficiario',
			width: '70%'
		});
	}

	incentiveBeneficiaryListPaginator: StalPaginator = {
		page: 0,
		size: 30
	};
	incentiveBeneficiaryCount: number;

	incentiveBeneficiaryListDc = ['_ck', 'id', 'description', 'active'];
	paginatorEvent(paginator: any) {
		let incentiveBeneficiaryListPaginator = { ...paginator }
		this.incentiveBeneficiaryListPaginator = incentiveBeneficiaryListPaginator;
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
					label: "Modifica",
					icon: "pi pi-pencil",
					command: (e: any) => {
						const ref = this.dialogService.open(EnzoIncentiveBeneficiaryDialogComponent, {
							data: { incentiveBeneficiary: { ...e.item.data } },
							header: 'Aggiorna beneficiario',
							width: '70%'
						});
					}
				},
				{
					label: "Delete",
					icon: "pi pi-trash",
					command: async (e: any) => {
						await lastValueFrom(this.resourceService.deleteIncentiveBeneficiaryUsingDELETE(e.item.data.id));
						this.eventer.launchReloadContent("incentiveBeneficiary");
					}
				}
			]
		}
	]
}
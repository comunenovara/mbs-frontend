import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { DialogService } from 'primeng/dynamicdialog';

import { StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { EngeAppCommonService, EngeAppGenericDetailPageComponent } from "@enge/common-app";

import { MbsIncentiveBeneficiaryDto, MbsIncentiveBeneficiaryResourceService} from '@mbs-main';
import { EnzoIncentiveBeneficiaryDialogComponent } from '../incentive-beneficiary-dialog/incentive-beneficiary-dialog.component';
import { EnzoIncentiveRoleAssignationDialogComponent } from "../../incentive-role-assignation/incentive-role-assignation-dialog/incentive-role-assignation-dialog.component";

@Component({
	selector: 'enzo-incentive-beneficiary-detail-page',
	templateUrl: './incentive-beneficiary-detail-page.component.html',
	styleUrls: ['./incentive-beneficiary-detail-page.component.scss']
})
export class EnzoIncentiveBeneficiaryDetailPageComponent extends EngeAppGenericDetailPageComponent {
	constructor(
		eacs: EngeAppCommonService,
		route: ActivatedRoute,
		//public tabManagerService: TabManagerService,
		private dialogService: DialogService,
		private resourceService: MbsIncentiveBeneficiaryResourceService,
	) { super(eacs, route); }

	incentiveBeneficiaryDto: MbsIncentiveBeneficiaryDto;

	override onLoad() {
		this.incentiveBeneficiaryDto = this.route.snapshot.data['incentiveBeneficiary'];
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "incentiveBeneficiary") this.reloadPage();
	}

	override async reloadPage() {
		this.incentiveBeneficiaryDto = await lastValueFrom(this.resourceService.getIncentiveBeneficiaryUsingGET(this.id));
	}

	editIncentiveBeneficiary(incentiveBeneficiary: MbsIncentiveBeneficiaryDto) {
		const ref = this.dialogService.open(EnzoIncentiveBeneficiaryDialogComponent, {
			data: { incentiveBeneficiary: incentiveBeneficiary },
			header: 'Update incentiveBeneficiary',
			width: '70%'
		});
	}

	async deleteIncentiveBeneficiary(incentiveBeneficiary: MbsIncentiveBeneficiaryDto) {
		if(incentiveBeneficiary.id === undefined) return;
		await lastValueFrom(this.resourceService.deleteIncentiveBeneficiaryUsingDELETE(incentiveBeneficiary.id));
	}

	createNewIncentiveRoleAssignation(incentiveBeneficiaryDto: MbsIncentiveBeneficiaryDto) {
		this.dialogService.open(EnzoIncentiveRoleAssignationDialogComponent, {
			header: 'Create IncentiveRoleAssignation',
			width: '70%',
			data: {
				beneficiary: incentiveBeneficiaryDto
			}
		});
	}

	protected incentiveRoleAssignationTableButtons: any[] = [
		{
			label: "Dettagli",
			hideLabel: true,
			icon: "pi pi-search",
			severity: "secondary",
			class: "p-button-sm p-button-outlined",
			link: "../../../incentive-role-assignation/detail",
			//command: (e: any) => this.tabManagerService.openInCard(),
		}
	];
	protected incentiveRoleAssignationListPaginator: StalPaginator = {
		page: 0,
		size: 10
	};
	protected incentiveRoleAssignationCount: number;

}




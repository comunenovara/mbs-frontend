import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { DialogService } from 'primeng/dynamicdialog';

import { StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { EngeAppCommonService, EngeAppGenericDetailPageComponent } from "@enge/common-app";

import { MbsBeneficiaryDto, MbsBeneficiaryResourceService} from '@mbs-incentive';
import { EnzoBeneficiaryDialogComponent } from '../beneficiary-dialog/beneficiary-dialog.component';
import { EnzoIncentiveAssignationRoleDialogComponent } from "../../incentive-assignation-role/incentive-assignation-role-dialog/incentive-assignation-role-dialog.component";

@Component({
	selector: 'enzo-beneficiary-detail-page',
	templateUrl: './beneficiary-detail-page.component.html',
	styleUrls: ['./beneficiary-detail-page.component.scss']
})
export class EnzoBeneficiaryDetailPageComponent extends EngeAppGenericDetailPageComponent {
	constructor(
		eacs: EngeAppCommonService,
		route: ActivatedRoute,
		//public tabManagerService: TabManagerService,
		private dialogService: DialogService,
		private resourceService: MbsBeneficiaryResourceService,
	) { super(eacs, route); }

	beneficiaryDto: MbsBeneficiaryDto;

	override onLoad() {
		this.beneficiaryDto = this.route.snapshot.data['beneficiary'];
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "beneficiary") this.reloadPage();
	}

	override async reloadPage() {
		this.beneficiaryDto = await lastValueFrom(this.resourceService.getBeneficiaryUsingGET(this.id));
	}

	editBeneficiary(beneficiary: MbsBeneficiaryDto) {
		const ref = this.dialogService.open(EnzoBeneficiaryDialogComponent, {
			data: { beneficiary: beneficiary },
			header: 'Update beneficiary',
			width: '70%'
		});
	}

	async deleteBeneficiary(beneficiary: MbsBeneficiaryDto) {
		if(beneficiary.id === undefined) return;
		await lastValueFrom(this.resourceService.deleteBeneficiaryUsingDELETE(beneficiary.id));
	}

	createNewIncentiveAssignationRole(beneficiaryDto: MbsBeneficiaryDto) {
		this.dialogService.open(EnzoIncentiveAssignationRoleDialogComponent, {
			header: 'Create IncentiveAssignationRole',
			width: '70%',
			data: {
				beneficiary: beneficiaryDto
			}
		});
	}

	protected incentiveAssignationRoleTableButtons: any[] = [
		{
			label: "Dettagli",
			hideLabel: true,
			icon: "pi pi-search",
			severity: "secondary",
			class: "p-button-sm p-button-outlined",
			link: "../../../incentive-assignation-role/detail",
			//command: (e: any) => this.tabManagerService.openInCard(),
		}
	];
	protected incentiveAssignationRoleListPaginator: StalPaginator = {
		page: 0,
		size: 10
	};
	protected incentiveAssignationRoleCount: number;

}




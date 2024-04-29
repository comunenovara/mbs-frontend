import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { DialogService } from 'primeng/dynamicdialog';

import { StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';


import { EngeAppCommonService, EngeAppGenericDetailPageComponent } from "@enge/common-app";

import { MbsIncentiveAssignationDto, MbsIncentiveAssignationResourceService} from '@mbs-main';
import { EnzoIncentiveAssignationDialogComponent } from '../incentive-assignation-dialog/incentive-assignation-dialog.component';

@Component({
	selector: 'enzo-incentive-assignation-detail-page',
	templateUrl: './incentive-assignation-detail-page.component.html',
	styleUrls: ['./incentive-assignation-detail-page.component.scss']
})
export class EnzoIncentiveAssignationDetailPageComponent extends EngeAppGenericDetailPageComponent {
	constructor(
		eacs: EngeAppCommonService,
		route: ActivatedRoute,
		//public tabManagerService: TabManagerService,
		private dialogService: DialogService,
		private resourceService: MbsIncentiveAssignationResourceService,
	) { super(eacs, route); }

	incentiveAssignationDto: MbsIncentiveAssignationDto;

	override onLoad() {
		this.incentiveAssignationDto = this.route.snapshot.data['incentiveAssignation'];
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "incentiveAssignation") this.reloadPage();
	}

	override async reloadPage() {
		this.incentiveAssignationDto = await lastValueFrom(this.resourceService.getIncentiveAssignationUsingGET(this.id));
	}

	editIncentiveAssignation(incentiveAssignation: MbsIncentiveAssignationDto) {
		const ref = this.dialogService.open(EnzoIncentiveAssignationDialogComponent, {
			data: { incentiveAssignation: incentiveAssignation },
			header: 'Update incentiveAssignation',
			width: '70%'
		});
	}

	async deleteIncentiveAssignation(incentiveAssignation: MbsIncentiveAssignationDto) {
		if(incentiveAssignation.id === undefined) return;
		await lastValueFrom(this.resourceService.deleteIncentiveAssignationUsingDELETE(incentiveAssignation.id));
	}

}




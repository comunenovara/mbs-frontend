import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { DialogService } from 'primeng/dynamicdialog';

import { StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';


import { EngeAppCommonService, EngeAppGenericDetailPageComponent } from "@enge/common-app";

import { MbsIncentiveWithheldDto, MbsIncentiveWithheldResourceService} from '@mbs-main';
import { EnzoIncentiveWithheldDialogComponent } from '../incentive-withheld-dialog/incentive-withheld-dialog.component';

@Component({
	selector: 'enzo-incentive-withheld-detail-page',
	templateUrl: './incentive-withheld-detail-page.component.html',
	styleUrls: ['./incentive-withheld-detail-page.component.scss']
})
export class EnzoIncentiveWithheldDetailPageComponent extends EngeAppGenericDetailPageComponent {
	constructor(
		eacs: EngeAppCommonService,
		route: ActivatedRoute,
		//public tabManagerService: TabManagerService,
		private dialogService: DialogService,
		private resourceService: MbsIncentiveWithheldResourceService,
	) { super(eacs, route); }

	incentiveWithheldDto: MbsIncentiveWithheldDto;

	override onLoad() {
		this.incentiveWithheldDto = this.route.snapshot.data['incentiveWithheld'];
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "incentiveWithheld") this.reloadPage();
	}

	override async reloadPage() {
		this.incentiveWithheldDto = await lastValueFrom(this.resourceService.getIncentiveWithheldUsingGET(this.id));
	}

	editIncentiveWithheld(incentiveWithheld: MbsIncentiveWithheldDto) {
		const ref = this.dialogService.open(EnzoIncentiveWithheldDialogComponent, {
			data: { incentiveWithheld: incentiveWithheld },
			header: 'Update incentiveWithheld',
			width: '70%'
		});
	}

	async deleteIncentiveWithheld(incentiveWithheld: MbsIncentiveWithheldDto) {
		if(incentiveWithheld.id === undefined) return;
		await lastValueFrom(this.resourceService.deleteIncentiveWithheldUsingDELETE(incentiveWithheld.id));
	}

}




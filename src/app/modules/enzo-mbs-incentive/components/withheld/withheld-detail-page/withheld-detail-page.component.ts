import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { DialogService } from 'primeng/dynamicdialog';

import { StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { EngeAppCommonService, EngeAppGenericDetailPageComponent } from "@enge/common-app";

import { MbsWithheldDto, MbsWithheldResourceService} from '@mbs-incentive';
import { EnzoWithheldDialogComponent } from '../withheld-dialog/withheld-dialog.component';

@Component({
	selector: 'enzo-withheld-detail-page',
	templateUrl: './withheld-detail-page.component.html',
	styleUrls: ['./withheld-detail-page.component.scss']
})
export class EnzoWithheldDetailPageComponent extends EngeAppGenericDetailPageComponent {
	constructor(
		eacs: EngeAppCommonService,
		route: ActivatedRoute,
		//public tabManagerService: TabManagerService,
		private dialogService: DialogService,
		private resourceService: MbsWithheldResourceService,
	) { super(eacs, route); }

	withheldDto: MbsWithheldDto;

	override onLoad() {
		this.withheldDto = this.route.snapshot.data['withheld'];
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "withheld") this.reloadPage();
	}

	override async reloadPage() {
		this.withheldDto = await lastValueFrom(this.resourceService.getWithheldUsingGET(this.id));
	}

	editWithheld(withheld: MbsWithheldDto) {
		const ref = this.dialogService.open(EnzoWithheldDialogComponent, {
			data: { withheld: withheld },
			header: 'Update withheld',
			width: '70%'
		});
	}

	async deleteWithheld(withheld: MbsWithheldDto) {
		if(withheld.id === undefined) return;
		await lastValueFrom(this.resourceService.deleteWithheldUsingDELETE(withheld.id));
	}

}




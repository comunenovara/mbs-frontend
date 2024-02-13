import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { DialogService } from 'primeng/dynamicdialog';

import { StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { EngeAppCommonService, EngeAppGenericDetailPageComponent } from "@enge/common-app";

import { MbsStageDto, MbsStageResourceService} from '@mbs-incentive';
import { EnzoStageDialogComponent } from '../stage-dialog/stage-dialog.component';
import { EnzoRoleValueDialogComponent } from "../../role-value/role-value-dialog/role-value-dialog.component";

@Component({
	selector: 'enzo-stage-detail-page',
	templateUrl: './stage-detail-page.component.html',
	styleUrls: ['./stage-detail-page.component.scss']
})
export class EnzoStageDetailPageComponent extends EngeAppGenericDetailPageComponent {
	constructor(
		eacs: EngeAppCommonService,
		route: ActivatedRoute,
		//public tabManagerService: TabManagerService,
		private dialogService: DialogService,
		private resourceService: MbsStageResourceService,
	) { super(eacs, route); }

	stageDto: MbsStageDto;

	override onLoad() {
		this.stageDto = this.route.snapshot.data['stage'];
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "stage") this.reloadPage();
	}

	override async reloadPage() {
		this.stageDto = await lastValueFrom(this.resourceService.getStageUsingGET(this.id));
	}

	editStage(stage: MbsStageDto) {
		const ref = this.dialogService.open(EnzoStageDialogComponent, {
			data: { stage: stage },
			header: 'Update stage',
			width: '70%'
		});
	}

	async deleteStage(stage: MbsStageDto) {
		if(stage.id === undefined) return;
		await lastValueFrom(this.resourceService.deleteStageUsingDELETE(stage.id));
	}

	createNewRoleValue(stageDto: MbsStageDto) {
		this.dialogService.open(EnzoRoleValueDialogComponent, {
			header: 'Create RoleValue',
			width: '70%',
			data: {
				stage: stageDto
			}
		});
	}

	protected roleValueTableButtons: any[] = [
		{
			label: "Dettagli",
			hideLabel: true,
			icon: "pi pi-search",
			severity: "secondary",
			class: "p-button-sm p-button-outlined",
			link: "../../../role-value/detail",
			//command: (e: any) => this.tabManagerService.openInCard(),
		}
	];
	protected roleValueListPaginator: StalPaginator = {
		page: 0,
		size: 10
	};
	protected roleValueCount: number;

}




import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { DialogService } from 'primeng/dynamicdialog';

import { StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { EngeAppCommonService, EngeAppGenericDetailPageComponent } from "@enge/common-app";

import { MbsGovernativeProjectDto, MbsGovernativeProjectResourceService} from '@mbs-incentive';
import { EnzoGovernativeProjectDialogComponent } from '../governative-project-dialog/governative-project-dialog.component';
import { EnzoGovernativeProjectAndProcurementLotDialogComponent } from "../../governative-project-and-procurement-lot/governative-project-and-procurement-lot-dialog/governative-project-and-procurement-lot-dialog.component";

@Component({
	selector: 'enzo-governative-project-detail-page',
	templateUrl: './governative-project-detail-page.component.html',
	styleUrls: ['./governative-project-detail-page.component.scss']
})
export class EnzoGovernativeProjectDetailPageComponent extends EngeAppGenericDetailPageComponent {
	constructor(
		eacs: EngeAppCommonService,
		route: ActivatedRoute,
		//public tabManagerService: TabManagerService,
		private dialogService: DialogService,
		private resourceService: MbsGovernativeProjectResourceService,
	) { super(eacs, route); }

	governativeProjectDto: MbsGovernativeProjectDto;

	override onLoad() {
		this.governativeProjectDto = this.route.snapshot.data['governativeProject'];
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "governativeProject") this.reloadPage();
	}

	override async reloadPage() {
		this.governativeProjectDto = await lastValueFrom(this.resourceService.getGovernativeProjectUsingGET(this.id));
	}

	editGovernativeProject(governativeProject: MbsGovernativeProjectDto) {
		const ref = this.dialogService.open(EnzoGovernativeProjectDialogComponent, {
			data: { governativeProject: governativeProject },
			header: 'Update governativeProject',
			width: '70%'
		});
	}

	async deleteGovernativeProject(governativeProject: MbsGovernativeProjectDto) {
		if(governativeProject.id === undefined) return;
		await lastValueFrom(this.resourceService.deleteGovernativeProjectUsingDELETE(governativeProject.id));
	}

	createNewGovernativeProjectAndProcurementLot(governativeProjectDto: MbsGovernativeProjectDto) {
		this.dialogService.open(EnzoGovernativeProjectAndProcurementLotDialogComponent, {
			header: 'Create GovernativeProjectAndProcurementLot',
			width: '70%',
			data: {
				governativeProject: governativeProjectDto
			}
		});
	}

	protected governativeProjectAndProcurementLotTableButtons: any[] = [
		{
			label: "Dettagli",
			hideLabel: true,
			icon: "pi pi-search",
			severity: "secondary",
			class: "p-button-sm p-button-outlined",
			link: "../../../governative-project-and-procurement-lot/detail",
			//command: (e: any) => this.tabManagerService.openInCard(),
		}
	];
	protected governativeProjectAndProcurementLotListPaginator: StalPaginator = {
		page: 0,
		size: 10
	};
	protected governativeProjectAndProcurementLotCount: number;

}




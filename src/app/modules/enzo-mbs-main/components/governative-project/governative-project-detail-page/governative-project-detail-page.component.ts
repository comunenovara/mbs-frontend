import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { DialogService } from 'primeng/dynamicdialog';

import { StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { EngeAppCommonService, EngeAppGenericDetailPageComponent } from "@enge/common-app";

import { MbsGovernativeProjectDto, MbsGovernativeProjectResourceService} from '@mbs-main';
import { EnzoGovernativeProjectDialogComponent } from '../governative-project-dialog/governative-project-dialog.component';
import { EnzoGovernativeProjectProcurementLotDialogComponent } from "../../governative-project-procurement-lot/governative-project-procurement-lot-dialog/governative-project-procurement-lot-dialog.component";

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
			header: 'Modifica progetto',
			width: '70%'
		});
	}

	async deleteGovernativeProject(governativeProject: MbsGovernativeProjectDto) {
		if(governativeProject.id === undefined) return;
		await lastValueFrom(this.resourceService.deleteGovernativeProjectUsingDELETE(governativeProject.id));
	}

	createNewGovernativeProjectProcurementLot(governativeProjectDto: MbsGovernativeProjectDto) {
		this.dialogService.open(EnzoGovernativeProjectProcurementLotDialogComponent, {
			header: 'Create GovernativeProjectProcurementLot',
			width: '70%',
			data: {
				project: governativeProjectDto
			}
		});
	}

	protected governativeProjectProcurementLotTableButtons: any[] = [
		{
			label: "Dettagli",
			hideLabel: true,
			icon: "pi pi-search",
			severity: "secondary",
			class: "p-button-sm p-button-outlined",
			link: "../../../governative-project-procurement-lot/detail",
			//command: (e: any) => this.tabManagerService.openInCard(),
		}
	];
	protected governativeProjectProcurementLotListPaginator: StalPaginator = {
		page: 0,
		size: 10
	};
	protected governativeProjectProcurementLotCount: number;

}




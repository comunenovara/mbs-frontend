import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { DialogService } from 'primeng/dynamicdialog';

import { StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { EngeAppCommonService, EngeAppGenericDetailPageComponent } from "@enge/common-app";

import { MbsElaborateGroupDto, MbsElaborateGroupResourceService} from '@mbs-main';
import { EnzoElaborateGroupDialogComponent } from '../elaborate-group-dialog/elaborate-group-dialog.component';
import { EnzoDossierDialogComponent } from "../../dossier/dossier-dialog/dossier-dialog.component";

@Component({
	selector: 'enzo-elaborate-group-detail-page',
	templateUrl: './elaborate-group-detail-page.component.html',
	styleUrls: ['./elaborate-group-detail-page.component.scss']
})
export class EnzoElaborateGroupDetailPageComponent extends EngeAppGenericDetailPageComponent {
	constructor(
		eacs: EngeAppCommonService,
		route: ActivatedRoute,
		//public tabManagerService: TabManagerService,
		private dialogService: DialogService,
		private resourceService: MbsElaborateGroupResourceService,
	) { super(eacs, route); }

	elaborateGroupDto: MbsElaborateGroupDto;

	override onLoad() {
		this.elaborateGroupDto = this.route.snapshot.data['elaborateGroup'];
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "elaborateGroup") this.reloadPage();
	}

	override async reloadPage() {
		this.elaborateGroupDto = await lastValueFrom(this.resourceService.getElaborateGroupUsingGET(this.id));
	}

	editElaborateGroup(elaborateGroup: MbsElaborateGroupDto) {
		const ref = this.dialogService.open(EnzoElaborateGroupDialogComponent, {
			data: { elaborateGroup: elaborateGroup },
			header: 'Update elaborateGroup',
			width: '70%'
		});
	}

	async deleteElaborateGroup(elaborateGroup: MbsElaborateGroupDto) {
		if(elaborateGroup.id === undefined) return;
		await lastValueFrom(this.resourceService.deleteElaborateGroupUsingDELETE(elaborateGroup.id));
	}

	createNewDossier(elaborateGroupDto: MbsElaborateGroupDto) {
		this.dialogService.open(EnzoDossierDialogComponent, {
			header: 'Create Dossier',
			width: '70%',
			data: {
				elaborateGroup: elaborateGroupDto
			}
		});
	}

	protected dossierTableButtons: any[] = [
		{
			label: "Dettagli",
			hideLabel: true,
			icon: "pi pi-search",
			severity: "secondary",
			class: "p-button-sm p-button-outlined",
			link: "../../../dossier/detail",
			//command: (e: any) => this.tabManagerService.openInCard(),
		}
	];
	protected dossierListPaginator: StalPaginator = {
		page: 0,
		size: 10
	};
	protected dossierCount: number;

}




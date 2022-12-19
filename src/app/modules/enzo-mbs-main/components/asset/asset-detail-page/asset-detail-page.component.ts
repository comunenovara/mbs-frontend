import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { DialogService } from 'primeng/dynamicdialog';

import { AgalEvent, AgalEventerService } from "@agal-core/modules/eventer/services/eventer.service";
import { AgalPaginator } from "@agal-core/modules/paginator/components/paginator/paginator.component";
import { TabManagerService } from "@tabler/services/tab-manager.service";

import { EnzoGenericDetailPageComponent } from "app/components/enzo-generic-detail.component";
import { MbsAssetDto, MbsAssetResourceService} from '@mbs-main';
import { EnzoAssetDialogComponent } from '../asset-dialog/asset-dialog.component';
import { EnzoDossierDialogComponent } from "../../dossier/dossier-dialog/dossier-dialog.component";
import { EnzoOperationDialogComponent } from "../../operation/operation-dialog/operation-dialog.component";
import { EnzoRelifDialogComponent } from "../../relif/relif-dialog/relif-dialog.component";

@Component({
	selector: 'enzo-asset-detail-page',
	templateUrl: './asset-detail-page.component.html',
	styleUrls: ['./asset-detail-page.component.scss']
})
export class EnzoAssetDetailPageComponent extends EnzoGenericDetailPageComponent {
	constructor(
		route: ActivatedRoute,
		router: Router,
		eventer: AgalEventerService,
		public tabManagerService: TabManagerService,
		private dialogService: DialogService,
		private resourceService: MbsAssetResourceService,
	) { super(route, router, eventer); }

	assetDto: MbsAssetDto;

	override onLoad() {
		this.assetDto = this.route.snapshot.data['asset'];
	}

	protected override reloadFromEvent(event: AgalEvent) {
		if(event.data === "asset") this.reloadPage();
	}

	override async reloadPage() {
		this.assetDto = await lastValueFrom(this.resourceService.getAssetUsingGET(this.id));
	}

	editAsset(asset: MbsAssetDto) {
		const ref = this.dialogService.open(EnzoAssetDialogComponent, {
			data: asset,
			header: 'Update asset',
			width: '70%'
		});
	}

	async deleteAsset(asset: MbsAssetDto) {
		if(asset.id === undefined) return;
		await lastValueFrom(this.resourceService.deleteAssetUsingDELETE(asset.id));
	}

	createNewDossier(assetDto: MbsAssetDto) {
		this.dialogService.open(EnzoDossierDialogComponent, {
			header: 'Create Dossier',
			width: '70%',
			data: {
				asset: assetDto
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
			command: (e: any) => this.tabManagerService.openInCard(),
		}
	];
	protected dossierListPaginator: AgalPaginator = {
		page: 0,
		size: 10
	};
	protected dossierCount: number;

	createNewOperation(assetDto: MbsAssetDto) {
		this.dialogService.open(EnzoOperationDialogComponent, {
			header: 'Create Operation',
			width: '70%',
			data: {
				asset: assetDto
			}
		});
	}

	protected operationTableButtons: any[] = [
		{
			label: "Dettagli",
			hideLabel: true,
			icon: "pi pi-search",
			severity: "secondary",
			class: "p-button-sm p-button-outlined",
			link: "../../../operation/detail",
			command: (e: any) => this.tabManagerService.openInCard(),
		}
	];
	protected operationListPaginator: AgalPaginator = {
		page: 0,
		size: 10
	};
	protected operationCount: number;

	createNewRelif(assetDto: MbsAssetDto) {
		this.dialogService.open(EnzoRelifDialogComponent, {
			header: 'Create Relif',
			width: '70%',
			data: {
				asset: assetDto
			}
		});
	}

	protected relifTableButtons: any[] = [
		{
			label: "Dettagli",
			hideLabel: true,
			icon: "pi pi-search",
			severity: "secondary",
			class: "p-button-sm p-button-outlined",
			link: "../../../relif/detail",
			command: (e: any) => this.tabManagerService.openInCard(),
		}
	];
	protected relifListPaginator: AgalPaginator = {
		page: 0,
		size: 10
	};
	protected relifCount: number;

}




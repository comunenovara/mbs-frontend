import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { DialogService } from 'primeng/dynamicdialog';

import { AgalEvent, AgalEventerService } from "@agal-core/modules/eventer/services/eventer.service";
import { TabManagerService } from "@tabler/services/tab-manager.service";

import { EnzoGenericDetailPageComponent } from "app/components/enzo-generic-detail.component";
import { MbsAssetDto, MbsAssetResourceService } from '@mbs-main';
import { EnzoAssetDialogComponent } from '../asset-dialog/asset-dialog.component';
import { EnzoOperationDialogComponent } from "../../operation/operation-dialog/operation-dialog.component";

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
		if (event.data === "asset") this.reloadPage();
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
		if (asset.id === undefined) return;
		await lastValueFrom(this.resourceService.deleteAssetUsingDELETE(asset.id));
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

	protected operationTableButtons: any[] = [
		{
			label: "Dettagli",
			hideLabel: true,
			icon: "pi pi-search",
			severity: "secondary",
			class: "p-button-sm p-button-outlined",
			link: "../../../operation/detail",
			command: (e: any) => this.tabManagerService.openInCard(),
			childs: [
				{
					label: "Edit",
					icon: "pi pi-pencil",
					command: (e: any) => {
						const ref = this.dialogService.open(EnzoOperationDialogComponent, {
							data: e.item.data,
							header: 'Update operation',
							width: '70%'
						});
					}
				}
			]
		}
	];
	
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
	]
}




import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { MbsAssetDto, MbsAssetResourceService} from '@mbs-main';
import { DialogService } from "primeng/dynamicdialog";
import { EnzoAssetDialogComponent } from "../asset-dialog/asset-dialog.component";

@Component({
	selector: 'enzo-asset-detail-page',
	templateUrl: './asset-detail-page.component.html',
	styleUrls: ['./asset-detail-page.component.scss']
})
export class EnzoAssetDetailPageComponent implements OnInit {
	id: number;

	constructor(
		private resourceService: MbsAssetResourceService,
		private route: ActivatedRoute,
		private router: Router,
		private dialogService: DialogService,
	) {
		var id = route.snapshot.paramMap.get('id');
		if(id === null) throw new Error('Not valid Id');
		this.id = +id;
		this.onLoad();
	}

	ngOnInit(): void {
		this.router.events
			.subscribe((e: any) => {
				if (e instanceof NavigationEnd) {
					this.onLoad();
				}
			});
	}

	assetDto: MbsAssetDto;

	onLoad() {
		this.assetDto = this.route.snapshot.data['asset'];
	} 

	async reloadPage() {
		if(this.assetDto.id === undefined) return;
		this.assetDto = await lastValueFrom(this.resourceService.getAssetUsingGET(this.assetDto.id));
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
}




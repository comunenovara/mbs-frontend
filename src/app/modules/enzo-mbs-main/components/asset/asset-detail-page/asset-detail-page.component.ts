import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { MbsAssetDTO, MbsAssetResourceService } from '@mbs-main';

@Component({
	selector: 'enzo-asset-detail-page',
	templateUrl: './asset-detail-page.component.html',
	styleUrls: ['./asset-detail-page.component.scss']
})
export class EnzoAssetDetailPageComponent implements OnInit {
	id: number;

	constructor(
		private resourceService: MbsAssetResourceService,
		public router: Router,
		private route: ActivatedRoute
	) {
		var id = route.snapshot.paramMap.get('id');
		if (id === null) throw new Error('Not valid Id');
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

	assetDTO: MbsAssetDTO;

	onLoad() {
		this.assetDTO = this.route.snapshot.data['asset'];
	}

	async reloadPage() {
		if (this.assetDTO.id === undefined) return;
		this.assetDTO = await lastValueFrom(this.resourceService.getAssetUsingGET(this.assetDTO.id));
	}

	/*editAsset(asset: AssetDTO) {
		//this.dialog.open(EnzoAssetNewUpdateDialogComponent, { data: { asset: asset } });
	}
	*/
	async deleteAsset(asset: MbsAssetDTO) {
		console.log("delete", asset);
	}
}




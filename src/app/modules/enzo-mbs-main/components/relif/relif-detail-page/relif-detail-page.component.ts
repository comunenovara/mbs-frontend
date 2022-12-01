import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { MbsRelifDto, MbsRelifResourceService} from '@mbs-main';

@Component({
	selector: 'enzo-relif-detail-page',
	templateUrl: './relif-detail-page.component.html',
	styleUrls: ['./relif-detail-page.component.scss']
})
export class EnzoRelifDetailPageComponent implements OnInit {
	id: number;

	constructor(
		private resourceService: MbsRelifResourceService,
		private route: ActivatedRoute,
		private router: Router,
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

	relifDto: MbsRelifDto;

	onLoad() {
		this.relifDto = this.route.snapshot.data['relif'];
	} 

	async reloadPage() {
		if(this.relifDto.id === undefined) return;
		this.relifDto = await lastValueFrom(this.resourceService.getRelifUsingGET(this.relifDto.id));
	}

	/*editRelif(relif: RelifDto) {
		//this.dialog.open(EnzoRelifNewUpdateDialogComponent, { data: { relif: relif } });
	}
	*/

	async deleteRelif(relifDto: MbsRelifDto) {
	
	}
}




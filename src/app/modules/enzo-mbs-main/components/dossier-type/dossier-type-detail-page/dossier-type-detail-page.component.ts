import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { MbsDossierTypeDto, MbsDossierTypeResourceService} from '@mbs-main';

@Component({
	selector: 'enzo-dossier-type-detail-page',
	templateUrl: './dossier-type-detail-page.component.html',
	styleUrls: ['./dossier-type-detail-page.component.scss']
})
export class EnzoDossierTypeDetailPageComponent implements OnInit {
	id: number;

	constructor(
		private resourceService: MbsDossierTypeResourceService,
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

	dossierTypeDto: MbsDossierTypeDto;

	onLoad() {
		this.dossierTypeDto = this.route.snapshot.data['dossierType'];
	} 

	async reloadPage() {
		if(this.dossierTypeDto.id === undefined) return;
		this.dossierTypeDto = await lastValueFrom(this.resourceService.getDossierTypeUsingGET(this.dossierTypeDto.id));
	}

	/*editDossierType(dossierType: DossierTypeDto) {
		//this.dialog.open(EnzoDossierTypeNewUpdateDialogComponent, { data: { dossierType: dossierType } });
	}
	*/

	async deleteDossierType(dossierTypeDto: MbsDossierTypeDto) {
	
	}
}




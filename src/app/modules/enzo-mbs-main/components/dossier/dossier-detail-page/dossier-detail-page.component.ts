import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { MbsDossierDto, MbsDossierResourceService} from '@mbs-main';

@Component({
	selector: 'enzo-dossier-detail-page',
	templateUrl: './dossier-detail-page.component.html',
	styleUrls: ['./dossier-detail-page.component.scss']
})
export class EnzoDossierDetailPageComponent implements OnInit {
	id: number;

	constructor(
		private resourceService: MbsDossierResourceService,
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

	dossierDto: MbsDossierDto;

	onLoad() {
		this.dossierDto = this.route.snapshot.data['dossier'];
	} 

	async reloadPage() {
		if(this.dossierDto.id === undefined) return;
		this.dossierDto = await lastValueFrom(this.resourceService.getDossierUsingGET(this.dossierDto.id));
	}

	/*editDossier(dossier: DossierDto) {
		//this.dialog.open(EnzoDossierNewUpdateDialogComponent, { data: { dossier: dossier } });
	}
	*/

	async deleteDossier(dossierDto: MbsDossierDto) {
	
	}
}




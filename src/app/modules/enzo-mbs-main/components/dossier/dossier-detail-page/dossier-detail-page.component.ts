import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { MbsDossierDTO, MbsDossierResourceService} from '@mbs-main';

@Component({
	selector: 'enzo-dossier-detail-page',
	templateUrl: './dossier-detail-page.component.html',
	styleUrls: ['./dossier-detail-page.component.scss']
})
export class EnzoDossierDetailPageComponent {
	constructor(
		private resourceService: MbsDossierResourceService,
		private route: ActivatedRoute
	) {
		var id = route.snapshot.paramMap.get('id');
		if(id === null) throw new Error('Not valid Id');
		this.id = +id;
		this.onLoad();
	}

	id: number;
	dossierDTO: MbsDossierDTO;

	onLoad() {
		this.dossierDTO = this.route.snapshot.data['dossier'];
	} 

	async reloadPage() {
		if(this.dossierDTO.id === undefined) return;
		this.dossierDTO = await lastValueFrom(this.resourceService.getDossierUsingGET(this.dossierDTO.id));
	}

	/*editDossier(dossier: DossierDTO) {
		//this.dialog.open(EnzoDossierNewUpdateDialogComponent, { data: { dossier: dossier } });
	}

	async deleteDossier(dossierDTO: DossierDTO) {
	
	}*/
}




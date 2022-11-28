import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { MbsDossierTypeDTO, MbsDossierTypeResourceService} from '@mbs-main';

@Component({
	selector: 'enzo-dossier-type-detail-page',
	templateUrl: './dossier-type-detail-page.component.html',
	styleUrls: ['./dossier-type-detail-page.component.scss']
})
export class EnzoDossierTypeDetailPageComponent {
	constructor(
		private resourceService: MbsDossierTypeResourceService,
		private route: ActivatedRoute
	) {
		var id = route.snapshot.paramMap.get('id');
		if(id === null) throw new Error('Not valid Id');
		this.id = +id;
		this.onLoad();
	}

	id: number;
	dossierTypeDTO: MbsDossierTypeDTO;

	onLoad() {
		this.dossierTypeDTO = this.route.snapshot.data['dossierType'];
	} 

	async reloadPage() {
		if(this.dossierTypeDTO.id === undefined) return;
		this.dossierTypeDTO = await lastValueFrom(this.resourceService.getDossierTypeUsingGET(this.dossierTypeDTO.id));
	}

	/*editDossierType(dossierType: DossierTypeDTO) {
		//this.dialog.open(EnzoDossierTypeNewUpdateDialogComponent, { data: { dossierType: dossierType } });
	}

	async deleteDossierType(dossierTypeDTO: DossierTypeDTO) {
	
	}*/
}




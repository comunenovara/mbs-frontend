import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { MbsRelifDTO, MbsRelifResourceService} from '@mbs-main';

@Component({
	selector: 'enzo-relif-detail-page',
	templateUrl: './relif-detail-page.component.html',
	styleUrls: ['./relif-detail-page.component.scss']
})
export class EnzoRelifDetailPageComponent {
	constructor(
		private resourceService: MbsRelifResourceService,
		private route: ActivatedRoute
	) {
		var id = route.snapshot.paramMap.get('id');
		if(id === null) throw new Error('Not valid Id');
		this.id = +id;
		this.onLoad();
	}

	id: number;
	relifDTO: MbsRelifDTO;

	onLoad() {
		this.relifDTO = this.route.snapshot.data['relif'];
	} 

	async reloadPage() {
		if(this.relifDTO.id === undefined) return;
		this.relifDTO = await lastValueFrom(this.resourceService.getRelifUsingGET(this.relifDTO.id));
	}

	/*editRelif(relif: RelifDTO) {
		//this.dialog.open(EnzoRelifNewUpdateDialogComponent, { data: { relif: relif } });
	}

	async deleteRelif(relifDTO: RelifDTO) {
	
	}*/
}




import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { MbsOperationDTO, MbsOperationResourceService} from '@mbs-main';

@Component({
	selector: 'enzo-operation-detail-page',
	templateUrl: './operation-detail-page.component.html',
	styleUrls: ['./operation-detail-page.component.scss']
})
export class EnzoOperationDetailPageComponent {
	constructor(
		private resourceService: MbsOperationResourceService,
		private route: ActivatedRoute
	) {
		var id = route.snapshot.paramMap.get('id');
		if(id === null) throw new Error('Not valid Id');
		this.id = +id;
		this.onLoad();
	}

	id: number;
	operationDTO: MbsOperationDTO;

	onLoad() {
		this.operationDTO = this.route.snapshot.data['operation'];
	} 

	async reloadPage() {
		if(this.operationDTO.id === undefined) return;
		this.operationDTO = await lastValueFrom(this.resourceService.getOperationUsingGET(this.operationDTO.id));
	}

	/*editOperation(operation: OperationDTO) {
		//this.dialog.open(EnzoOperationNewUpdateDialogComponent, { data: { operation: operation } });
	}

	async deleteOperation(operationDTO: OperationDTO) {
	
	}*/
}




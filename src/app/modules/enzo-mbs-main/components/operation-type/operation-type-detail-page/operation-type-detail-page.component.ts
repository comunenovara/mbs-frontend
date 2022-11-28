import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { MbsOperationTypeDTO, MbsOperationTypeResourceService} from '@mbs-main';

@Component({
	selector: 'enzo-operation-type-detail-page',
	templateUrl: './operation-type-detail-page.component.html',
	styleUrls: ['./operation-type-detail-page.component.scss']
})
export class EnzoOperationTypeDetailPageComponent {
	constructor(
		private resourceService: MbsOperationTypeResourceService,
		private route: ActivatedRoute
	) {
		var id = route.snapshot.paramMap.get('id');
		if(id === null) throw new Error('Not valid Id');
		this.id = +id;
		this.onLoad();
	}

	id: number;
	operationTypeDTO: MbsOperationTypeDTO;

	onLoad() {
		this.operationTypeDTO = this.route.snapshot.data['operationType'];
	} 

	async reloadPage() {
		if(this.operationTypeDTO.id === undefined) return;
		this.operationTypeDTO = await lastValueFrom(this.resourceService.getOperationTypeUsingGET(this.operationTypeDTO.id));
	}

	/*editOperationType(operationType: OperationTypeDTO) {
		//this.dialog.open(EnzoOperationTypeNewUpdateDialogComponent, { data: { operationType: operationType } });
	}

	async deleteOperationType(operationTypeDTO: OperationTypeDTO) {
	
	}*/
}




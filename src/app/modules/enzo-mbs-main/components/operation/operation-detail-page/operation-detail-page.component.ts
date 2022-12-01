import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { MbsOperationDto, MbsOperationResourceService} from '@mbs-main';

@Component({
	selector: 'enzo-operation-detail-page',
	templateUrl: './operation-detail-page.component.html',
	styleUrls: ['./operation-detail-page.component.scss']
})
export class EnzoOperationDetailPageComponent implements OnInit {
	id: number;

	constructor(
		private resourceService: MbsOperationResourceService,
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

	operationDto: MbsOperationDto;

	onLoad() {
		this.operationDto = this.route.snapshot.data['operation'];
	} 

	async reloadPage() {
		if(this.operationDto.id === undefined) return;
		this.operationDto = await lastValueFrom(this.resourceService.getOperationUsingGET(this.operationDto.id));
	}

	/*editOperation(operation: OperationDto) {
		//this.dialog.open(EnzoOperationNewUpdateDialogComponent, { data: { operation: operation } });
	}
	*/

	async deleteOperation(operationDto: MbsOperationDto) {
	
	}
}




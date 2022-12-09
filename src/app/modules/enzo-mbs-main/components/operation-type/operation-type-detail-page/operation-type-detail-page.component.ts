import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { DialogService } from 'primeng/dynamicdialog';

import { TabManagerService } from "@tabler/services/tab-manager.service";

import { MbsOperationTypeDto, MbsOperationTypeResourceService} from '@mbs-main';
import { EnzoOperationTypeDialogComponent } from '../operation-type-dialog/operation-type-dialog.component';

@Component({
	selector: 'enzo-operation-type-detail-page',
	templateUrl: './operation-type-detail-page.component.html',
	styleUrls: ['./operation-type-detail-page.component.scss']
})
export class EnzoOperationTypeDetailPageComponent implements OnInit {
	id: number;

	constructor(
		private resourceService: MbsOperationTypeResourceService,
		private route: ActivatedRoute,
		private router: Router,
		private dialogService: DialogService,
		public tabManagerService: TabManagerService,
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

	operationTypeDto: MbsOperationTypeDto;

	onLoad() {
		this.operationTypeDto = this.route.snapshot.data['operationType'];
	} 

	async reloadPage() {
		if(this.operationTypeDto.id === undefined) return;
		this.operationTypeDto = await lastValueFrom(this.resourceService.getOperationTypeUsingGET(this.operationTypeDto.id));
	}

	editOperationType(operationType: MbsOperationTypeDto) {
		const ref = this.dialogService.open(EnzoOperationTypeDialogComponent, {
			data: operationType,
			header: 'Update operationType',
			width: '70%'
		});
	}

	async deleteOperationType(operationType: MbsOperationTypeDto) {
		if(operationType.id === undefined) return;
		await lastValueFrom(this.resourceService.deleteOperationTypeUsingDELETE(operationType.id));
	}
}




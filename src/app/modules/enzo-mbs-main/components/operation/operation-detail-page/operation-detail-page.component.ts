import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { DialogService } from 'primeng/dynamicdialog';

import { MbsOperationDto, MbsOperationResourceService} from '@mbs-main';
import { EnzoOperationDialogComponent } from '../operation-dialog/operation-dialog.component';

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
		private dialogService: DialogService,
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

	editOperation(operation: MbsOperationDto) {
		const ref = this.dialogService.open(EnzoOperationDialogComponent, {
			data: operation,
			header: 'Update operation',
			width: '70%'
		});
	}

	async deleteOperation(operation: MbsOperationDto) {
		if(operation.id === undefined) return;
		await lastValueFrom(this.resourceService.deleteOperationUsingDELETE(operation.id));
	}
}




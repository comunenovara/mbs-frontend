import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { DialogService } from 'primeng/dynamicdialog';

import { MbsRelifDto, MbsRelifResourceService} from '@mbs-main';
import { EnzoRelifDialogComponent } from '../relif-dialog/relif-dialog.component';

@Component({
	selector: 'enzo-relif-detail-page',
	templateUrl: './relif-detail-page.component.html',
	styleUrls: ['./relif-detail-page.component.scss']
})
export class EnzoRelifDetailPageComponent implements OnInit {
	id: number;

	constructor(
		private resourceService: MbsRelifResourceService,
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

	relifDto: MbsRelifDto;

	onLoad() {
		this.relifDto = this.route.snapshot.data['relif'];
	} 

	async reloadPage() {
		if(this.relifDto.id === undefined) return;
		this.relifDto = await lastValueFrom(this.resourceService.getRelifUsingGET(this.relifDto.id));
	}

	editRelif(relif: MbsRelifDto) {
		const ref = this.dialogService.open(EnzoRelifDialogComponent, {
			data: relif,
			header: 'Update relif',
			width: '70%'
		});
	}

	async deleteRelif(relif: MbsRelifDto) {
		if(relif.id === undefined) return;
		await lastValueFrom(this.resourceService.deleteRelifUsingDELETE(relif.id));
	}
}




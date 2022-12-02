import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { DialogService } from 'primeng/dynamicdialog';

import { MbsDossierTypeDto, MbsDossierTypeResourceService} from '@mbs-main';
import { EnzoDossierTypeDialogComponent } from '../dossier-type-dialog/dossier-type-dialog.component';

@Component({
	selector: 'enzo-dossier-type-detail-page',
	templateUrl: './dossier-type-detail-page.component.html',
	styleUrls: ['./dossier-type-detail-page.component.scss']
})
export class EnzoDossierTypeDetailPageComponent implements OnInit {
	id: number;

	constructor(
		private resourceService: MbsDossierTypeResourceService,
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

	dossierTypeDto: MbsDossierTypeDto;

	onLoad() {
		this.dossierTypeDto = this.route.snapshot.data['dossierType'];
	} 

	async reloadPage() {
		if(this.dossierTypeDto.id === undefined) return;
		this.dossierTypeDto = await lastValueFrom(this.resourceService.getDossierTypeUsingGET(this.dossierTypeDto.id));
	}

	editDossierType(dossierType: MbsDossierTypeDto) {
		const ref = this.dialogService.open(EnzoDossierTypeDialogComponent, {
			data: dossierType,
			header: 'Update asset',
			width: '70%'
		});
	}

	async deleteDossierType(dossierType: MbsDossierTypeDto) {
		if(dossierType.id === undefined) return;
		await lastValueFrom(this.resourceService.deleteDossierTypeUsingDELETE(dossierType.id));
	}
}




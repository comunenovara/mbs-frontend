import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { DialogService } from 'primeng/dynamicdialog';

import { MbsDossierDto, MbsDossierResourceService} from '@mbs-main';
import { EnzoDossierDialogComponent } from '../dossier-dialog/dossier-dialog.component';

@Component({
	selector: 'enzo-dossier-detail-page',
	templateUrl: './dossier-detail-page.component.html',
	styleUrls: ['./dossier-detail-page.component.scss']
})
export class EnzoDossierDetailPageComponent implements OnInit {
	id: number;

	constructor(
		private resourceService: MbsDossierResourceService,
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

	dossierDto: MbsDossierDto;

	onLoad() {
		this.dossierDto = this.route.snapshot.data['dossier'];
	} 

	async reloadPage() {
		if(this.dossierDto.id === undefined) return;
		this.dossierDto = await lastValueFrom(this.resourceService.getDossierUsingGET(this.dossierDto.id));
	}

	editDossier(dossier: MbsDossierDto) {
		const ref = this.dialogService.open(EnzoDossierDialogComponent, {
			data: dossier,
			header: 'Update asset',
			width: '70%'
		});
	}

	async deleteDossier(dossier: MbsDossierDto) {
		if(dossier.id === undefined) return;
		await lastValueFrom(this.resourceService.deleteDossierUsingDELETE(dossier.id));
	}
}




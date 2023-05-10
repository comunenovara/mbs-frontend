import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { DialogService } from 'primeng/dynamicdialog';

import { StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { EngeAppCommonService, EngeAppGenericDetailPageComponent } from "@enge/common-app";

import { MbsNominaDto, MbsNominaResourceService} from '@mbs-work';
import { EnzoNominaDialogComponent } from '../nomina-dialog/nomina-dialog.component';

@Component({
	selector: 'enzo-nomina-detail-page',
	templateUrl: './nomina-detail-page.component.html',
	styleUrls: ['./nomina-detail-page.component.scss']
})
export class EnzoNominaDetailPageComponent extends EngeAppGenericDetailPageComponent {
	constructor(
		eacs: EngeAppCommonService,
		route: ActivatedRoute,
		//public tabManagerService: TabManagerService,
		private dialogService: DialogService,
		private resourceService: MbsNominaResourceService,
	) { super(eacs, route); }

	nominaDto: MbsNominaDto;

	override onLoad() {
		this.nominaDto = this.route.snapshot.data['nomina'];
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "nomina") this.reloadPage();
	}

	override async reloadPage() {
		this.nominaDto = await lastValueFrom(this.resourceService.getNominaUsingGET(this.id));
	}

	editNomina(nomina: MbsNominaDto) {
		const ref = this.dialogService.open(EnzoNominaDialogComponent, {
			data: { nomina: nomina },
			header: 'Update nomina',
			width: '70%'
		});
	}

	async deleteNomina(nomina: MbsNominaDto) {
		if(nomina.id === undefined) return;
		await lastValueFrom(this.resourceService.deleteNominaUsingDELETE(nomina.id));
	}

}




import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { DialogService } from 'primeng/dynamicdialog';

import { StalEventerService, StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { EngeAppGenericDetailPageComponent } from "@enge/common-app";

import { MbsCompanyDto, MbsCompanyResourceService} from '@mbs-work';
import { EnzoCompanyDialogComponent } from '../company-dialog/company-dialog.component';
import { EnzoAssignementDialogComponent } from "../../assignement/assignement-dialog/assignement-dialog.component";

@Component({
	selector: 'enzo-company-detail-page',
	templateUrl: './company-detail-page.component.html',
	styleUrls: ['./company-detail-page.component.scss']
})
export class EnzoCompanyDetailPageComponent extends EngeAppGenericDetailPageComponent {
	constructor(
		route: ActivatedRoute,
		router: Router,
		eventer: StalEventerService,
		//public tabManagerService: TabManagerService,
		private dialogService: DialogService,
		private resourceService: MbsCompanyResourceService,
	) { super(route, router, eventer); }

	companyDto: MbsCompanyDto;

	override onLoad() {
		this.companyDto = this.route.snapshot.data['company'];
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "company") this.reloadPage();
	}

	override async reloadPage() {
		this.companyDto = await lastValueFrom(this.resourceService.getCompanyUsingGET(this.id));
	}

	editCompany(company: MbsCompanyDto) {
		const ref = this.dialogService.open(EnzoCompanyDialogComponent, {
			data: { company: company },
			header: 'Update company',
			width: '70%'
		});
	}

	async deleteCompany(company: MbsCompanyDto) {
		if(company.id === undefined) return;
		await lastValueFrom(this.resourceService.deleteCompanyUsingDELETE(company.id));
	}

	createNewAssignement(companyDto: MbsCompanyDto) {
		this.dialogService.open(EnzoAssignementDialogComponent, {
			header: 'Create Assignement',
			width: '70%',
			data: {
				company: companyDto
			}
		});
	}

	protected assignementTableButtons: any[] = [
		{
			label: "Dettagli",
			hideLabel: true,
			icon: "pi pi-search",
			severity: "secondary",
			class: "p-button-sm p-button-outlined",
			link: "../../../assignement/detail",
			//command: (e: any) => this.tabManagerService.openInCard(),
		}
	];
	protected assignementListPaginator: StalPaginator = {
		page: 0,
		size: 10
	};
	protected assignementCount: number;

}




import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { DialogService } from 'primeng/dynamicdialog';

import { StalEventerService, StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { EngeAppGenericDetailPageComponent, EngeAppCommonService } from "@enge/common-app";

import { MbsWorkCategoryDto, MbsWorkCategoryResourceService} from '@mbs-work';
import { EnzoWorkCategoryDialogComponent } from '../work-category-dialog/work-category-dialog.component';
import { EnzoAssignementDialogComponent } from "../../assignement/assignement-dialog/assignement-dialog.component";

@Component({
	selector: 'enzo-work-category-detail-page',
	templateUrl: './work-category-detail-page.component.html',
	styleUrls: ['./work-category-detail-page.component.scss']
})
export class EnzoWorkCategoryDetailPageComponent extends EngeAppGenericDetailPageComponent {
	constructor(
		eacs: EngeAppCommonService,
		//public tabManagerService: TabManagerService,
		private dialogService: DialogService,
		private resourceService: MbsWorkCategoryResourceService,
	) { super(eacs); }

	workCategoryDto: MbsWorkCategoryDto;

	override onLoad() {
		this.workCategoryDto = this.eacs.route.snapshot.data['workCategory'];
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "workCategory") this.reloadPage();
	}

	override async reloadPage() {
		this.workCategoryDto = await lastValueFrom(this.resourceService.getWorkCategoryUsingGET(this.id));
	}

	editWorkCategory(workCategory: MbsWorkCategoryDto) {
		const ref = this.dialogService.open(EnzoWorkCategoryDialogComponent, {
			data: { workCategory: workCategory },
			header: 'Update workCategory',
			width: '70%'
		});
	}

	async deleteWorkCategory(workCategory: MbsWorkCategoryDto) {
		if(workCategory.id === undefined) return;
		await lastValueFrom(this.resourceService.deleteWorkCategoryUsingDELETE(workCategory.id));
	}

	createNewAssignement(workCategoryDto: MbsWorkCategoryDto) {
		this.dialogService.open(EnzoAssignementDialogComponent, {
			header: 'Create Assignement',
			width: '70%',
			data: {
				workCategory: workCategoryDto
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




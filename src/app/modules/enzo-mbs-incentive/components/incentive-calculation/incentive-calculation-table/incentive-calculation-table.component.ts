import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { DialogService } from 'primeng/dynamicdialog';

import { StalEventerService, StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { MbsIncentiveCalculationResourceService, MbsRoleDto, MbsRoleResourceService, MbsRoleValueDto, MbsRoleValueResourceService, MbsStageDto, MbsStageResourceService } from '@mbs-incentive';
import { EnzoIncentiveCalculationDialogComponent } from '../incentive-calculation-dialog/incentive-calculation-dialog.component';
import { EngeAppCommonService, EngeAppGenericDetailPageComponent } from '@enge/common-app';

@Component({
	selector: 'enzo-incentive-calculation-table',
	templateUrl: './incentive-calculation-table.component.html',
	styleUrls: ['./incentive-calculation-table.component.scss']
})
export class EnzoIncentiveCalculationTableComponent extends EngeAppGenericDetailPageComponent {
	constructor(
		eacs: EngeAppCommonService,
		route: ActivatedRoute,
		//public tabManagerService: TabManagerService,
		private stageResourceService: MbsStageResourceService,
		private roleResourceService: MbsRoleResourceService,
		private roleValueResourceService: MbsRoleValueResourceService,
		private incentiveCalculationResourceService: MbsIncentiveCalculationResourceService,
	) { super(eacs, route); }

	
	override onLoad() {
		this.loadTable();
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "incentiveCalculation") this.reloadPage();
	}

	override async reloadPage() {
		
	}

	lote: any = {};

	stages: MbsStageDto[];
	roles: MbsRoleDto[];
	roleValues: MbsRoleValueDto[];

	async loadTable() {
		console.log("joooooooooooooo");
		this.lote = {};

		this.stages = await lastValueFrom(this.stageResourceService.getAllStagesUsingGET({regulationIdEquals:1}));
		this.roleValues = await lastValueFrom(this.roleValueResourceService.getAllRoleValuesUsingGET({"stage.regulationIdEquals":1}));

		
		for(let roleValue of this.roleValues) {
			if(!roleValue.stageId) continue
			if(!roleValue.role) continue

			if(!this.lote[roleValue.stageId])
				this.lote[roleValue.stageId] = []

			this.lote[roleValue.stageId].push(roleValue);
		}
		
	}
}
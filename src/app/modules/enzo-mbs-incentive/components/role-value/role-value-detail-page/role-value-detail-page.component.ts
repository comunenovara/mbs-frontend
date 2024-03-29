import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { DialogService } from 'primeng/dynamicdialog';

import { StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { EngeAppCommonService, EngeAppGenericDetailPageComponent } from "@enge/common-app";

import { MbsRoleValueDto, MbsRoleValueResourceService} from '@mbs-incentive';
import { EnzoRoleValueDialogComponent } from '../role-value-dialog/role-value-dialog.component';
import { EnzoIncentiveRoleValueDialogComponent } from "../../incentive-role-value/incentive-role-value-dialog/incentive-role-value-dialog.component";

@Component({
	selector: 'enzo-role-value-detail-page',
	templateUrl: './role-value-detail-page.component.html',
	styleUrls: ['./role-value-detail-page.component.scss']
})
export class EnzoRoleValueDetailPageComponent extends EngeAppGenericDetailPageComponent {
	constructor(
		eacs: EngeAppCommonService,
		route: ActivatedRoute,
		//public tabManagerService: TabManagerService,
		private dialogService: DialogService,
		private resourceService: MbsRoleValueResourceService,
	) { super(eacs, route); }

	roleValueDto: MbsRoleValueDto;

	override onLoad() {
		this.roleValueDto = this.route.snapshot.data['roleValue'];
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "roleValue") this.reloadPage();
	}

	override async reloadPage() {
		this.roleValueDto = await lastValueFrom(this.resourceService.getRoleValueUsingGET(this.id));
	}

	editRoleValue(roleValue: MbsRoleValueDto) {
		const ref = this.dialogService.open(EnzoRoleValueDialogComponent, {
			data: { roleValue: roleValue },
			header: 'Update roleValue',
			width: '70%'
		});
	}

	async deleteRoleValue(roleValue: MbsRoleValueDto) {
		if(roleValue.id === undefined) return;
		await lastValueFrom(this.resourceService.deleteRoleValueUsingDELETE(roleValue.id));
	}

	createNewIncentiveRoleValue(roleValueDto: MbsRoleValueDto) {
		this.dialogService.open(EnzoIncentiveRoleValueDialogComponent, {
			header: 'Create IncentiveRoleValue',
			width: '70%',
			data: {
				roleValue: roleValueDto
			}
		});
	}

	protected incentiveRoleValueTableButtons: any[] = [
		{
			label: "Dettagli",
			hideLabel: true,
			icon: "pi pi-search",
			severity: "secondary",
			class: "p-button-sm p-button-outlined",
			link: "../../../incentive-role-value/detail",
			//command: (e: any) => this.tabManagerService.openInCard(),
		}
	];
	protected incentiveRoleValueListPaginator: StalPaginator = {
		page: 0,
		size: 10
	};
	protected incentiveRoleValueCount: number;

}




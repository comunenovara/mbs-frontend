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

}




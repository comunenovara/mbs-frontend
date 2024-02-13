import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { DialogService } from 'primeng/dynamicdialog';

import { StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { EngeAppCommonService, EngeAppGenericDetailPageComponent } from "@enge/common-app";

import { MbsRoleDto, MbsRoleResourceService} from '@mbs-incentive';
import { EnzoRoleDialogComponent } from '../role-dialog/role-dialog.component';
import { EnzoRoleValueDialogComponent } from "../../role-value/role-value-dialog/role-value-dialog.component";

@Component({
	selector: 'enzo-role-detail-page',
	templateUrl: './role-detail-page.component.html',
	styleUrls: ['./role-detail-page.component.scss']
})
export class EnzoRoleDetailPageComponent extends EngeAppGenericDetailPageComponent {
	constructor(
		eacs: EngeAppCommonService,
		route: ActivatedRoute,
		//public tabManagerService: TabManagerService,
		private dialogService: DialogService,
		private resourceService: MbsRoleResourceService,
	) { super(eacs, route); }

	roleDto: MbsRoleDto;

	override onLoad() {
		this.roleDto = this.route.snapshot.data['role'];
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "role") this.reloadPage();
	}

	override async reloadPage() {
		this.roleDto = await lastValueFrom(this.resourceService.getRoleUsingGET(this.id));
	}

	editRole(role: MbsRoleDto) {
		const ref = this.dialogService.open(EnzoRoleDialogComponent, {
			data: { role: role },
			header: 'Update role',
			width: '70%'
		});
	}

	async deleteRole(role: MbsRoleDto) {
		if(role.id === undefined) return;
		await lastValueFrom(this.resourceService.deleteRoleUsingDELETE(role.id));
	}

	createNewRoleValue(roleDto: MbsRoleDto) {
		this.dialogService.open(EnzoRoleValueDialogComponent, {
			header: 'Create RoleValue',
			width: '70%',
			data: {
				role: roleDto
			}
		});
	}

	protected roleValueTableButtons: any[] = [
		{
			label: "Dettagli",
			hideLabel: true,
			icon: "pi pi-search",
			severity: "secondary",
			class: "p-button-sm p-button-outlined",
			link: "../../../role-value/detail",
			//command: (e: any) => this.tabManagerService.openInCard(),
		}
	];
	protected roleValueListPaginator: StalPaginator = {
		page: 0,
		size: 10
	};
	protected roleValueCount: number;

}




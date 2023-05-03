import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { DialogService } from 'primeng/dynamicdialog';

import { StalEventerService, StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { EngeAppGenericDetailPageComponent, EngeAppCommonService } from "@enge/common-app";

import { MbsEmployeeDto, MbsEmployeeResourceService} from '@mbs-work';
import { EnzoEmployeeDialogComponent } from '../employee-dialog/employee-dialog.component';
import { EnzoAssignementDialogComponent } from "../../assignement/assignement-dialog/assignement-dialog.component";

@Component({
	selector: 'enzo-employee-detail-page',
	templateUrl: './employee-detail-page.component.html',
	styleUrls: ['./employee-detail-page.component.scss']
})
export class EnzoEmployeeDetailPageComponent extends EngeAppGenericDetailPageComponent {
	constructor(
		eacs: EngeAppCommonService,
		//public tabManagerService: TabManagerService,
		private dialogService: DialogService,
		private resourceService: MbsEmployeeResourceService,
	) { super(eacs); }

	employeeDto: MbsEmployeeDto;

	override onLoad() {
		this.employeeDto = this.eacs.route.snapshot.data['employee'];
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "employee") this.reloadPage();
	}

	override async reloadPage() {
		this.employeeDto = await lastValueFrom(this.resourceService.getEmployeeUsingGET(this.id));
	}

	editEmployee(employee: MbsEmployeeDto) {
		const ref = this.dialogService.open(EnzoEmployeeDialogComponent, {
			data: { employee: employee },
			header: 'Update employee',
			width: '70%'
		});
	}

	async deleteEmployee(employee: MbsEmployeeDto) {
		if(employee.id === undefined) return;
		await lastValueFrom(this.resourceService.deleteEmployeeUsingDELETE(employee.id));
	}

	createNewAssignement(employeeDto: MbsEmployeeDto) {
		this.dialogService.open(EnzoAssignementDialogComponent, {
			header: 'Create Assignement',
			width: '70%',
			data: {
				employee: employeeDto
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




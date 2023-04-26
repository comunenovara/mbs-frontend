import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { lastValueFrom, Observable } from 'rxjs';

import { EngeCommonService, EngeEngeFormStep, EngeLibGenericForm, EngeValidator } from '@enge/common-lib';

import { MbsWorkAutocompleteService } from '@mbs-work/service/work-auto-complete.service';
import { MbsAssignementResourceService } from '@mbs-work/services/assignement.service';
import { MbsAssignementDto } from '@mbs-work/class/assignement-dto.class';
import { MbsProjectDto } from '@mbs-work/class/project-dto.class';
import { MbsRoleDto } from '@mbs-work/class/role-dto.class';
import { MbsWorkCategoryDto } from '@mbs-work/class/work-category-dto.class';
import { MbsEmployeeDto } from '@mbs-work/class/employee-dto.class';
import { MbsCompanyDto } from '@mbs-work/class/company-dto.class';

@Component({
	selector: 'mbs-assignement-new-update-form',
	templateUrl: './assignement-new-update-form.component.html',
	styleUrls: ['./assignement-new-update-form.component.scss']
})
export class MbsAssignementNewUpdateFormComponent extends EngeLibGenericForm {
	@Input() assignement: MbsAssignementDto | undefined;
	@Output() assignementOutput: EventEmitter<MbsAssignementDto> = new EventEmitter<MbsAssignementDto>();
	
	@Input() project: MbsProjectDto | undefined;
	@Input() role: MbsRoleDto | undefined;
	@Input() workCategory: MbsWorkCategoryDto | undefined;
	@Input() employee: MbsEmployeeDto | undefined;
	@Input() company: MbsCompanyDto | undefined;

	constructor(
		ecs: EngeCommonService,
		private _formBuilder: FormBuilder,
		private assignementResourceService: MbsAssignementResourceService, 
		protected mbsWorkAutocompleteService: MbsWorkAutocompleteService,
	) { super(ecs); }

	override loadVariables(): void {
		if(this.assignement !== undefined) {
			this.input = this.assignement;
			{
			}
		}
		this.output = this.assignementOutput;
	}

	_filteredProject: Observable<MbsProjectDto[]>;
	_filteredRole: Observable<MbsRoleDto[]>;
	_filteredWorkCategory: Observable<MbsWorkCategoryDto[]>;
	_filteredEmployee: Observable<MbsEmployeeDto[]>;
	_filteredCompany: Observable<MbsCompanyDto[]>;

	override loadForm(): void {
		this._newUpdateForm = this._formBuilder.group({
			id: [null],
			external: [false, [  ]],
			project: [this.project, [ EngeValidator.haveId,  ]],
			role: [this.role, [ EngeValidator.haveId,  ]],
			workCategory: [this.workCategory, [  ]],
			employee: [this.employee, [  ]],
			company: [this.company, [  ]],
		});

		this._filteredProject = this.mbsWorkAutocompleteService.filterProject(this._newUpdateForm.controls['project'].valueChanges);
		this._filteredRole = this.mbsWorkAutocompleteService.filterRole(this._newUpdateForm.controls['role'].valueChanges);
		this._filteredWorkCategory = this.mbsWorkAutocompleteService.filterWorkCategory(this._newUpdateForm.controls['workCategory'].valueChanges);
		this._filteredEmployee = this.mbsWorkAutocompleteService.filterEmployee(this._newUpdateForm.controls['employee'].valueChanges);
		this._filteredCompany = this.mbsWorkAutocompleteService.filterCompany(this._newUpdateForm.controls['company'].valueChanges);
	}

	override prepareResult(): MbsAssignementDto {
		let result: MbsAssignementDto = this._newUpdateForm.value;
		{
			result.projectId = (result.project != null) ? result.project.id : undefined;
			result.roleId = (result.role != null) ? result.role.id : undefined;
			result.workCategoryId = (result.workCategory != null) ? result.workCategory.id : undefined;
			result.employeeId = (result.employee != null) ? result.employee.id : undefined;
			result.companyId = (result.company != null) ? result.company.id : undefined;
		}
		return result;
	}

	override async sendToBackEnd(request: MbsAssignementDto) {
		try {
			let postOrPut: string;
			if (request.id != null && request.id > 0) {
				await lastValueFrom(this.assignementResourceService.updateAssignementUsingPUT(request));
				postOrPut = "updated";
			} else {
				request.id = undefined;
				await lastValueFrom(this.assignementResourceService.createAssignementUsingPOST(request));
				postOrPut = "created";
			}
			this._result = request;

			this.ecs.eventer.launchReloadContent("assignement");
			this.setStep(EngeEngeFormStep.COMPLETE);

		} catch (e: any) {
			this.ecs.eventer.launchMessage({
				severity: "error",
				text: e.error.message,
				duration: 5000
			});
			this.setStep(EngeEngeFormStep.FORM);
		}
	}

	protected newAssignement() {
		//this._assignement = null;
		this.assignementOutput.emit(this.assignement);
		this.setStep(EngeEngeFormStep.FORM);
	}
}
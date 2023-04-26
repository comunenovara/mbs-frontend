import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { lastValueFrom, Observable } from 'rxjs';

import { EngeCommonService, EngeEngeFormStep, EngeLibGenericForm, EngeValidator } from '@enge/common-lib';

import { MbsWorkAutocompleteService } from '@mbs-work/service/work-auto-complete.service';
import { MbsEmployeeResourceService } from '@mbs-work/services/employee.service';
import { MbsEmployeeDto } from '@mbs-work/class/employee-dto.class';

@Component({
	selector: 'mbs-employee-new-update-form',
	templateUrl: './employee-new-update-form.component.html',
	styleUrls: ['./employee-new-update-form.component.scss']
})
export class MbsEmployeeNewUpdateFormComponent extends EngeLibGenericForm {
	@Input() employee: MbsEmployeeDto | undefined;
	@Output() employeeOutput: EventEmitter<MbsEmployeeDto> = new EventEmitter<MbsEmployeeDto>();
	

	constructor(
		ecs: EngeCommonService,
		private _formBuilder: FormBuilder,
		private employeeResourceService: MbsEmployeeResourceService, 
		protected mbsWorkAutocompleteService: MbsWorkAutocompleteService,
	) { super(ecs); }

	override loadVariables(): void {
		if(this.employee !== undefined) {
			this.input = this.employee;
			{
			}
		}
		this.output = this.employeeOutput;
	}


	override loadForm(): void {
		this._newUpdateForm = this._formBuilder.group({
			id: [null],
			name: [null, [ Validators.required,  ]],
		});

	}

	override prepareResult(): MbsEmployeeDto {
		let result: MbsEmployeeDto = this._newUpdateForm.value;
		{
		}
		return result;
	}

	override async sendToBackEnd(request: MbsEmployeeDto) {
		try {
			let postOrPut: string;
			if (request.id != null && request.id > 0) {
				await lastValueFrom(this.employeeResourceService.updateEmployeeUsingPUT(request));
				postOrPut = "updated";
			} else {
				request.id = undefined;
				await lastValueFrom(this.employeeResourceService.createEmployeeUsingPOST(request));
				postOrPut = "created";
			}
			this._result = request;

			this.ecs.eventer.launchReloadContent("employee");
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

	protected newEmployee() {
		//this._employee = null;
		this.employeeOutput.emit(this.employee);
		this.setStep(EngeEngeFormStep.FORM);
	}
}
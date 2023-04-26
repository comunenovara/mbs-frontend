import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { lastValueFrom, Observable } from 'rxjs';

import { EngeCommonService, EngeEngeFormStep, EngeLibGenericForm, EngeValidator } from '@enge/common-lib';

import { MbsWorkAutocompleteService } from '@mbs-work/service/work-auto-complete.service';
import { MbsRoleResourceService } from '@mbs-work/services/role.service';
import { MbsRoleDto } from '@mbs-work/class/role-dto.class';

@Component({
	selector: 'mbs-role-new-update-form',
	templateUrl: './role-new-update-form.component.html',
	styleUrls: ['./role-new-update-form.component.scss']
})
export class MbsRoleNewUpdateFormComponent extends EngeLibGenericForm {
	@Input() role: MbsRoleDto | undefined;
	@Output() roleOutput: EventEmitter<MbsRoleDto> = new EventEmitter<MbsRoleDto>();
	

	constructor(
		ecs: EngeCommonService,
		private _formBuilder: FormBuilder,
		private roleResourceService: MbsRoleResourceService, 
		protected mbsWorkAutocompleteService: MbsWorkAutocompleteService,
	) { super(ecs); }

	override loadVariables(): void {
		if(this.role !== undefined) {
			this.input = this.role;
			{
			}
		}
		this.output = this.roleOutput;
	}


	override loadForm(): void {
		this._newUpdateForm = this._formBuilder.group({
			id: [null],
			name: [null, [ Validators.required,  ]],
			haveWorkCategory: [false, [  ]],
		});

	}

	override prepareResult(): MbsRoleDto {
		let result: MbsRoleDto = this._newUpdateForm.value;
		{
		}
		return result;
	}

	override async sendToBackEnd(request: MbsRoleDto) {
		try {
			let postOrPut: string;
			if (request.id != null && request.id > 0) {
				await lastValueFrom(this.roleResourceService.updateRoleUsingPUT(request));
				postOrPut = "updated";
			} else {
				request.id = undefined;
				await lastValueFrom(this.roleResourceService.createRoleUsingPOST(request));
				postOrPut = "created";
			}
			this._result = request;

			this.ecs.eventer.launchReloadContent("role");
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

	protected newRole() {
		//this._role = null;
		this.roleOutput.emit(this.role);
		this.setStep(EngeEngeFormStep.FORM);
	}
}
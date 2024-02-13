import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { lastValueFrom, Observable } from 'rxjs';

import { EngeCommonService, EngeEngeFormStep, EngeLibGenericForm, EngeValidator } from '@enge/common-lib';

import { MbsIncentiveAutocompleteService } from '@mbs-incentive/service/incentive-auto-complete.service';
import { MbsRoleValueResourceService } from '@mbs-incentive/services/role-value.service';
import { MbsRoleValueDto } from '@mbs-incentive/class/role-value-dto.class';
import { MbsStageDto } from '@mbs-incentive/class/stage-dto.class';
import { MbsRoleDto } from '@mbs-incentive/class/role-dto.class';

@Component({
	selector: 'mbs-role-value-new-update-form',
	templateUrl: './role-value-new-update-form.component.html',
	styleUrls: ['./role-value-new-update-form.component.scss']
})
export class MbsRoleValueNewUpdateFormComponent extends EngeLibGenericForm {
	@Input() roleValue: MbsRoleValueDto | undefined;
	@Output() roleValueOutput: EventEmitter<MbsRoleValueDto> = new EventEmitter<MbsRoleValueDto>();
	
	@Input() stage: MbsStageDto | undefined;
	@Input() role: MbsRoleDto | undefined;

	constructor(
		ecs: EngeCommonService,
		private _formBuilder: FormBuilder,
		private roleValueResourceService: MbsRoleValueResourceService, 
		protected mbsIncentiveAutocompleteService: MbsIncentiveAutocompleteService,
	) { super(ecs); }

	override loadVariables(): void {
		if(this.roleValue !== undefined) {
			this.input = this.roleValue;
			{
			}
		}
		this.output = this.roleValueOutput;
	}

	_filteredStage: Observable<MbsStageDto[]>;
	_filteredRole: Observable<MbsRoleDto[]>;

	override loadForm(): void {
		this._newUpdateForm = this._formBuilder.group({
			id: [null],
			min: [null, [  ]],
			maax: [null, [  ]],
			defaul: [null, [  ]],
			stage: [this.stage, [  ]],
			role: [this.role, [  ]],
		});

		this._filteredStage = this.mbsIncentiveAutocompleteService.filterStage(this._newUpdateForm.controls['stage'].valueChanges);
		this._filteredRole = this.mbsIncentiveAutocompleteService.filterRole(this._newUpdateForm.controls['role'].valueChanges);
	}

	override prepareResult(): MbsRoleValueDto {
		let result: MbsRoleValueDto = this._newUpdateForm.value;
		{
			result.min = (result.min != null) ? +result.min : null;
			result.maax = (result.maax != null) ? +result.maax : null;
			result.defaul = (result.defaul != null) ? +result.defaul : null;
			result.stageId = (result.stage != null) ? result.stage.id : undefined;
			result.roleId = (result.role != null) ? result.role.id : undefined;
		}
		return result;
	}

	override async sendToBackEnd(request: MbsRoleValueDto) {
		try {
			let postOrPut: string;
			if (request.id != null && request.id > 0) {
				await lastValueFrom(this.roleValueResourceService.updateRoleValueUsingPUT(request));
				postOrPut = "updated";
			} else {
				request.id = undefined;
				await lastValueFrom(this.roleValueResourceService.createRoleValueUsingPOST(request));
				postOrPut = "created";
			}
			this._result = request;

			this.ecs.eventer.launchReloadContent("roleValue");
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

	protected newRoleValue() {
		//this._roleValue = null;
		this.roleValueOutput.emit(this.roleValue);
		this.setStep(EngeEngeFormStep.FORM);
	}
}
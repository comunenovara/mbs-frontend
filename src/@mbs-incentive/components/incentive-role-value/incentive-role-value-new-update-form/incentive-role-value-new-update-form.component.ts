import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { lastValueFrom, Observable } from 'rxjs';

import { EngeCommonService, EngeEngeFormStep, EngeLibGenericForm, EngeValidator } from '@enge/common-lib';

import { MbsIncentiveAutocompleteService } from '@mbs-incentive/service/incentive-auto-complete.service';
import { MbsIncentiveRoleValueResourceService } from '@mbs-incentive/services/incentive-role-value.service';
import { MbsIncentiveRoleValueDto } from '@mbs-incentive/class/incentive-role-value-dto.class';
import { MbsIncentiveCalculationDto } from '@mbs-incentive/class/incentive-calculation-dto.class';
import { MbsRoleValueDto } from '@mbs-incentive/class/role-value-dto.class';

@Component({
	selector: 'mbs-incentive-role-value-new-update-form',
	templateUrl: './incentive-role-value-new-update-form.component.html',
	styleUrls: ['./incentive-role-value-new-update-form.component.scss']
})
export class MbsIncentiveRoleValueNewUpdateFormComponent extends EngeLibGenericForm {
	@Input() incentiveRoleValue: MbsIncentiveRoleValueDto | undefined;
	@Output() incentiveRoleValueOutput: EventEmitter<MbsIncentiveRoleValueDto> = new EventEmitter<MbsIncentiveRoleValueDto>();
	
	@Input() incentiveCalculation: MbsIncentiveCalculationDto | undefined;
	@Input() roleValue: MbsRoleValueDto | undefined;

	constructor(
		ecs: EngeCommonService,
		private _formBuilder: FormBuilder,
		private incentiveRoleValueResourceService: MbsIncentiveRoleValueResourceService, 
		protected mbsIncentiveAutocompleteService: MbsIncentiveAutocompleteService,
	) { super(ecs); }

	override loadVariables(): void {
		if(this.incentiveRoleValue !== undefined) {
			this.input = this.incentiveRoleValue;
			{
			}
		}
		this.output = this.incentiveRoleValueOutput;
	}

	_filteredIncentiveCalculation: Observable<MbsIncentiveCalculationDto[]>;
	_filteredRoleValue: Observable<MbsRoleValueDto[]>;

	override loadForm(): void {
		this._newUpdateForm = this._formBuilder.group({
			id: [null],
			value: [this.roleValue?.defaul, [ Validators.required,  ]],
			incentiveCalculation: [this.incentiveCalculation, [ EngeValidator.haveId,  ]],
			roleValue: [this.roleValue, [ EngeValidator.haveId,  ]],
		});

		this._filteredIncentiveCalculation = this.mbsIncentiveAutocompleteService.filterIncentiveCalculation(this._newUpdateForm.controls['incentiveCalculation'].valueChanges);
		this._filteredRoleValue = this.mbsIncentiveAutocompleteService.filterRoleValue(this._newUpdateForm.controls['roleValue'].valueChanges);
	}

	override prepareResult(): MbsIncentiveRoleValueDto {
		let result: MbsIncentiveRoleValueDto = this._newUpdateForm.value;
		{
			result.value = (result.value != null) ? +result.value : null;
			result.incentiveCalculationId = (result.incentiveCalculation != null) ? result.incentiveCalculation.id : undefined;
			result.roleValueId = (result.roleValue != null) ? result.roleValue.id : undefined;
		}
		return result;
	}

	override async sendToBackEnd(request: MbsIncentiveRoleValueDto) {
		try {
			let postOrPut: string;
			if (request.id != null && request.id > 0) {
				await lastValueFrom(this.incentiveRoleValueResourceService.updateIncentiveRoleValueUsingPUT(request));
				postOrPut = "updated";
			} else {
				request.id = undefined;
				await lastValueFrom(this.incentiveRoleValueResourceService.createIncentiveRoleValueUsingPOST(request));
				postOrPut = "created";
			}
			this._result = request;

			this.ecs.eventer.launchReloadContent("incentiveRoleValue");
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

	protected newIncentiveRoleValue() {
		//this._incentiveRoleValue = null;
		this.incentiveRoleValueOutput.emit(this.incentiveRoleValue);
		this.setStep(EngeEngeFormStep.FORM);
	}
}
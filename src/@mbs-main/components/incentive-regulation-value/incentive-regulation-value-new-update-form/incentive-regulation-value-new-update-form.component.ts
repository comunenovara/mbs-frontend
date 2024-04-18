import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { lastValueFrom, Observable } from 'rxjs';

import { EngeCommonService, EngeEngeFormStep, EngeLibGenericForm, EngeValidator } from '@enge/common-lib';

import { MbsMainAutocompleteService } from '@mbs-main/service/main-auto-complete.service';
import { MbsIncentiveRegulationValueResourceService } from '@mbs-main/services/incentive-regulation-value.service';
import { MbsIncentiveRegulationValueDto } from '@mbs-main/class/incentive-regulation-value-dto.class';
import { MbsIncentiveStageDto } from '@mbs-main/class/incentive-stage-dto.class';
import { MbsIncentiveRoleDto } from '@mbs-main/class/incentive-role-dto.class';

@Component({
	selector: 'mbs-incentive-regulation-value-new-update-form',
	templateUrl: './incentive-regulation-value-new-update-form.component.html',
	styleUrls: ['./incentive-regulation-value-new-update-form.component.scss']
})
export class MbsIncentiveRegulationValueNewUpdateFormComponent extends EngeLibGenericForm {
	@Input() incentiveRegulationValue: MbsIncentiveRegulationValueDto | undefined;
	@Output() incentiveRegulationValueOutput: EventEmitter<MbsIncentiveRegulationValueDto> = new EventEmitter<MbsIncentiveRegulationValueDto>();
	
	@Input() stage: MbsIncentiveStageDto | undefined;
	@Input() role: MbsIncentiveRoleDto | undefined;

	constructor(
		ecs: EngeCommonService,
		private _formBuilder: FormBuilder,
		private incentiveRegulationValueResourceService: MbsIncentiveRegulationValueResourceService, 
		protected mbsMainAutocompleteService: MbsMainAutocompleteService,
	) { super(ecs); }

	override loadVariables(): void {
		if(this.incentiveRegulationValue !== undefined) {
			this.input = this.incentiveRegulationValue;
			{
			}
		}
		this.output = this.incentiveRegulationValueOutput;
	}

	_filteredStage: Observable<MbsIncentiveStageDto[]>;
	_filteredRole: Observable<MbsIncentiveRoleDto[]>;

	override loadForm(): void {
		this._newUpdateForm = this._formBuilder.group({
			id: [null],
			minval: [null, [  ]],
			maxval: [null, [  ]],
			defaultval: [null, [  ]],
			stage: [this.stage, [ EngeValidator.haveId,  ]],
			role: [this.role, [ EngeValidator.haveId,  ]],
		});

		this._filteredStage = this.mbsMainAutocompleteService.filterIncentiveStage(this._newUpdateForm.controls['stage'].valueChanges);
		this._filteredRole = this.mbsMainAutocompleteService.filterIncentiveRole(this._newUpdateForm.controls['role'].valueChanges);
	}

	override prepareResult(): MbsIncentiveRegulationValueDto {
		let result: MbsIncentiveRegulationValueDto = this._newUpdateForm.value;
		{
			result.minval = (result.minval != null) ? +result.minval : null;
			result.maxval = (result.maxval != null) ? +result.maxval : null;
			result.defaultval = (result.defaultval != null) ? +result.defaultval : null;
			result.stageId = (result.stage != null) ? result.stage.id : undefined;
			result.roleId = (result.role != null) ? result.role.id : undefined;
		}
		return result;
	}

	override async sendToBackEnd(request: MbsIncentiveRegulationValueDto) {
		try {
			let postOrPut: string;
			if (request.id != null && request.id > 0) {
				await lastValueFrom(this.incentiveRegulationValueResourceService.updateIncentiveRegulationValueUsingPUT(request));
				postOrPut = "updated";
			} else {
				request.id = undefined;
				await lastValueFrom(this.incentiveRegulationValueResourceService.createIncentiveRegulationValueUsingPOST(request));
				postOrPut = "created";
			}
			this._result = request;

			this.ecs.eventer.launchReloadContent("incentiveRegulationValue");
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

	protected newIncentiveRegulationValue() {
		//this._incentiveRegulationValue = null;
		this.incentiveRegulationValueOutput.emit(this.incentiveRegulationValue);
		this.setStep(EngeEngeFormStep.FORM);
	}
}
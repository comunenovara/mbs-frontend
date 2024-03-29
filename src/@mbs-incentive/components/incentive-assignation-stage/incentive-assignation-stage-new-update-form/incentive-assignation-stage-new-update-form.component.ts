import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { lastValueFrom, Observable } from 'rxjs';

import { EngeCommonService, EngeEngeFormStep, EngeLibGenericForm, EngeValidator } from '@enge/common-lib';

import { MbsIncentiveAutocompleteService } from '@mbs-incentive/service/incentive-auto-complete.service';
import { MbsIncentiveAssignationStageResourceService } from '@mbs-incentive/services/incentive-assignation-stage.service';
import { MbsIncentiveAssignationStageDto } from '@mbs-incentive/class/incentive-assignation-stage-dto.class';
import { MbsIncentiveAssignationRoleDto } from '@mbs-incentive/class/incentive-assignation-role-dto.class';
import { MbsIncentiveRoleValueDto } from '@mbs-incentive/class/incentive-role-value-dto.class';

@Component({
	selector: 'mbs-incentive-assignation-stage-new-update-form',
	templateUrl: './incentive-assignation-stage-new-update-form.component.html',
	styleUrls: ['./incentive-assignation-stage-new-update-form.component.scss']
})
export class MbsIncentiveAssignationStageNewUpdateFormComponent extends EngeLibGenericForm {
	@Input() incentiveAssignationStage: MbsIncentiveAssignationStageDto | undefined;
	@Output() incentiveAssignationStageOutput: EventEmitter<MbsIncentiveAssignationStageDto> = new EventEmitter<MbsIncentiveAssignationStageDto>();
	
	@Input() assignationRole: MbsIncentiveAssignationRoleDto | undefined;
	@Input() assignationRoleValue: MbsIncentiveRoleValueDto | undefined;

	constructor(
		ecs: EngeCommonService,
		private _formBuilder: FormBuilder,
		private incentiveAssignationStageResourceService: MbsIncentiveAssignationStageResourceService, 
		protected mbsIncentiveAutocompleteService: MbsIncentiveAutocompleteService,
	) { super(ecs); }

	override loadVariables(): void {
		if(this.incentiveAssignationStage !== undefined) {
			this.input = this.incentiveAssignationStage;
			{
			}
		}
		this.output = this.incentiveAssignationStageOutput;
	}

	_filteredAssignationRole: Observable<MbsIncentiveAssignationRoleDto[]>;
	_filteredAssignationRoleValue: Observable<MbsIncentiveRoleValueDto[]>;

	override loadForm(): void {
		this._newUpdateForm = this._formBuilder.group({
			id: [null],
			value: [null, [ Validators.required,  ]],
			assignationRole: [this.assignationRole, [ EngeValidator.haveId,  ]],
			assignationRoleValue: [this.assignationRoleValue, [ EngeValidator.haveId,  ]],
		});

		this._filteredAssignationRole = this.mbsIncentiveAutocompleteService.filterIncentiveAssignationRole(this._newUpdateForm.controls['assignationRole'].valueChanges);
		this._filteredAssignationRoleValue = this.mbsIncentiveAutocompleteService.filterIncentiveRoleValue(this._newUpdateForm.controls['assignationRoleValue'].valueChanges);
	}

	override prepareResult(): MbsIncentiveAssignationStageDto {
		let result: MbsIncentiveAssignationStageDto = this._newUpdateForm.value;
		{
			result.value = (result.value != null) ? +result.value : null;
			result.assignationRoleId = (result.assignationRole != null) ? result.assignationRole.id : undefined;
			result.assignationRoleValueId = (result.assignationRoleValue != null) ? result.assignationRoleValue.id : undefined;
		}
		return result;
	}

	override async sendToBackEnd(request: MbsIncentiveAssignationStageDto) {
		try {
			let postOrPut: string;
			if (request.id != null && request.id > 0) {
				await lastValueFrom(this.incentiveAssignationStageResourceService.updateIncentiveAssignationStageUsingPUT(request));
				postOrPut = "updated";
			} else {
				request.id = undefined;
				await lastValueFrom(this.incentiveAssignationStageResourceService.createIncentiveAssignationStageUsingPOST(request));
				postOrPut = "created";
			}
			this._result = request;

			this.ecs.eventer.launchReloadContent("incentiveAssignationStage");
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

	protected newIncentiveAssignationStage() {
		//this._incentiveAssignationStage = null;
		this.incentiveAssignationStageOutput.emit(this.incentiveAssignationStage);
		this.setStep(EngeEngeFormStep.FORM);
	}
}
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { lastValueFrom, Observable } from 'rxjs';

import { EngeCommonService, EngeEngeFormStep, EngeLibGenericForm, EngeValidator } from '@enge/common-lib';

import { MbsIncentiveAutocompleteService } from '@mbs-incentive/service/incentive-auto-complete.service';
import { MbsIncentiveAssignationRoleResourceService } from '@mbs-incentive/services/incentive-assignation-role.service';
import { MbsIncentiveAssignationRoleDto } from '@mbs-incentive/class/incentive-assignation-role-dto.class';
import { MbsBeneficiaryDto } from '@mbs-incentive/class/beneficiary-dto.class';
import { MbsRoleDto } from '@mbs-incentive/class/role-dto.class';
import { MbsIncentiveAssignationStageDto } from '@mbs-incentive/class/incentive-assignation-stage-dto.class';

@Component({
	selector: 'mbs-incentive-assignation-role-new-update-form',
	templateUrl: './incentive-assignation-role-new-update-form.component.html',
	styleUrls: ['./incentive-assignation-role-new-update-form.component.scss']
})
export class MbsIncentiveAssignationRoleNewUpdateFormComponent extends EngeLibGenericForm {
	@Input() incentiveAssignationRole: MbsIncentiveAssignationRoleDto | undefined;
	@Output() incentiveAssignationRoleOutput: EventEmitter<MbsIncentiveAssignationRoleDto> = new EventEmitter<MbsIncentiveAssignationRoleDto>();
	
	@Input() beneficiary: MbsBeneficiaryDto | undefined;
	@Input() assignationRole: MbsRoleDto | undefined;
	@Input() assignationStage: MbsIncentiveAssignationStageDto | undefined;

	constructor(
		ecs: EngeCommonService,
		private _formBuilder: FormBuilder,
		private incentiveAssignationRoleResourceService: MbsIncentiveAssignationRoleResourceService, 
		protected mbsIncentiveAutocompleteService: MbsIncentiveAutocompleteService,
	) { super(ecs); }

	override loadVariables(): void {
		if(this.incentiveAssignationRole !== undefined) {
			this.input = this.incentiveAssignationRole;
			{
			}
		}
		this.output = this.incentiveAssignationRoleOutput;
	}

	_filteredBeneficiary: Observable<MbsBeneficiaryDto[]>;
	_filteredAssignationRole: Observable<MbsRoleDto[]>;
	_filteredAssignationStage: Observable<MbsIncentiveAssignationStageDto[]>;

	override loadForm(): void {
		this._newUpdateForm = this._formBuilder.group({
			id: [null],
			beneficiary: [this.beneficiary, [ EngeValidator.haveId,  ]],
			assignationRole: [this.assignationRole, [ EngeValidator.haveId,  ]],
			assignationStage: [this.assignationStage, [ EngeValidator.haveId,  ]],
		});

		this._filteredBeneficiary = this.mbsIncentiveAutocompleteService.filterBeneficiary(this._newUpdateForm.controls['beneficiary'].valueChanges);
		this._filteredAssignationRole = this.mbsIncentiveAutocompleteService.filterRole(this._newUpdateForm.controls['assignationRole'].valueChanges);
		this._filteredAssignationStage = this.mbsIncentiveAutocompleteService.filterIncentiveAssignationStage(this._newUpdateForm.controls['assignationStage'].valueChanges);
	}

	override prepareResult(): MbsIncentiveAssignationRoleDto {
		let result: MbsIncentiveAssignationRoleDto = this._newUpdateForm.value;
		{
			result.beneficiaryId = (result.beneficiary != null) ? result.beneficiary.id : undefined;
			result.assignationRoleId = (result.assignationRole != null) ? result.assignationRole.id : undefined;
			result.assignationStageId = (result.assignationStage != null) ? result.assignationStage.id : undefined;
		}
		return result;
	}

	override async sendToBackEnd(request: MbsIncentiveAssignationRoleDto) {
		try {
			let postOrPut: string;
			if (request.id != null && request.id > 0) {
				await lastValueFrom(this.incentiveAssignationRoleResourceService.updateIncentiveAssignationRoleUsingPUT(request));
				postOrPut = "updated";
			} else {
				request.id = undefined;
				await lastValueFrom(this.incentiveAssignationRoleResourceService.createIncentiveAssignationRoleUsingPOST(request));
				postOrPut = "created";
			}
			this._result = request;

			this.ecs.eventer.launchReloadContent("incentiveAssignationRole");
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

	protected newIncentiveAssignationRole() {
		//this._incentiveAssignationRole = null;
		this.incentiveAssignationRoleOutput.emit(this.incentiveAssignationRole);
		this.setStep(EngeEngeFormStep.FORM);
	}
}
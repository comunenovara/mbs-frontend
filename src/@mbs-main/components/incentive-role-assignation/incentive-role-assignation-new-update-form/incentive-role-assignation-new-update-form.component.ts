import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { lastValueFrom, Observable } from 'rxjs';

import { EngeCommonService, EngeEngeFormStep, EngeLibGenericForm, EngeValidator } from '@enge/common-lib';

import { MbsMainAutocompleteService } from '@mbs-main/service/main-auto-complete.service';
import { MbsIncentiveRoleAssignationResourceService } from '@mbs-main/services/incentive-role-assignation.service';
import { MbsIncentiveRoleAssignationDto } from '@mbs-main/class/incentive-role-assignation-dto.class';
import { MbsIncentiveBeneficiaryDto } from '@mbs-main/class/incentive-beneficiary-dto.class';
import { MbsIncentiveCalculationDto } from '@mbs-main/class/incentive-calculation-dto.class';
import { MbsIncentiveRoleDto } from '@mbs-main/class/incentive-role-dto.class';

@Component({
	selector: 'mbs-incentive-role-assignation-new-update-form',
	templateUrl: './incentive-role-assignation-new-update-form.component.html',
	styleUrls: ['./incentive-role-assignation-new-update-form.component.scss']
})
export class MbsIncentiveRoleAssignationNewUpdateFormComponent extends EngeLibGenericForm {
	@Input() incentiveRoleAssignation: MbsIncentiveRoleAssignationDto | undefined;
	@Output() incentiveRoleAssignationOutput: EventEmitter<MbsIncentiveRoleAssignationDto> = new EventEmitter<MbsIncentiveRoleAssignationDto>();
	
	@Input() beneficiary: MbsIncentiveBeneficiaryDto | undefined;
	@Input() calculation: MbsIncentiveCalculationDto | undefined;
	@Input() role: MbsIncentiveRoleDto | undefined;

	constructor(
		ecs: EngeCommonService,
		private _formBuilder: FormBuilder,
		private incentiveRoleAssignationResourceService: MbsIncentiveRoleAssignationResourceService, 
		protected mbsMainAutocompleteService: MbsMainAutocompleteService,
	) { super(ecs); }

	override loadVariables(): void {
		if(this.incentiveRoleAssignation !== undefined) {
			this.input = this.incentiveRoleAssignation;
			{
			}
		}
		this.output = this.incentiveRoleAssignationOutput;
	}

	_filteredBeneficiary: Observable<MbsIncentiveBeneficiaryDto[]>;
	_filteredCalculation: Observable<MbsIncentiveCalculationDto[]>;
	_filteredRole: Observable<MbsIncentiveRoleDto[]>;

	override loadForm(): void {
		this._newUpdateForm = this._formBuilder.group({
			id: [null],
			beneficiary: [this.beneficiary, [ EngeValidator.haveId,  ]],
			calculation: [this.calculation, [ EngeValidator.haveId,  ]],
			role: [this.role, [ EngeValidator.haveId,  ]],
		});

		this._filteredBeneficiary = this.mbsMainAutocompleteService.filterIncentiveBeneficiary(this._newUpdateForm.controls['beneficiary'].valueChanges);
		this._filteredCalculation = this.mbsMainAutocompleteService.filterIncentiveCalculation(this._newUpdateForm.controls['calculation'].valueChanges);
		this._filteredRole = this.mbsMainAutocompleteService.filterIncentiveRole(this._newUpdateForm.controls['role'].valueChanges);
	}

	override prepareResult(): MbsIncentiveRoleAssignationDto {
		let result: MbsIncentiveRoleAssignationDto = this._newUpdateForm.value;
		{
			result.beneficiaryId = (result.beneficiary != null) ? result.beneficiary.id : undefined;
			result.calculationId = (result.calculation != null) ? result.calculation.id : undefined;
			result.roleId = (result.role != null) ? result.role.id : undefined;
		}
		return result;
	}

	override async sendToBackEnd(request: MbsIncentiveRoleAssignationDto) {
		try {
			let postOrPut: string;
			if (request.id != null && request.id > 0) {
				await lastValueFrom(this.incentiveRoleAssignationResourceService.updateIncentiveRoleAssignationUsingPUT(request));
				postOrPut = "updated";
			} else {
				request.id = undefined;
				await lastValueFrom(this.incentiveRoleAssignationResourceService.createIncentiveRoleAssignationUsingPOST(request));
				postOrPut = "created";
			}
			this._result = request;

			this.ecs.eventer.launchReloadContent("incentiveRoleAssignation");
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

	protected newIncentiveRoleAssignation() {
		//this._incentiveRoleAssignation = null;
		this.incentiveRoleAssignationOutput.emit(this.incentiveRoleAssignation);
		this.setStep(EngeEngeFormStep.FORM);
	}
}
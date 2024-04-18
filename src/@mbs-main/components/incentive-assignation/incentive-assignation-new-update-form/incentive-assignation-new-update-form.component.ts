import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { lastValueFrom, Observable } from 'rxjs';

import { EngeCommonService, EngeEngeFormStep, EngeLibGenericForm, EngeValidator } from '@enge/common-lib';

import { MbsMainAutocompleteService } from '@mbs-main/service/main-auto-complete.service';
import { MbsIncentiveAssignationResourceService } from '@mbs-main/services/incentive-assignation.service';
import { MbsIncentiveAssignationDto } from '@mbs-main/class/incentive-assignation-dto.class';
import { MbsIncentiveRoleAssignationDto } from '@mbs-main/class/incentive-role-assignation-dto.class';
import { MbsIncentiveCalculationValueDto } from '@mbs-main/class/incentive-calculation-value-dto.class';

@Component({
	selector: 'mbs-incentive-assignation-new-update-form',
	templateUrl: './incentive-assignation-new-update-form.component.html',
	styleUrls: ['./incentive-assignation-new-update-form.component.scss']
})
export class MbsIncentiveAssignationNewUpdateFormComponent extends EngeLibGenericForm {
	@Input() incentiveAssignation: MbsIncentiveAssignationDto | undefined;
	@Output() incentiveAssignationOutput: EventEmitter<MbsIncentiveAssignationDto> = new EventEmitter<MbsIncentiveAssignationDto>();
	
	@Input() assignation: MbsIncentiveRoleAssignationDto | undefined;
	@Input() calculationValue: MbsIncentiveCalculationValueDto | undefined;

	constructor(
		ecs: EngeCommonService,
		private _formBuilder: FormBuilder,
		private incentiveAssignationResourceService: MbsIncentiveAssignationResourceService, 
		protected mbsMainAutocompleteService: MbsMainAutocompleteService,
	) { super(ecs); }

	override loadVariables(): void {
		if(this.incentiveAssignation !== undefined) {
			this.input = this.incentiveAssignation;
			{
			}
		}
		this.output = this.incentiveAssignationOutput;
	}

	_filteredAssignation: Observable<MbsIncentiveRoleAssignationDto[]>;
	_filteredCalculationValue: Observable<MbsIncentiveCalculationValueDto[]>;

	override loadForm(): void {
		this._newUpdateForm = this._formBuilder.group({
			id: [null],
			value: [null, [  ]],
			preAmount: [null, [  ]],
			amount: [null, [  ]],
			assignation: [this.assignation, [ EngeValidator.haveId,  ]],
			calculationValue: [this.calculationValue, [ EngeValidator.haveId,  ]],
		});

		this._filteredAssignation = this.mbsMainAutocompleteService.filterIncentiveRoleAssignation(this._newUpdateForm.controls['assignation'].valueChanges);
		this._filteredCalculationValue = this.mbsMainAutocompleteService.filterIncentiveCalculationValue(this._newUpdateForm.controls['calculationValue'].valueChanges);
	}

	override prepareResult(): MbsIncentiveAssignationDto {
		let result: MbsIncentiveAssignationDto = this._newUpdateForm.value;
		{
			result.value = (result.value != null) ? +result.value : null;
			result.preAmount = (result.preAmount != null) ? +result.preAmount : null;
			result.amount = (result.amount != null) ? +result.amount : null;
			result.assignationId = (result.assignation != null) ? result.assignation.id : undefined;
			result.calculationValueId = (result.calculationValue != null) ? result.calculationValue.id : undefined;
		}
		return result;
	}

	override async sendToBackEnd(request: MbsIncentiveAssignationDto) {
		try {
			let postOrPut: string;
			if (request.id != null && request.id > 0) {
				await lastValueFrom(this.incentiveAssignationResourceService.updateIncentiveAssignationUsingPUT(request));
				postOrPut = "updated";
			} else {
				request.id = undefined;
				await lastValueFrom(this.incentiveAssignationResourceService.createIncentiveAssignationUsingPOST(request));
				postOrPut = "created";
			}
			this._result = request;

			this.ecs.eventer.launchReloadContent("incentiveAssignation");
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

	protected newIncentiveAssignation() {
		//this._incentiveAssignation = null;
		this.incentiveAssignationOutput.emit(this.incentiveAssignation);
		this.setStep(EngeEngeFormStep.FORM);
	}
}
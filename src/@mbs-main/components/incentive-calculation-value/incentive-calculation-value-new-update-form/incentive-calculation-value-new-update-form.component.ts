import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { lastValueFrom, Observable } from 'rxjs';

import { EngeCommonService, EngeEngeFormStep, EngeLibGenericForm, EngeValidator } from '@enge/common-lib';

import { MbsMainAutocompleteService } from '@mbs-main/service/main-auto-complete.service';
import { MbsIncentiveCalculationValueResourceService } from '@mbs-main/services/incentive-calculation-value.service';
import { MbsIncentiveCalculationValueDto } from '@mbs-main/class/incentive-calculation-value-dto.class';
import { MbsIncentiveCalculationDto } from '@mbs-main/class/incentive-calculation-dto.class';
import { MbsIncentiveRegulationValueDto } from '@mbs-main/class/incentive-regulation-value-dto.class';

@Component({
	selector: 'mbs-incentive-calculation-value-new-update-form',
	templateUrl: './incentive-calculation-value-new-update-form.component.html',
	styleUrls: ['./incentive-calculation-value-new-update-form.component.scss']
})
export class MbsIncentiveCalculationValueNewUpdateFormComponent extends EngeLibGenericForm {
	@Input() incentiveCalculationValue: MbsIncentiveCalculationValueDto | undefined;
	@Output() incentiveCalculationValueOutput: EventEmitter<MbsIncentiveCalculationValueDto> = new EventEmitter<MbsIncentiveCalculationValueDto>();
	
	@Input() calculation: MbsIncentiveCalculationDto | undefined;
	@Input() regulationValue: MbsIncentiveRegulationValueDto | undefined;

	constructor(
		ecs: EngeCommonService,
		private _formBuilder: FormBuilder,
		private incentiveCalculationValueResourceService: MbsIncentiveCalculationValueResourceService, 
		protected mbsMainAutocompleteService: MbsMainAutocompleteService,
	) { super(ecs); }

	override loadVariables(): void {
		if(this.incentiveCalculationValue !== undefined) {
			this.input = this.incentiveCalculationValue;
			{
			}
		}
		this.output = this.incentiveCalculationValueOutput;
	}

	_filteredCalculation: Observable<MbsIncentiveCalculationDto[]>;
	_filteredRegulationValue: Observable<MbsIncentiveRegulationValueDto[]>;

	override loadForm(): void {
		this._newUpdateForm = this._formBuilder.group({
			id: [null],
			value: [null, [  ]],
			calculation: [this.calculation, [ EngeValidator.haveId,  ]],
			regulationValue: [this.regulationValue, [ EngeValidator.haveId,  ]],
		});

		this._filteredCalculation = this.mbsMainAutocompleteService.filterIncentiveCalculation(this._newUpdateForm.controls['calculation'].valueChanges);
		this._filteredRegulationValue = this.mbsMainAutocompleteService.filterIncentiveRegulationValue(this._newUpdateForm.controls['regulationValue'].valueChanges);
	}

	override prepareResult(): MbsIncentiveCalculationValueDto {
		let result: MbsIncentiveCalculationValueDto = this._newUpdateForm.value;
		{
			result.value = (result.value != null) ? +result.value : null;
			result.calculationId = (result.calculation != null) ? result.calculation.id : undefined;
			result.regulationValueId = (result.regulationValue != null) ? result.regulationValue.id : undefined;
		}
		return result;
	}

	override async sendToBackEnd(request: MbsIncentiveCalculationValueDto) {
		try {
			let postOrPut: string;
			if (request.id != null && request.id > 0) {
				await lastValueFrom(this.incentiveCalculationValueResourceService.updateIncentiveCalculationValueUsingPUT(request));
				postOrPut = "updated";
			} else {
				request.id = undefined;
				await lastValueFrom(this.incentiveCalculationValueResourceService.createIncentiveCalculationValueUsingPOST(request));
				postOrPut = "created";
			}
			this._result = request;

			this.ecs.eventer.launchReloadContent("incentiveCalculationValue");
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

	protected newIncentiveCalculationValue() {
		//this._incentiveCalculationValue = null;
		this.incentiveCalculationValueOutput.emit(this.incentiveCalculationValue);
		this.setStep(EngeEngeFormStep.FORM);
	}
}
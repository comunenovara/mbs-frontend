import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { lastValueFrom, Observable } from 'rxjs';

import { EngeCommonService, EngeEngeFormStep, EngeLibGenericForm, EngeValidator } from '@enge/common-lib';

import { MbsMainAutocompleteService } from '@mbs-main/service/main-auto-complete.service';
import { MbsIncentiveCalculationFactorResourceService } from '@mbs-main/services/incentive-calculation-factor.service';
import { MbsIncentiveCalculationFactorDto } from '@mbs-main/class/incentive-calculation-factor-dto.class';
import { MbsIncentiveCalculationMethodDto } from '@mbs-main/class/incentive-calculation-method-dto.class';

@Component({
	selector: 'mbs-incentive-calculation-factor-new-update-form',
	templateUrl: './incentive-calculation-factor-new-update-form.component.html',
	styleUrls: ['./incentive-calculation-factor-new-update-form.component.scss']
})
export class MbsIncentiveCalculationFactorNewUpdateFormComponent extends EngeLibGenericForm {
	@Input() incentiveCalculationFactor: MbsIncentiveCalculationFactorDto | undefined;
	@Output() incentiveCalculationFactorOutput: EventEmitter<MbsIncentiveCalculationFactorDto> = new EventEmitter<MbsIncentiveCalculationFactorDto>();
	
	@Input() incentiveCalculationMethod: MbsIncentiveCalculationMethodDto | undefined;

	constructor(
		ecs: EngeCommonService,
		private _formBuilder: FormBuilder,
		private incentiveCalculationFactorResourceService: MbsIncentiveCalculationFactorResourceService, 
		protected mbsMainAutocompleteService: MbsMainAutocompleteService,
	) { super(ecs); }

	override loadVariables(): void {
		if(this.incentiveCalculationFactor !== undefined) {
			this.input = this.incentiveCalculationFactor;
			{
			}
		}
		this.output = this.incentiveCalculationFactorOutput;
	}

	_filteredIncentiveCalculationMethod: Observable<MbsIncentiveCalculationMethodDto[]>;

	override loadForm(): void {
		this._newUpdateForm = this._formBuilder.group({
			id: [null],
			minval: [null, [  ]],
			maxval: [null, [  ]],
			defaultval: [null, [  ]],
			incentiveCalculationMethod: [this.incentiveCalculationMethod, [  ]],
		});

		this._filteredIncentiveCalculationMethod = this.mbsMainAutocompleteService.filterIncentiveCalculationMethod(this._newUpdateForm.controls['incentiveCalculationMethod'].valueChanges);
	}

	override prepareResult(): MbsIncentiveCalculationFactorDto {
		let result: MbsIncentiveCalculationFactorDto = this._newUpdateForm.value;
		{
			result.minval = (result.minval != null) ? +result.minval : null;
			result.maxval = (result.maxval != null) ? +result.maxval : null;
			result.defaultval = (result.defaultval != null) ? +result.defaultval : null;
			result.incentiveCalculationMethodId = (result.incentiveCalculationMethod != null) ? result.incentiveCalculationMethod.id : undefined;
		}
		return result;
	}

	override async sendToBackEnd(request: MbsIncentiveCalculationFactorDto) {
		try {
			let postOrPut: string;
			if (request.id != null && request.id > 0) {
				await lastValueFrom(this.incentiveCalculationFactorResourceService.updateIncentiveCalculationFactorUsingPUT(request));
				postOrPut = "updated";
			} else {
				request.id = undefined;
				await lastValueFrom(this.incentiveCalculationFactorResourceService.createIncentiveCalculationFactorUsingPOST(request));
				postOrPut = "created";
			}
			this._result = request;

			this.ecs.eventer.launchReloadContent("incentiveCalculationFactor");
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

	protected newIncentiveCalculationFactor() {
		//this._incentiveCalculationFactor = null;
		this.incentiveCalculationFactorOutput.emit(this.incentiveCalculationFactor);
		this.setStep(EngeEngeFormStep.FORM);
	}
}
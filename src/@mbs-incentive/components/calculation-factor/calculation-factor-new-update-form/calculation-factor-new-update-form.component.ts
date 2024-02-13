import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { lastValueFrom, Observable } from 'rxjs';

import { EngeCommonService, EngeEngeFormStep, EngeLibGenericForm, EngeValidator } from '@enge/common-lib';

import { MbsIncentiveAutocompleteService } from '@mbs-incentive/service/incentive-auto-complete.service';
import { MbsCalculationFactorResourceService } from '@mbs-incentive/services/calculation-factor.service';
import { MbsCalculationFactorDto } from '@mbs-incentive/class/calculation-factor-dto.class';
import { MbsCalculationMethodDto } from '@mbs-incentive/class/calculation-method-dto.class';

@Component({
	selector: 'mbs-calculation-factor-new-update-form',
	templateUrl: './calculation-factor-new-update-form.component.html',
	styleUrls: ['./calculation-factor-new-update-form.component.scss']
})
export class MbsCalculationFactorNewUpdateFormComponent extends EngeLibGenericForm {
	@Input() calculationFactor: MbsCalculationFactorDto | undefined;
	@Output() calculationFactorOutput: EventEmitter<MbsCalculationFactorDto> = new EventEmitter<MbsCalculationFactorDto>();
	
	@Input() method: MbsCalculationMethodDto | undefined;

	constructor(
		ecs: EngeCommonService,
		private _formBuilder: FormBuilder,
		private calculationFactorResourceService: MbsCalculationFactorResourceService, 
		protected mbsIncentiveAutocompleteService: MbsIncentiveAutocompleteService,
	) { super(ecs); }

	override loadVariables(): void {
		if(this.calculationFactor !== undefined) {
			this.input = this.calculationFactor;
			{
			}
		}
		this.output = this.calculationFactorOutput;
	}

	_filteredMethod: Observable<MbsCalculationMethodDto[]>;

	override loadForm(): void {
		this._newUpdateForm = this._formBuilder.group({
			id: [null],
			min: [null, [  ]],
			maax: [null, [  ]],
			value: [null, [  ]],
			method: [this.method, [  ]],
		});

		this._filteredMethod = this.mbsIncentiveAutocompleteService.filterCalculationMethod(this._newUpdateForm.controls['method'].valueChanges);
	}

	override prepareResult(): MbsCalculationFactorDto {
		let result: MbsCalculationFactorDto = this._newUpdateForm.value;
		{
			result.min = (result.min != null) ? +result.min : null;
			result.maax = (result.maax != null) ? +result.maax : null;
			result.value = (result.value != null) ? +result.value : null;
			result.methodId = (result.method != null) ? result.method.id : undefined;
		}
		return result;
	}

	override async sendToBackEnd(request: MbsCalculationFactorDto) {
		try {
			let postOrPut: string;
			if (request.id != null && request.id > 0) {
				await lastValueFrom(this.calculationFactorResourceService.updateCalculationFactorUsingPUT(request));
				postOrPut = "updated";
			} else {
				request.id = undefined;
				await lastValueFrom(this.calculationFactorResourceService.createCalculationFactorUsingPOST(request));
				postOrPut = "created";
			}
			this._result = request;

			this.ecs.eventer.launchReloadContent("calculationFactor");
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

	protected newCalculationFactor() {
		//this._calculationFactor = null;
		this.calculationFactorOutput.emit(this.calculationFactor);
		this.setStep(EngeEngeFormStep.FORM);
	}
}
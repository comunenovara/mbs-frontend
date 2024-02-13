import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { lastValueFrom, Observable } from 'rxjs';

import { EngeCommonService, EngeEngeFormStep, EngeLibGenericForm, EngeValidator } from '@enge/common-lib';

import { MbsIncentiveAutocompleteService } from '@mbs-incentive/service/incentive-auto-complete.service';
import { MbsCalculationMethodResourceService } from '@mbs-incentive/services/calculation-method.service';
import { MbsCalculationMethodDto } from '@mbs-incentive/class/calculation-method-dto.class';
import { MbsIncentiveRegulationDto } from '@mbs-incentive/class/incentive-regulation-dto.class';
import { MbsProcurementTypeDto } from '@mbs-incentive/class/procurement-type-dto.class';

@Component({
	selector: 'mbs-calculation-method-new-update-form',
	templateUrl: './calculation-method-new-update-form.component.html',
	styleUrls: ['./calculation-method-new-update-form.component.scss']
})
export class MbsCalculationMethodNewUpdateFormComponent extends EngeLibGenericForm {
	@Input() calculationMethod: MbsCalculationMethodDto | undefined;
	@Output() calculationMethodOutput: EventEmitter<MbsCalculationMethodDto> = new EventEmitter<MbsCalculationMethodDto>();
	
	@Input() regulation: MbsIncentiveRegulationDto | undefined;
	@Input() procurementType: MbsProcurementTypeDto | undefined;

	constructor(
		ecs: EngeCommonService,
		private _formBuilder: FormBuilder,
		private calculationMethodResourceService: MbsCalculationMethodResourceService, 
		protected mbsIncentiveAutocompleteService: MbsIncentiveAutocompleteService,
	) { super(ecs); }

	override loadVariables(): void {
		if(this.calculationMethod !== undefined) {
			this.input = this.calculationMethod;
			{
			}
		}
		this.output = this.calculationMethodOutput;
	}

	_filteredRegulation: Observable<MbsIncentiveRegulationDto[]>;
	_filteredProcurementType: Observable<MbsProcurementTypeDto[]>;

	override loadForm(): void {
		this._newUpdateForm = this._formBuilder.group({
			id: [null],
			code: [null, [  ]],
			regulation: [this.regulation, [  ]],
			procurementType: [this.procurementType, [  ]],
		});

		this._filteredRegulation = this.mbsIncentiveAutocompleteService.filterIncentiveRegulation(this._newUpdateForm.controls['regulation'].valueChanges);
		this._filteredProcurementType = this.mbsIncentiveAutocompleteService.filterProcurementType(this._newUpdateForm.controls['procurementType'].valueChanges);
	}

	override prepareResult(): MbsCalculationMethodDto {
		let result: MbsCalculationMethodDto = this._newUpdateForm.value;
		{
			result.regulationId = (result.regulation != null) ? result.regulation.id : undefined;
			result.procurementTypeId = (result.procurementType != null) ? result.procurementType.id : undefined;
		}
		return result;
	}

	override async sendToBackEnd(request: MbsCalculationMethodDto) {
		try {
			let postOrPut: string;
			if (request.id != null && request.id > 0) {
				await lastValueFrom(this.calculationMethodResourceService.updateCalculationMethodUsingPUT(request));
				postOrPut = "updated";
			} else {
				request.id = undefined;
				await lastValueFrom(this.calculationMethodResourceService.createCalculationMethodUsingPOST(request));
				postOrPut = "created";
			}
			this._result = request;

			this.ecs.eventer.launchReloadContent("calculationMethod");
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

	protected newCalculationMethod() {
		//this._calculationMethod = null;
		this.calculationMethodOutput.emit(this.calculationMethod);
		this.setStep(EngeEngeFormStep.FORM);
	}
}
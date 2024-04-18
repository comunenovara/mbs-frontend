import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { lastValueFrom, Observable } from 'rxjs';

import { EngeCommonService, EngeEngeFormStep, EngeLibGenericForm, EngeValidator } from '@enge/common-lib';

import { MbsMainAutocompleteService } from '@mbs-main/service/main-auto-complete.service';
import { MbsIncentiveCalculationMethodResourceService } from '@mbs-main/services/incentive-calculation-method.service';
import { MbsIncentiveCalculationMethodDto } from '@mbs-main/class/incentive-calculation-method-dto.class';
import { MbsProcurementTypeDto } from '@mbs-main/class/procurement-type-dto.class';
import { MbsIncentiveRegulationDto } from '@mbs-main/class/incentive-regulation-dto.class';

@Component({
	selector: 'mbs-incentive-calculation-method-new-update-form',
	templateUrl: './incentive-calculation-method-new-update-form.component.html',
	styleUrls: ['./incentive-calculation-method-new-update-form.component.scss']
})
export class MbsIncentiveCalculationMethodNewUpdateFormComponent extends EngeLibGenericForm {
	@Input() incentiveCalculationMethod: MbsIncentiveCalculationMethodDto | undefined;
	@Output() incentiveCalculationMethodOutput: EventEmitter<MbsIncentiveCalculationMethodDto> = new EventEmitter<MbsIncentiveCalculationMethodDto>();
	
	@Input() procurementType: MbsProcurementTypeDto | undefined;
	@Input() regulation: MbsIncentiveRegulationDto | undefined;

	constructor(
		ecs: EngeCommonService,
		private _formBuilder: FormBuilder,
		private incentiveCalculationMethodResourceService: MbsIncentiveCalculationMethodResourceService, 
		protected mbsMainAutocompleteService: MbsMainAutocompleteService,
	) { super(ecs); }

	override loadVariables(): void {
		if(this.incentiveCalculationMethod !== undefined) {
			this.input = this.incentiveCalculationMethod;
			{
			}
		}
		this.output = this.incentiveCalculationMethodOutput;
	}

	_filteredProcurementType: Observable<MbsProcurementTypeDto[]>;
	_filteredRegulation: Observable<MbsIncentiveRegulationDto[]>;

	override loadForm(): void {
		this._newUpdateForm = this._formBuilder.group({
			id: [null],
			description: [null, [ Validators.required,  ]],
			code: [null, [ Validators.required,  ]],
			procurementType: [this.procurementType, [ EngeValidator.haveId,  ]],
			regulation: [this.regulation, [ EngeValidator.haveId,  ]],
		});

		this._filteredProcurementType = this.mbsMainAutocompleteService.filterProcurementType(this._newUpdateForm.controls['procurementType'].valueChanges);
		this._filteredRegulation = this.mbsMainAutocompleteService.filterIncentiveRegulation(this._newUpdateForm.controls['regulation'].valueChanges);
	}

	override prepareResult(): MbsIncentiveCalculationMethodDto {
		let result: MbsIncentiveCalculationMethodDto = this._newUpdateForm.value;
		{
			result.procurementTypeId = (result.procurementType != null) ? result.procurementType.id : undefined;
			result.regulationId = (result.regulation != null) ? result.regulation.id : undefined;
		}
		return result;
	}

	override async sendToBackEnd(request: MbsIncentiveCalculationMethodDto) {
		try {
			let postOrPut: string;
			if (request.id != null && request.id > 0) {
				await lastValueFrom(this.incentiveCalculationMethodResourceService.updateIncentiveCalculationMethodUsingPUT(request));
				postOrPut = "updated";
			} else {
				request.id = undefined;
				await lastValueFrom(this.incentiveCalculationMethodResourceService.createIncentiveCalculationMethodUsingPOST(request));
				postOrPut = "created";
			}
			this._result = request;

			this.ecs.eventer.launchReloadContent("incentiveCalculationMethod");
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

	protected newIncentiveCalculationMethod() {
		//this._incentiveCalculationMethod = null;
		this.incentiveCalculationMethodOutput.emit(this.incentiveCalculationMethod);
		this.setStep(EngeEngeFormStep.FORM);
	}
}
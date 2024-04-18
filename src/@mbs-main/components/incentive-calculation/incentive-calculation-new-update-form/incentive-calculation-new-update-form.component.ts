import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { lastValueFrom, Observable } from 'rxjs';

import { EngeCommonService, EngeEngeFormStep, EngeLibGenericForm, EngeValidator } from '@enge/common-lib';

import { MbsMainAutocompleteService } from '@mbs-main/service/main-auto-complete.service';
import { MbsIncentiveCalculationResourceService } from '@mbs-main/services/incentive-calculation.service';
import { MbsIncentiveCalculationDto } from '@mbs-main/class/incentive-calculation-dto.class';
import { MbsGovernativeProcurementLotDto } from '@mbs-main/class/governative-procurement-lot-dto.class';
import { MbsIncentiveRegulationDto } from '@mbs-main/class/incentive-regulation-dto.class';

@Component({
	selector: 'mbs-incentive-calculation-new-update-form',
	templateUrl: './incentive-calculation-new-update-form.component.html',
	styleUrls: ['./incentive-calculation-new-update-form.component.scss']
})
export class MbsIncentiveCalculationNewUpdateFormComponent extends EngeLibGenericForm {
	@Input() incentiveCalculation: MbsIncentiveCalculationDto | undefined;
	@Output() incentiveCalculationOutput: EventEmitter<MbsIncentiveCalculationDto> = new EventEmitter<MbsIncentiveCalculationDto>();
	
	@Input() governativeProcurementLot: MbsGovernativeProcurementLotDto | undefined;
	@Input() regulation: MbsIncentiveRegulationDto | undefined;

	constructor(
		ecs: EngeCommonService,
		private _formBuilder: FormBuilder,
		private incentiveCalculationResourceService: MbsIncentiveCalculationResourceService, 
		protected mbsMainAutocompleteService: MbsMainAutocompleteService,
	) { super(ecs); }

	override loadVariables(): void {
		if(this.incentiveCalculation !== undefined) {
			this.input = this.incentiveCalculation;
			{
			}
		}
		this.output = this.incentiveCalculationOutput;
	}

	_filteredGovernativeProcurementLot: Observable<MbsGovernativeProcurementLotDto[]>;
	_filteredRegulation: Observable<MbsIncentiveRegulationDto[]>;

	override loadForm(): void {
		this._newUpdateForm = this._formBuilder.group({
			id: [null],
			description: [null, [ Validators.required,  ]],
			confirmed: [false, [  ]],
			preAmount: [null, [  ]],
			amount: [null, [  ]],
			governativeProcurementLot: [this.governativeProcurementLot, [ EngeValidator.haveId,  ]],
			regulation: [this.regulation, [ EngeValidator.haveId,  ]],
		});

		this._filteredGovernativeProcurementLot = this.mbsMainAutocompleteService.filterGovernativeProcurementLot(this._newUpdateForm.controls['governativeProcurementLot'].valueChanges);
		this._filteredRegulation = this.mbsMainAutocompleteService.filterIncentiveRegulation(this._newUpdateForm.controls['regulation'].valueChanges);
	}

	override prepareResult(): MbsIncentiveCalculationDto {
		let result: MbsIncentiveCalculationDto = this._newUpdateForm.value;
		{
			result.preAmount = (result.preAmount != null) ? +result.preAmount : null;
			result.amount = (result.amount != null) ? +result.amount : null;
			result.governativeProcurementLotId = (result.governativeProcurementLot != null) ? result.governativeProcurementLot.id : undefined;
			result.regulationId = (result.regulation != null) ? result.regulation.id : undefined;
		}
		return result;
	}

	override async sendToBackEnd(request: MbsIncentiveCalculationDto) {
		try {
			let postOrPut: string;
			if (request.id != null && request.id > 0) {
				await lastValueFrom(this.incentiveCalculationResourceService.updateIncentiveCalculationUsingPUT(request));
				postOrPut = "updated";
			} else {
				request.id = undefined;
				await lastValueFrom(this.incentiveCalculationResourceService.createIncentiveCalculationUsingPOST(request));
				postOrPut = "created";
			}
			this._result = request;

			this.ecs.eventer.launchReloadContent("incentiveCalculation");
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

	protected newIncentiveCalculation() {
		//this._incentiveCalculation = null;
		this.incentiveCalculationOutput.emit(this.incentiveCalculation);
		this.setStep(EngeEngeFormStep.FORM);
	}
}
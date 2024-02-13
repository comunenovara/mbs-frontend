import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { lastValueFrom, Observable } from 'rxjs';

import { EngeCommonService, EngeEngeFormStep, EngeLibGenericForm, EngeValidator } from '@enge/common-lib';

import { MbsIncentiveAutocompleteService } from '@mbs-incentive/service/incentive-auto-complete.service';
import { MbsIncentiveRegulationResourceService } from '@mbs-incentive/services/incentive-regulation.service';
import { MbsIncentiveRegulationDto } from '@mbs-incentive/class/incentive-regulation-dto.class';

@Component({
	selector: 'mbs-incentive-regulation-new-update-form',
	templateUrl: './incentive-regulation-new-update-form.component.html',
	styleUrls: ['./incentive-regulation-new-update-form.component.scss']
})
export class MbsIncentiveRegulationNewUpdateFormComponent extends EngeLibGenericForm {
	@Input() incentiveRegulation: MbsIncentiveRegulationDto | undefined;
	@Output() incentiveRegulationOutput: EventEmitter<MbsIncentiveRegulationDto> = new EventEmitter<MbsIncentiveRegulationDto>();
	

	constructor(
		ecs: EngeCommonService,
		private _formBuilder: FormBuilder,
		private incentiveRegulationResourceService: MbsIncentiveRegulationResourceService, 
		protected mbsIncentiveAutocompleteService: MbsIncentiveAutocompleteService,
	) { super(ecs); }

	override loadVariables(): void {
		if(this.incentiveRegulation !== undefined) {
			this.input = this.incentiveRegulation;
			{
			}
		}
		this.output = this.incentiveRegulationOutput;
	}


	override loadForm(): void {
		this._newUpdateForm = this._formBuilder.group({
			id: [null],
			description: [null, [ Validators.required,  ]],
		});

	}

	override prepareResult(): MbsIncentiveRegulationDto {
		let result: MbsIncentiveRegulationDto = this._newUpdateForm.value;
		{
		}
		return result;
	}

	override async sendToBackEnd(request: MbsIncentiveRegulationDto) {
		try {
			let postOrPut: string;
			if (request.id != null && request.id > 0) {
				await lastValueFrom(this.incentiveRegulationResourceService.updateIncentiveRegulationUsingPUT(request));
				postOrPut = "updated";
			} else {
				request.id = undefined;
				await lastValueFrom(this.incentiveRegulationResourceService.createIncentiveRegulationUsingPOST(request));
				postOrPut = "created";
			}
			this._result = request;

			this.ecs.eventer.launchReloadContent("incentiveRegulation");
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

	protected newIncentiveRegulation() {
		//this._incentiveRegulation = null;
		this.incentiveRegulationOutput.emit(this.incentiveRegulation);
		this.setStep(EngeEngeFormStep.FORM);
	}
}
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { lastValueFrom, Observable } from 'rxjs';

import { EngeCommonService, EngeEngeFormStep, EngeLibGenericForm, EngeValidator } from '@enge/common-lib';

import { MbsMainAutocompleteService } from '@mbs-main/service/main-auto-complete.service';
import { MbsIncentiveBeneficiaryResourceService } from '@mbs-main/services/incentive-beneficiary.service';
import { MbsIncentiveBeneficiaryDto } from '@mbs-main/class/incentive-beneficiary-dto.class';

@Component({
	selector: 'mbs-incentive-beneficiary-new-update-form',
	templateUrl: './incentive-beneficiary-new-update-form.component.html',
	styleUrls: ['./incentive-beneficiary-new-update-form.component.scss']
})
export class MbsIncentiveBeneficiaryNewUpdateFormComponent extends EngeLibGenericForm {
	@Input() incentiveBeneficiary: MbsIncentiveBeneficiaryDto | undefined;
	@Output() incentiveBeneficiaryOutput: EventEmitter<MbsIncentiveBeneficiaryDto> = new EventEmitter<MbsIncentiveBeneficiaryDto>();
	

	constructor(
		ecs: EngeCommonService,
		private _formBuilder: FormBuilder,
		private incentiveBeneficiaryResourceService: MbsIncentiveBeneficiaryResourceService, 
		protected mbsMainAutocompleteService: MbsMainAutocompleteService,
	) { super(ecs); }

	override loadVariables(): void {
		if(this.incentiveBeneficiary !== undefined) {
			this.input = this.incentiveBeneficiary;
			{
			}
		}
		this.output = this.incentiveBeneficiaryOutput;
	}


	override loadForm(): void {
		this._newUpdateForm = this._formBuilder.group({
			id: [null],
			description: [null, [ Validators.required,  ]],
			active: [false, [  ]],
		});

	}

	override prepareResult(): MbsIncentiveBeneficiaryDto {
		let result: MbsIncentiveBeneficiaryDto = this._newUpdateForm.value;
		{
		}
		return result;
	}

	override async sendToBackEnd(request: MbsIncentiveBeneficiaryDto) {
		try {
			let postOrPut: string;
			if (request.id != null && request.id > 0) {
				await lastValueFrom(this.incentiveBeneficiaryResourceService.updateIncentiveBeneficiaryUsingPUT(request));
				postOrPut = "updated";
			} else {
				request.id = undefined;
				await lastValueFrom(this.incentiveBeneficiaryResourceService.createIncentiveBeneficiaryUsingPOST(request));
				postOrPut = "created";
			}
			this._result = request;

			this.ecs.eventer.launchReloadContent("incentiveBeneficiary");
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

	protected newIncentiveBeneficiary() {
		//this._incentiveBeneficiary = null;
		this.incentiveBeneficiaryOutput.emit(this.incentiveBeneficiary);
		this.setStep(EngeEngeFormStep.FORM);
	}
}
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { lastValueFrom, Observable } from 'rxjs';

import { EngeCommonService, EngeEngeFormStep, EngeLibGenericForm, EngeValidator } from '@enge/common-lib';

import { MbsIncentiveAutocompleteService } from '@mbs-incentive/service/incentive-auto-complete.service';
import { MbsBeneficiaryResourceService } from '@mbs-incentive/services/beneficiary.service';
import { MbsBeneficiaryDto } from '@mbs-incentive/class/beneficiary-dto.class';

@Component({
	selector: 'mbs-beneficiary-new-update-form',
	templateUrl: './beneficiary-new-update-form.component.html',
	styleUrls: ['./beneficiary-new-update-form.component.scss']
})
export class MbsBeneficiaryNewUpdateFormComponent extends EngeLibGenericForm {
	@Input() beneficiary: MbsBeneficiaryDto | undefined;
	@Output() beneficiaryOutput: EventEmitter<MbsBeneficiaryDto> = new EventEmitter<MbsBeneficiaryDto>();
	

	constructor(
		ecs: EngeCommonService,
		private _formBuilder: FormBuilder,
		private beneficiaryResourceService: MbsBeneficiaryResourceService, 
		protected mbsIncentiveAutocompleteService: MbsIncentiveAutocompleteService,
	) { super(ecs); }

	override loadVariables(): void {
		if(this.beneficiary !== undefined) {
			this.input = this.beneficiary;
			{
			}
		}
		this.output = this.beneficiaryOutput;
	}


	override loadForm(): void {
		this._newUpdateForm = this._formBuilder.group({
			id: [null],
			name: [null, [ Validators.required,  ]],
		});

	}

	override prepareResult(): MbsBeneficiaryDto {
		let result: MbsBeneficiaryDto = this._newUpdateForm.value;
		{
		}
		return result;
	}

	override async sendToBackEnd(request: MbsBeneficiaryDto) {
		try {
			let postOrPut: string;
			if (request.id != null && request.id > 0) {
				await lastValueFrom(this.beneficiaryResourceService.updateBeneficiaryUsingPUT(request));
				postOrPut = "updated";
			} else {
				request.id = undefined;
				await lastValueFrom(this.beneficiaryResourceService.createBeneficiaryUsingPOST(request));
				postOrPut = "created";
			}
			this._result = request;

			this.ecs.eventer.launchReloadContent("beneficiary");
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

	protected newBeneficiary() {
		//this._beneficiary = null;
		this.beneficiaryOutput.emit(this.beneficiary);
		this.setStep(EngeEngeFormStep.FORM);
	}
}
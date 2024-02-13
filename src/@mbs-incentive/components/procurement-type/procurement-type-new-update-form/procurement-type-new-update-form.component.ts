import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { lastValueFrom, Observable } from 'rxjs';

import { EngeCommonService, EngeEngeFormStep, EngeLibGenericForm, EngeValidator } from '@enge/common-lib';

import { MbsIncentiveAutocompleteService } from '@mbs-incentive/service/incentive-auto-complete.service';
import { MbsProcurementTypeResourceService } from '@mbs-incentive/services/procurement-type.service';
import { MbsProcurementTypeDto } from '@mbs-incentive/class/procurement-type-dto.class';

@Component({
	selector: 'mbs-procurement-type-new-update-form',
	templateUrl: './procurement-type-new-update-form.component.html',
	styleUrls: ['./procurement-type-new-update-form.component.scss']
})
export class MbsProcurementTypeNewUpdateFormComponent extends EngeLibGenericForm {
	@Input() procurementType: MbsProcurementTypeDto | undefined;
	@Output() procurementTypeOutput: EventEmitter<MbsProcurementTypeDto> = new EventEmitter<MbsProcurementTypeDto>();
	

	constructor(
		ecs: EngeCommonService,
		private _formBuilder: FormBuilder,
		private procurementTypeResourceService: MbsProcurementTypeResourceService, 
		protected mbsIncentiveAutocompleteService: MbsIncentiveAutocompleteService,
	) { super(ecs); }

	override loadVariables(): void {
		if(this.procurementType !== undefined) {
			this.input = this.procurementType;
			{
			}
		}
		this.output = this.procurementTypeOutput;
	}


	override loadForm(): void {
		this._newUpdateForm = this._formBuilder.group({
			id: [null],
			description: [null, [ Validators.required,  ]],
		});

	}

	override prepareResult(): MbsProcurementTypeDto {
		let result: MbsProcurementTypeDto = this._newUpdateForm.value;
		{
		}
		return result;
	}

	override async sendToBackEnd(request: MbsProcurementTypeDto) {
		try {
			let postOrPut: string;
			if (request.id != null && request.id > 0) {
				await lastValueFrom(this.procurementTypeResourceService.updateProcurementTypeUsingPUT(request));
				postOrPut = "updated";
			} else {
				request.id = undefined;
				await lastValueFrom(this.procurementTypeResourceService.createProcurementTypeUsingPOST(request));
				postOrPut = "created";
			}
			this._result = request;

			this.ecs.eventer.launchReloadContent("procurementType");
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

	protected newProcurementType() {
		//this._procurementType = null;
		this.procurementTypeOutput.emit(this.procurementType);
		this.setStep(EngeEngeFormStep.FORM);
	}
}
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { lastValueFrom, Observable } from 'rxjs';

import { EngeCommonService, EngeEngeFormStep, EngeLibGenericForm, EngeValidator } from '@enge/common-lib';

import { MbsMainAutocompleteService } from '@mbs-main/service/main-auto-complete.service';
import { MbsOperationTypeResourceService } from '@mbs-main/services/operation-type.service';
import { MbsOperationTypeDto } from '@mbs-main/class/operation-type-dto.class';

@Component({
	selector: 'mbs-operation-type-new-update-form',
	templateUrl: './operation-type-new-update-form.component.html',
	styleUrls: ['./operation-type-new-update-form.component.scss']
})
export class MbsOperationTypeNewUpdateFormComponent extends EngeLibGenericForm {
	@Input() operationType: MbsOperationTypeDto | undefined;
	@Output() operationTypeOutput: EventEmitter<MbsOperationTypeDto> = new EventEmitter<MbsOperationTypeDto>();
	

	constructor(
		ecs: EngeCommonService,
		private _formBuilder: FormBuilder,
		private operationTypeResourceService: MbsOperationTypeResourceService, 
		private mbsMainAutocompleteService: MbsMainAutocompleteService,
	) { super(ecs); }

	override loadVariables(): void {
		if(this.operationType !== undefined) {
			this.input = this.operationType;
			{
			}
		}
		this.output = this.operationTypeOutput;
	}


	override loadForm(): void {
		this._newUpdateForm = this._formBuilder.group({
			id: [null],
			description: [null, [ Validators.required,  ]],
		});

	}

	override prepareResult(): MbsOperationTypeDto {
		let result: MbsOperationTypeDto = this._newUpdateForm.value;
		{
		}
		return result;
	}

	override async sendToBackEnd(request: MbsOperationTypeDto) {
		try {
			let postOrPut: string;
			if (request.id != null && request.id > 0) {
				await lastValueFrom(this.operationTypeResourceService.updateOperationTypeUsingPUT(request));
				postOrPut = "updated";
			} else {
				request.id = undefined;
				await lastValueFrom(this.operationTypeResourceService.createOperationTypeUsingPOST(request));
				postOrPut = "created";
			}
			this._result = request;

			this.ecs.eventer.launchReloadContent("operationType");
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

	protected newOperationType() {
		//this._operationType = null;
		this.operationTypeOutput.emit(this.operationType);
		this.setStep(EngeEngeFormStep.FORM);
	}
}
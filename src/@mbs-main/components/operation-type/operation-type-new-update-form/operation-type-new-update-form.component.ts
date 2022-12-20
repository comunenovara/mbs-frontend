import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { lastValueFrom, Observable } from 'rxjs';

import { AgalCommonService } from '@agal-core/services/common.service';
import { AgalGenericForm, FormStep } from '@agal-core/components/agal-generic-form';

import { MbsMainAutocompleteService } from '@mbs-main/service/main-auto-complete.service';
import { MbsOperationTypeResourceService } from '@mbs-main/services/operation-type.service';
import { MbsOperationTypeDto } from '@mbs-main/class/operation-type-dto.class';

@Component({
	selector: 'mbs-operation-type-new-update-form',
	templateUrl: './operation-type-new-update-form.component.html',
	styleUrls: ['./operation-type-new-update-form.component.scss']
})
export class MbsOperationTypeNewUpdateFormComponent extends AgalGenericForm {
	@Input() operationType: MbsOperationTypeDto | undefined;
	@Output() operationTypeOutput: EventEmitter<MbsOperationTypeDto> = new EventEmitter<MbsOperationTypeDto>();
	

	constructor(
		agcs: AgalCommonService,
		private _formBuilder: FormBuilder,
		private operationTypeResourceService: MbsOperationTypeResourceService, 
		private mbsMainAutocompleteService: MbsMainAutocompleteService,
	) { super(agcs); }

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

			this.agcs.eventer.launchReloadContent("operationType");
			this.setStep(FormStep.COMPLETE);

		} catch (e: any) {
			this.agcs.eventer.launchMessage({
				severity: "error",
				text: e.error.message,
				duration: 5000
			});
			this.setStep(FormStep.FORM);
		}
	}

	protected newOperationType() {
		//this._operationType = null;
		this.operationTypeOutput.emit(this.operationType);
		this.setStep(FormStep.FORM);
	}
}
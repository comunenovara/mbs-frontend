import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { lastValueFrom, Observable } from 'rxjs';

import { EngeCommonService, EngeEngeFormStep, EngeGenericForm, EngeValidator } from '@enge/common-lib';

import { MbsMainAutocompleteService } from '@mbs-main/service/main-auto-complete.service';
import { MbsOperationResourceService } from '@mbs-main/services/operation.service';
import { MbsOperationDto } from '@mbs-main/class/operation-dto.class';
import { MbsOperationTypeDto } from '@mbs-main/class/operation-type-dto.class';
import { MbsAssetDto } from '@mbs-main/class/asset-dto.class';

@Component({
	selector: 'mbs-operation-new-update-form',
	templateUrl: './operation-new-update-form.component.html',
	styleUrls: ['./operation-new-update-form.component.scss']
})
export class MbsOperationNewUpdateFormComponent extends EngeGenericForm {
	@Input() operation: MbsOperationDto | undefined;
	@Output() operationOutput: EventEmitter<MbsOperationDto> = new EventEmitter<MbsOperationDto>();
	
	@Input() type: MbsOperationTypeDto | undefined;
	@Input() asset: MbsAssetDto | undefined;

	constructor(
		ecs: EngeCommonService,
		private _formBuilder: FormBuilder,
		private operationResourceService: MbsOperationResourceService, 
		private mbsMainAutocompleteService: MbsMainAutocompleteService,
	) { super(ecs); }

	override loadVariables(): void {
		if(this.operation !== undefined) {
			this.input = this.operation;
			{
				if(this.input.startDate != null) this.input.startDate = new Date(this.input.startDate);
				if(this.input.endDate != null) this.input.endDate = new Date(this.input.endDate);
			}
		}
		this.output = this.operationOutput;
	}

	_filteredType: Observable<MbsOperationTypeDto[]>;
	_filteredAsset: Observable<MbsAssetDto[]>;

	override loadForm(): void {
		this._newUpdateForm = this._formBuilder.group({
			id: [null],
			description: [null, [ Validators.required,  ]],
			value: [null, [  ]],
			startDate: [null, [  ]],
			endDate: [null, [  ]],
			type: [this.type, [ EngeValidator.haveId,  ]],
			asset: [this.asset, [ EngeValidator.haveId,  ]],
		});

		this._filteredType = this.mbsMainAutocompleteService.filterOperationType(this._newUpdateForm.controls['type'].valueChanges);
		this._filteredAsset = this.mbsMainAutocompleteService.filterAsset(this._newUpdateForm.controls['asset'].valueChanges);
	}

	override prepareResult(): MbsOperationDto {
		let result: MbsOperationDto = this._newUpdateForm.value;
		{
			result.value = (result.value != null) ? +result.value : null;
			result.typeId = (result.type != null) ? result.type.id : undefined;
			result.assetId = (result.asset != null) ? result.asset.id : undefined;
		}
		return result;
	}

	override async sendToBackEnd(request: MbsOperationDto) {
		try {
			let postOrPut: string;
			if (request.id != null && request.id > 0) {
				await lastValueFrom(this.operationResourceService.updateOperationUsingPUT(request));
				postOrPut = "updated";
			} else {
				request.id = undefined;
				await lastValueFrom(this.operationResourceService.createOperationUsingPOST(request));
				postOrPut = "created";
			}
			this._result = request;

			this.ecs.eventer.launchReloadContent("operation");
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

	protected newOperation() {
		//this._operation = null;
		this.operationOutput.emit(this.operation);
		this.setStep(EngeEngeFormStep.FORM);
	}
}
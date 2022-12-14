import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { lastValueFrom, Observable } from 'rxjs';

import { AgalCommonService } from '@agal-core/services/common.service';
import { AgalGenericForm, FormStep } from '@agal-core/components/agal-generic-form';
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
export class MbsOperationNewUpdateFormComponent extends AgalGenericForm {
	@Input() operation: MbsOperationDto;
	@Output() operationOutput: EventEmitter<MbsOperationDto> = new EventEmitter<MbsOperationDto>();
	
	constructor(
        agcs: AgalCommonService,
		private _formBuilder: FormBuilder,
		private operationResourceService: MbsOperationResourceService, 
		private mbsMainAutocompleteService: MbsMainAutocompleteService,
    ) { super(agcs); }

/* VIEW VARIABLES*/
	displayFn: Function = (selectedElement: any) => {
        return selectedElement.description;
    };
/* */

	override loadVariables(): void {
		this.input = this.operation;
		this.output = this.operationOutput;
	}

	_filteredType: Observable<MbsOperationTypeDto[]>;
	_filteredAsset: Observable<MbsAssetDto[]>;

	override loadForm(): void {
		this._newUpdateForm = this._formBuilder.group({
			id: [null],
			description: [null, []],
			value: [null, []],
			startDate: [null, []],
			endDate: [null, []],
			type: [null, []],
			asset: [null, []],
		});

		this._filteredType = this.mbsMainAutocompleteService.filterOperationType(this._newUpdateForm.controls['type'].valueChanges);
		this._filteredAsset = this.mbsMainAutocompleteService.filterAsset(this._newUpdateForm.controls['asset'].valueChanges);
	}

	override prepareResult(): MbsOperationDto {
		let result: MbsOperationDto = this._newUpdateForm.value;
		{
			result.typeId = result.type.id;
			result.assetId = result.asset.id;
		}
		return result;
	}

	override async sendToBackEnd(request: MbsOperationDto) {
		try {
			let postOrPut: string;
			if (request.id != 0) {
				await lastValueFrom(this.operationResourceService.updateOperationUsingPUT(request));
				postOrPut = "updated";
			} else {
				await lastValueFrom(this.operationResourceService.createOperationUsingPOST(request));
				postOrPut = "created";
			}
			this._result = request;

			this.agcs.eventer.launchReloadContent(this._result);
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

	protected newOperation() {
		//this._operation = null;
		this.operationOutput.emit(this.operation);
		this.setStep(FormStep.FORM);
	}
}
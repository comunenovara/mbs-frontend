import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { lastValueFrom, Observable } from 'rxjs';

import { AgalCommonService } from '@agal-core/services/common.service';
import { AgalGenericForm, FormStep } from '@agal-core/components/agal-generic-form';

import { MbsMainAutocompleteService } from '@mbs-main/service/main-auto-complete.service';
import { MbsAssetResourceService } from '@mbs-main/services/asset.service';
import { MbsAssetDto } from '@mbs-main/class/asset-dto.class';

@Component({
	selector: 'mbs-asset-new-update-form',
	templateUrl: './asset-new-update-form.component.html',
	styleUrls: ['./asset-new-update-form.component.scss']
})
export class MbsAssetNewUpdateFormComponent extends AgalGenericForm {
	@Input() asset: MbsAssetDto;
	@Output() assetOutput: EventEmitter<MbsAssetDto> = new EventEmitter<MbsAssetDto>();
	
	constructor(
		agcs: AgalCommonService,
		private _formBuilder: FormBuilder,
		private assetResourceService: MbsAssetResourceService, 
		private mbsMainAutocompleteService: MbsMainAutocompleteService,
	) { super(agcs); }

	override loadVariables(): void {
		this.input = this.asset;
		this.output = this.assetOutput;
	}


	override loadForm(): void {
		this._newUpdateForm = this._formBuilder.group({
			id: [null],
			description: [null, []],
			address: [null, []],
			mq: [null, []],
		});

	}

	override prepareResult(): MbsAssetDto {
		let result: MbsAssetDto = this._newUpdateForm.value;
		{
			result.mq = +result.mq;
		}
		return result;
	}

	override async sendToBackEnd(request: MbsAssetDto) {
		try {
			let postOrPut: string;
			if (request.id != null && request.id > 0) {
				await lastValueFrom(this.assetResourceService.updateAssetUsingPUT(request));
				postOrPut = "updated";
			} else {
				request.id = undefined;
				await lastValueFrom(this.assetResourceService.createAssetUsingPOST(request));
				postOrPut = "created";
			}
			this._result = request;

			this.agcs.eventer.launchReloadContent("asset");
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

	protected newAsset() {
		//this._asset = null;
		this.assetOutput.emit(this.asset);
		this.setStep(FormStep.FORM);
	}
}
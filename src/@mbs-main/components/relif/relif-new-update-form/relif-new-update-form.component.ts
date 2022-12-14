import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { lastValueFrom, Observable } from 'rxjs';

import { AgalCommonService } from '@agal-core/services/common.service';
import { AgalGenericForm, FormStep } from '@agal-core/components/agal-generic-form';

import { MbsMainAutocompleteService } from '@mbs-main/service/main-auto-complete.service';
import { MbsRelifResourceService } from '@mbs-main/services/relif.service';
import { MbsRelifDto } from '@mbs-main/class/relif-dto.class';
import { MbsAssetDto } from '@mbs-main/class/asset-dto.class';

@Component({
	selector: 'mbs-relif-new-update-form',
	templateUrl: './relif-new-update-form.component.html',
	styleUrls: ['./relif-new-update-form.component.scss']
})
export class MbsRelifNewUpdateFormComponent extends AgalGenericForm {
	@Input() relif: MbsRelifDto;
	@Output() relifOutput: EventEmitter<MbsRelifDto> = new EventEmitter<MbsRelifDto>();
	
	constructor(
		agcs: AgalCommonService,
		private _formBuilder: FormBuilder,
		private relifResourceService: MbsRelifResourceService, 
		private mbsMainAutocompleteService: MbsMainAutocompleteService,
	) { super(agcs); }

	override loadVariables(): void {
		this.input = this.relif;
		this.output = this.relifOutput;
	}

	_filteredAsset: Observable<MbsAssetDto[]>;

	override loadForm(): void {
		this._newUpdateForm = this._formBuilder.group({
			id: [null],
			description: [null, []],
			startDate: [null, []],
			endDate: [null, []],
			asset: [null, []],
		});

		this._filteredAsset = this.mbsMainAutocompleteService.filterAsset(this._newUpdateForm.controls['asset'].valueChanges);
	}

	override prepareResult(): MbsRelifDto {
		let result: MbsRelifDto = this._newUpdateForm.value;
		{
			result.assetId = result.asset.id;
		}
		return result;
	}

	override async sendToBackEnd(request: MbsRelifDto) {
		try {
			let postOrPut: string;
			if (request.id != 0) {
				await lastValueFrom(this.relifResourceService.updateRelifUsingPUT(request));
				postOrPut = "updated";
			} else {
				await lastValueFrom(this.relifResourceService.createRelifUsingPOST(request));
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

	protected newRelif() {
		//this._relif = null;
		this.relifOutput.emit(this.relif);
		this.setStep(FormStep.FORM);
	}
}
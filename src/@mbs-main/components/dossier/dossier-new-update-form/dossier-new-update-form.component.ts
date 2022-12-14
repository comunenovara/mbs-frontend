import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { lastValueFrom, Observable } from 'rxjs';

import { AgalCommonService } from '@agal-core/services/common.service';
import { AgalGenericForm, FormStep } from '@agal-core/components/agal-generic-form';

import { MbsMainAutocompleteService } from '@mbs-main/service/main-auto-complete.service';
import { MbsDossierResourceService } from '@mbs-main/services/dossier.service';
import { MbsDossierDto } from '@mbs-main/class/dossier-dto.class';
import { MbsDossierTypeDto } from '@mbs-main/class/dossier-type-dto.class';
import { MbsAssetDto } from '@mbs-main/class/asset-dto.class';
import { MbsRelifDto } from '@mbs-main/class/relif-dto.class';
import { MbsOperationDto } from '@mbs-main/class/operation-dto.class';

@Component({
	selector: 'mbs-dossier-new-update-form',
	templateUrl: './dossier-new-update-form.component.html',
	styleUrls: ['./dossier-new-update-form.component.scss']
})
export class MbsDossierNewUpdateFormComponent extends AgalGenericForm {
	@Input() dossier: MbsDossierDto;
	@Output() dossierOutput: EventEmitter<MbsDossierDto> = new EventEmitter<MbsDossierDto>();
	
	constructor(
		agcs: AgalCommonService,
		private _formBuilder: FormBuilder,
		private dossierResourceService: MbsDossierResourceService, 
		private mbsMainAutocompleteService: MbsMainAutocompleteService,
	) { super(agcs); }

	override loadVariables(): void {
		this.input = this.dossier;
		this.output = this.dossierOutput;
	}

	_filteredType: Observable<MbsDossierTypeDto[]>;
	_filteredAsset: Observable<MbsAssetDto[]>;
	_filteredRelif: Observable<MbsRelifDto[]>;
	_filteredOperation: Observable<MbsOperationDto[]>;

	override loadForm(): void {
		this._newUpdateForm = this._formBuilder.group({
			id: [null],
			description: [null, []],
			type: [null, []],
			asset: [null, []],
			relif: [null, []],
			operation: [null, []],
		});

		this._filteredType = this.mbsMainAutocompleteService.filterDossierType(this._newUpdateForm.controls['type'].valueChanges);
		this._filteredAsset = this.mbsMainAutocompleteService.filterAsset(this._newUpdateForm.controls['asset'].valueChanges);
		this._filteredRelif = this.mbsMainAutocompleteService.filterRelif(this._newUpdateForm.controls['relif'].valueChanges);
		this._filteredOperation = this.mbsMainAutocompleteService.filterOperation(this._newUpdateForm.controls['operation'].valueChanges);
	}

	override prepareResult(): MbsDossierDto {
		let result: MbsDossierDto = this._newUpdateForm.value;
		{
			result.typeId = result.type.id;
			result.assetId = result.asset.id;
			result.relifId = result.relif.id;
			result.operationId = result.operation.id;
		}
		return result;
	}

	override async sendToBackEnd(request: MbsDossierDto) {
		try {
			let postOrPut: string;
			if (request.id != 0) {
				await lastValueFrom(this.dossierResourceService.updateDossierUsingPUT(request));
				postOrPut = "updated";
			} else {
				await lastValueFrom(this.dossierResourceService.createDossierUsingPOST(request));
				postOrPut = "created";
			}
			this._result = request;

			this.agcs.eventer.launchReloadContent("dossier");
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

	protected newDossier() {
		//this._dossier = null;
		this.dossierOutput.emit(this.dossier);
		this.setStep(FormStep.FORM);
	}
}
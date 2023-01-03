import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { lastValueFrom, Observable } from 'rxjs';

import { EngeCommonService, EngeEngeFormStep, EngeGenericForm, EngeValidator } from '@enge/common-lib';

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
export class MbsDossierNewUpdateFormComponent extends EngeGenericForm {
	@Input() dossier: MbsDossierDto | undefined;
	@Output() dossierOutput: EventEmitter<MbsDossierDto> = new EventEmitter<MbsDossierDto>();
	
	@Input() type: MbsDossierTypeDto | undefined;
	@Input() asset: MbsAssetDto | undefined;
	@Input() relif: MbsRelifDto | undefined;
	@Input() operation: MbsOperationDto | undefined;

	constructor(
		ecs: EngeCommonService,
		private _formBuilder: FormBuilder,
		private dossierResourceService: MbsDossierResourceService, 
		private mbsMainAutocompleteService: MbsMainAutocompleteService,
	) { super(ecs); }

	override loadVariables(): void {
		if(this.dossier !== undefined) {
			this.input = this.dossier;
			{
			}
		}
		this.output = this.dossierOutput;
	}

	_filteredType: Observable<MbsDossierTypeDto[]>;
	_filteredAsset: Observable<MbsAssetDto[]>;
	_filteredRelif: Observable<MbsRelifDto[]>;
	_filteredOperation: Observable<MbsOperationDto[]>;

	override loadForm(): void {
		this._newUpdateForm = this._formBuilder.group({
			id: [null],
			description: [null, [ Validators.required,  ]],
			type: [this.type, [ EngeValidator.haveId,  ]],
			asset: [this.asset, [  ]],
			relif: [this.relif, [  ]],
			operation: [this.operation, [  ]],
		});

		this._filteredType = this.mbsMainAutocompleteService.filterDossierType(this._newUpdateForm.controls['type'].valueChanges);
		this._filteredAsset = this.mbsMainAutocompleteService.filterAsset(this._newUpdateForm.controls['asset'].valueChanges);
		this._filteredRelif = this.mbsMainAutocompleteService.filterRelif(this._newUpdateForm.controls['relif'].valueChanges);
		this._filteredOperation = this.mbsMainAutocompleteService.filterOperation(this._newUpdateForm.controls['operation'].valueChanges);
	}

	override prepareResult(): MbsDossierDto {
		let result: MbsDossierDto = this._newUpdateForm.value;
		{
			result.typeId = (result.type != null) ? result.type.id : undefined;
			result.assetId = (result.asset != null) ? result.asset.id : undefined;
			result.relifId = (result.relif != null) ? result.relif.id : undefined;
			result.operationId = (result.operation != null) ? result.operation.id : undefined;
		}
		return result;
	}

	override async sendToBackEnd(request: MbsDossierDto) {
		try {
			let postOrPut: string;
			if (request.id != null && request.id > 0) {
				await lastValueFrom(this.dossierResourceService.updateDossierUsingPUT(request));
				postOrPut = "updated";
			} else {
				request.id = undefined;
				await lastValueFrom(this.dossierResourceService.createDossierUsingPOST(request));
				postOrPut = "created";
			}
			this._result = request;

			this.ecs.eventer.launchReloadContent("dossier");
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

	protected newDossier() {
		//this._dossier = null;
		this.dossierOutput.emit(this.dossier);
		this.setStep(EngeEngeFormStep.FORM);
	}
}
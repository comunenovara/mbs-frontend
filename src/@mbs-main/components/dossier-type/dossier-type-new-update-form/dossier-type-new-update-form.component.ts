import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { lastValueFrom, Observable } from 'rxjs';

import { AgalCommonService } from '@agal-core/services/common.service';
import { AgalGenericForm, FormStep } from '@agal-core/components/agal-generic-form';

import { MbsMainAutocompleteService } from '@mbs-main/service/main-auto-complete.service';
import { MbsDossierTypeResourceService } from '@mbs-main/services/dossier-type.service';
import { MbsDossierTypeDto } from '@mbs-main/class/dossier-type-dto.class';

@Component({
	selector: 'mbs-dossier-type-new-update-form',
	templateUrl: './dossier-type-new-update-form.component.html',
	styleUrls: ['./dossier-type-new-update-form.component.scss']
})
export class MbsDossierTypeNewUpdateFormComponent extends AgalGenericForm {
	@Input() dossierType: MbsDossierTypeDto;
	@Output() dossierTypeOutput: EventEmitter<MbsDossierTypeDto> = new EventEmitter<MbsDossierTypeDto>();
	
	constructor(
		agcs: AgalCommonService,
		private _formBuilder: FormBuilder,
		private dossierTypeResourceService: MbsDossierTypeResourceService, 
		private mbsMainAutocompleteService: MbsMainAutocompleteService,
	) { super(agcs); }

	override loadVariables(): void {
		this.input = this.dossierType;
		this.output = this.dossierTypeOutput;
	}


	override loadForm(): void {
		this._newUpdateForm = this._formBuilder.group({
			id: [null],
			description: [null, []],
			category: [null, []],
		});

	}

	override prepareResult(): MbsDossierTypeDto {
		let result: MbsDossierTypeDto = this._newUpdateForm.value;
		{
		}
		return result;
	}

	override async sendToBackEnd(request: MbsDossierTypeDto) {
		try {
			let postOrPut: string;
			if (request.id != 0) {
				await lastValueFrom(this.dossierTypeResourceService.updateDossierTypeUsingPUT(request));
				postOrPut = "updated";
			} else {
				await lastValueFrom(this.dossierTypeResourceService.createDossierTypeUsingPOST(request));
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

	protected newDossierType() {
		//this._dossierType = null;
		this.dossierTypeOutput.emit(this.dossierType);
		this.setStep(FormStep.FORM);
	}
}
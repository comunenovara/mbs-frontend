import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { lastValueFrom, Observable } from 'rxjs';

import { EngeCommonService, EngeEngeFormStep, EngeLibGenericForm, EngeValidator } from '@enge/common-lib';

import { MbsMainAutocompleteService } from '@mbs-main/service/main-auto-complete.service';
import { MbsDossierTypeResourceService } from '@mbs-main/services/dossier-type.service';
import { MbsDossierTypeDto } from '@mbs-main/class/dossier-type-dto.class';

@Component({
	selector: 'mbs-dossier-type-new-update-form',
	templateUrl: './dossier-type-new-update-form.component.html',
	styleUrls: ['./dossier-type-new-update-form.component.scss']
})
export class MbsDossierTypeNewUpdateFormComponent extends EngeLibGenericForm {
	@Input() dossierType: MbsDossierTypeDto | undefined;
	@Output() dossierTypeOutput: EventEmitter<MbsDossierTypeDto> = new EventEmitter<MbsDossierTypeDto>();
	

	constructor(
		ecs: EngeCommonService,
		private _formBuilder: FormBuilder,
		private dossierTypeResourceService: MbsDossierTypeResourceService, 
		private mbsMainAutocompleteService: MbsMainAutocompleteService,
	) { super(ecs); }

	override loadVariables(): void {
		if(this.dossierType !== undefined) {
			this.input = this.dossierType;
			{
			}
		}
		this.output = this.dossierTypeOutput;
	}


	override loadForm(): void {
		this._newUpdateForm = this._formBuilder.group({
			id: [null],
			description: [null, [ Validators.required,  ]],
			category: [null, [ Validators.required,  ]],
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
			if (request.id != null && request.id > 0) {
				await lastValueFrom(this.dossierTypeResourceService.updateDossierTypeUsingPUT(request));
				postOrPut = "updated";
			} else {
				request.id = undefined;
				await lastValueFrom(this.dossierTypeResourceService.createDossierTypeUsingPOST(request));
				postOrPut = "created";
			}
			this._result = request;

			this.ecs.eventer.launchReloadContent("dossierType");
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

	protected newDossierType() {
		//this._dossierType = null;
		this.dossierTypeOutput.emit(this.dossierType);
		this.setStep(EngeEngeFormStep.FORM);
	}
}
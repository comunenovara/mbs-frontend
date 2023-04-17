import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { lastValueFrom, Observable } from 'rxjs';

import { EngeCommonService, EngeEngeFormStep, EngeLibGenericForm, EngeValidator } from '@enge/common-lib';

import { MbsWorkAutocompleteService } from '@mbs-work/service/work-auto-complete.service';
import { MbsProgettoResourceService } from '@mbs-work/services/progetto.service';
import { MbsProgettoDto } from '@mbs-work/class/progetto-dto.class';

@Component({
	selector: 'mbs-progetto-new-update-form',
	templateUrl: './progetto-new-update-form.component.html',
	styleUrls: ['./progetto-new-update-form.component.scss']
})
export class MbsProgettoNewUpdateFormComponent extends EngeLibGenericForm {
	@Input() progetto: MbsProgettoDto | undefined;
	@Output() progettoOutput: EventEmitter<MbsProgettoDto> = new EventEmitter<MbsProgettoDto>();
	

	constructor(
		ecs: EngeCommonService,
		private _formBuilder: FormBuilder,
		private progettoResourceService: MbsProgettoResourceService, 
		protected mbsWorkAutocompleteService: MbsWorkAutocompleteService,
	) { super(ecs); }

	override loadVariables(): void {
		if(this.progetto !== undefined) {
			this.input = this.progetto;
			{
			}
		}
		this.output = this.progettoOutput;
	}


	override loadForm(): void {
		this._newUpdateForm = this._formBuilder.group({
			id: [null],
			name: [null, [ Validators.required,  ]],
		});

	}

	override prepareResult(): MbsProgettoDto {
		let result: MbsProgettoDto = this._newUpdateForm.value;
		{
		}
		return result;
	}

	override async sendToBackEnd(request: MbsProgettoDto) {
		try {
			let postOrPut: string;
			if (request.id != null && request.id > 0) {
				await lastValueFrom(this.progettoResourceService.updateProgettoUsingPUT(request));
				postOrPut = "updated";
			} else {
				request.id = undefined;
				await lastValueFrom(this.progettoResourceService.createProgettoUsingPOST(request));
				postOrPut = "created";
			}
			this._result = request;

			this.ecs.eventer.launchReloadContent("progetto");
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

	protected newProgetto() {
		//this._progetto = null;
		this.progettoOutput.emit(this.progetto);
		this.setStep(EngeEngeFormStep.FORM);
	}
}
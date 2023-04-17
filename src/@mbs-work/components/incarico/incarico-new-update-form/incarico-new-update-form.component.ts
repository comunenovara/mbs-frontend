import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { lastValueFrom, Observable } from 'rxjs';

import { EngeCommonService, EngeEngeFormStep, EngeLibGenericForm, EngeValidator } from '@enge/common-lib';

import { MbsWorkAutocompleteService } from '@mbs-work/service/work-auto-complete.service';
import { MbsIncaricoResourceService } from '@mbs-work/services/incarico.service';
import { MbsIncaricoDto } from '@mbs-work/class/incarico-dto.class';

@Component({
	selector: 'mbs-incarico-new-update-form',
	templateUrl: './incarico-new-update-form.component.html',
	styleUrls: ['./incarico-new-update-form.component.scss']
})
export class MbsIncaricoNewUpdateFormComponent extends EngeLibGenericForm {
	@Input() incarico: MbsIncaricoDto | undefined;
	@Output() incaricoOutput: EventEmitter<MbsIncaricoDto> = new EventEmitter<MbsIncaricoDto>();
	

	constructor(
		ecs: EngeCommonService,
		private _formBuilder: FormBuilder,
		private incaricoResourceService: MbsIncaricoResourceService, 
		protected mbsWorkAutocompleteService: MbsWorkAutocompleteService,
	) { super(ecs); }

	override loadVariables(): void {
		if(this.incarico !== undefined) {
			this.input = this.incarico;
			{
			}
		}
		this.output = this.incaricoOutput;
	}


	override loadForm(): void {
		this._newUpdateForm = this._formBuilder.group({
			id: [null],
			name: [null, [ Validators.required,  ]],
		});

	}

	override prepareResult(): MbsIncaricoDto {
		let result: MbsIncaricoDto = this._newUpdateForm.value;
		{
		}
		return result;
	}

	override async sendToBackEnd(request: MbsIncaricoDto) {
		try {
			let postOrPut: string;
			if (request.id != null && request.id > 0) {
				await lastValueFrom(this.incaricoResourceService.updateIncaricoUsingPUT(request));
				postOrPut = "updated";
			} else {
				request.id = undefined;
				await lastValueFrom(this.incaricoResourceService.createIncaricoUsingPOST(request));
				postOrPut = "created";
			}
			this._result = request;

			this.ecs.eventer.launchReloadContent("incarico");
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

	protected newIncarico() {
		//this._incarico = null;
		this.incaricoOutput.emit(this.incarico);
		this.setStep(EngeEngeFormStep.FORM);
	}
}
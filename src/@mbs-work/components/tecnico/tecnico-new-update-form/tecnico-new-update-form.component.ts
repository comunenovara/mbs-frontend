import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { lastValueFrom, Observable } from 'rxjs';

import { EngeCommonService, EngeEngeFormStep, EngeLibGenericForm, EngeValidator } from '@enge/common-lib';

import { MbsWorkAutocompleteService } from '@mbs-work/service/work-auto-complete.service';
import { MbsTecnicoResourceService } from '@mbs-work/services/tecnico.service';
import { MbsTecnicoDto } from '@mbs-work/class/tecnico-dto.class';

@Component({
	selector: 'mbs-tecnico-new-update-form',
	templateUrl: './tecnico-new-update-form.component.html',
	styleUrls: ['./tecnico-new-update-form.component.scss']
})
export class MbsTecnicoNewUpdateFormComponent extends EngeLibGenericForm {
	@Input() tecnico: MbsTecnicoDto | undefined;
	@Output() tecnicoOutput: EventEmitter<MbsTecnicoDto> = new EventEmitter<MbsTecnicoDto>();
	

	constructor(
		ecs: EngeCommonService,
		private _formBuilder: FormBuilder,
		private tecnicoResourceService: MbsTecnicoResourceService, 
		protected mbsWorkAutocompleteService: MbsWorkAutocompleteService,
	) { super(ecs); }

	override loadVariables(): void {
		if(this.tecnico !== undefined) {
			this.input = this.tecnico;
			{
			}
		}
		this.output = this.tecnicoOutput;
	}


	override loadForm(): void {
		this._newUpdateForm = this._formBuilder.group({
			id: [null],
			name: [null, [ Validators.required,  ]],
		});

	}

	override prepareResult(): MbsTecnicoDto {
		let result: MbsTecnicoDto = this._newUpdateForm.value;
		{
		}
		return result;
	}

	override async sendToBackEnd(request: MbsTecnicoDto) {
		try {
			let postOrPut: string;
			if (request.id != null && request.id > 0) {
				await lastValueFrom(this.tecnicoResourceService.updateTecnicoUsingPUT(request));
				postOrPut = "updated";
			} else {
				request.id = undefined;
				await lastValueFrom(this.tecnicoResourceService.createTecnicoUsingPOST(request));
				postOrPut = "created";
			}
			this._result = request;

			this.ecs.eventer.launchReloadContent("tecnico");
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

	protected newTecnico() {
		//this._tecnico = null;
		this.tecnicoOutput.emit(this.tecnico);
		this.setStep(EngeEngeFormStep.FORM);
	}
}
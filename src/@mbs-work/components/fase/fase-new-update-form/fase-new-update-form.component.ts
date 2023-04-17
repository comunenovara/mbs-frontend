import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { lastValueFrom, Observable } from 'rxjs';

import { EngeCommonService, EngeEngeFormStep, EngeLibGenericForm, EngeValidator } from '@enge/common-lib';

import { MbsWorkAutocompleteService } from '@mbs-work/service/work-auto-complete.service';
import { MbsFaseResourceService } from '@mbs-work/services/fase.service';
import { MbsFaseDto } from '@mbs-work/class/fase-dto.class';

@Component({
	selector: 'mbs-fase-new-update-form',
	templateUrl: './fase-new-update-form.component.html',
	styleUrls: ['./fase-new-update-form.component.scss']
})
export class MbsFaseNewUpdateFormComponent extends EngeLibGenericForm {
	@Input() fase: MbsFaseDto | undefined;
	@Output() faseOutput: EventEmitter<MbsFaseDto> = new EventEmitter<MbsFaseDto>();
	

	constructor(
		ecs: EngeCommonService,
		private _formBuilder: FormBuilder,
		private faseResourceService: MbsFaseResourceService, 
		protected mbsWorkAutocompleteService: MbsWorkAutocompleteService,
	) { super(ecs); }

	override loadVariables(): void {
		if(this.fase !== undefined) {
			this.input = this.fase;
			{
			}
		}
		this.output = this.faseOutput;
	}


	override loadForm(): void {
		this._newUpdateForm = this._formBuilder.group({
			id: [null],
			name: [null, [ Validators.required,  ]],
		});

	}

	override prepareResult(): MbsFaseDto {
		let result: MbsFaseDto = this._newUpdateForm.value;
		{
		}
		return result;
	}

	override async sendToBackEnd(request: MbsFaseDto) {
		try {
			let postOrPut: string;
			if (request.id != null && request.id > 0) {
				await lastValueFrom(this.faseResourceService.updateFaseUsingPUT(request));
				postOrPut = "updated";
			} else {
				request.id = undefined;
				await lastValueFrom(this.faseResourceService.createFaseUsingPOST(request));
				postOrPut = "created";
			}
			this._result = request;

			this.ecs.eventer.launchReloadContent("fase");
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

	protected newFase() {
		//this._fase = null;
		this.faseOutput.emit(this.fase);
		this.setStep(EngeEngeFormStep.FORM);
	}
}
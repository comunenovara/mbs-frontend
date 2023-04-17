import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { lastValueFrom, Observable } from 'rxjs';

import { EngeCommonService, EngeEngeFormStep, EngeLibGenericForm, EngeValidator } from '@enge/common-lib';

import { MbsWorkAutocompleteService } from '@mbs-work/service/work-auto-complete.service';
import { MbsAziendaResourceService } from '@mbs-work/services/azienda.service';
import { MbsAziendaDto } from '@mbs-work/class/azienda-dto.class';

@Component({
	selector: 'mbs-azienda-new-update-form',
	templateUrl: './azienda-new-update-form.component.html',
	styleUrls: ['./azienda-new-update-form.component.scss']
})
export class MbsAziendaNewUpdateFormComponent extends EngeLibGenericForm {
	@Input() azienda: MbsAziendaDto | undefined;
	@Output() aziendaOutput: EventEmitter<MbsAziendaDto> = new EventEmitter<MbsAziendaDto>();
	

	constructor(
		ecs: EngeCommonService,
		private _formBuilder: FormBuilder,
		private aziendaResourceService: MbsAziendaResourceService, 
		protected mbsWorkAutocompleteService: MbsWorkAutocompleteService,
	) { super(ecs); }

	override loadVariables(): void {
		if(this.azienda !== undefined) {
			this.input = this.azienda;
			{
			}
		}
		this.output = this.aziendaOutput;
	}


	override loadForm(): void {
		this._newUpdateForm = this._formBuilder.group({
			id: [null],
			name: [null, [ Validators.required,  ]],
		});

	}

	override prepareResult(): MbsAziendaDto {
		let result: MbsAziendaDto = this._newUpdateForm.value;
		{
		}
		return result;
	}

	override async sendToBackEnd(request: MbsAziendaDto) {
		try {
			let postOrPut: string;
			if (request.id != null && request.id > 0) {
				await lastValueFrom(this.aziendaResourceService.updateAziendaUsingPUT(request));
				postOrPut = "updated";
			} else {
				request.id = undefined;
				await lastValueFrom(this.aziendaResourceService.createAziendaUsingPOST(request));
				postOrPut = "created";
			}
			this._result = request;

			this.ecs.eventer.launchReloadContent("azienda");
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

	protected newAzienda() {
		//this._azienda = null;
		this.aziendaOutput.emit(this.azienda);
		this.setStep(EngeEngeFormStep.FORM);
	}
}
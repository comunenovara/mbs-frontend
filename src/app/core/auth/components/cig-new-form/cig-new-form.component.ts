import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { lastValueFrom, Observable } from 'rxjs';

import { EngeCommonService, EngeEngeFormStep, EngeLibGenericForm, EngeValidator } from '@enge/common-lib';
import { CreateCigService } from '../../create-cig.service';

@Component({
	selector: 'mbs-cig-new-form',
	templateUrl: './cig-new-form.component.html'
})
export class MbsCigNewFormComponent extends EngeLibGenericForm {
	constructor(
		ecs: EngeCommonService,
		private _formBuilder: FormBuilder,
		private createCigService: CreateCigService,
	) { super(ecs); }

	override loadForm(): void {
		this._newUpdateForm = this._formBuilder.group({
			id: [null],
			year: [null, [ Validators.required, Validators.minLength(4), Validators.maxLength(4) ]],
			cig: [null, [ Validators.required, ]],
			description: [null, [ Validators.required, ]],
		});
	}

	override prepareResult(): any {
		let result: any = this._newUpdateForm.value;
		{
		}
		return result;
	}

	override async sendToBackEnd(request: any) {
		try {
			let postOrPut: string;
			if (request.id != null && request.id > 0) {
				//NON SI FA UPDATE
				postOrPut = "updated";
			} else {
				request.id = undefined;
				this._result = await lastValueFrom(this.createCigService.createCigUsingGET(request.year, request.cig, request.description));
				postOrPut = "created";
			}
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

	protected newCig() {
		this.setStep(EngeEngeFormStep.FORM);
	}
}
import { Directive, Input, Output } from "@angular/core";
import { EventEmitter } from '@angular/core';
import { AbstractControl, FormGroup } from "@angular/forms";

import { EngeLibGenericComponent } from "./generic.component";
import { EngeCommonService } from "../services/common.service";

export enum EngeEngeFormStep {
	FORM, LOADING, COMPLETE
}

@Directive()
export abstract class EngeLibGenericForm extends EngeLibGenericComponent {
	@Input() returnToParent: boolean = false;
	input: any;
	output: EventEmitter<any>;

	constructor(
		ecs: EngeCommonService,
	) { super(ecs); }

	private step: EngeEngeFormStep = EngeEngeFormStep.FORM;
	public formStep = EngeEngeFormStep;

	protected _isUpdate: boolean = false;
	protected _newUpdateForm: FormGroup;
	protected _result: any;

	override init(): void {
		this.loadVariables();
		this.loadForm();
		this.precompileForm();
	}

	protected loadVariables() { };
	protected loadForm() { };

	private precompileForm() {
		if(this.input != null && this.input.id != null) {
			this._newUpdateForm.patchValue(this.input);
			this._isUpdate = true;
		}
	};

	protected setStep(step: EngeEngeFormStep) {
		this.step = step;
		switch (step) {
			case EngeEngeFormStep.LOADING: this.ecs.eventer.loadingStart(); break;
			default: this.ecs.eventer.loadingEnd(); break;
		}
	}

	stepIs(step: EngeEngeFormStep) {
		if(step === this.step) {
			return true;
		}
		return false;
	}

	submit() {
		if (!this._newUpdateForm.valid) {
			this._newUpdateForm.markAllAsTouched();
			for(let controlName in this._newUpdateForm.controls) {
				let control: AbstractControl = this._newUpdateForm.controls[controlName];
				control.markAsDirty();
			}
			return;
		}
		this.setStep(EngeEngeFormStep.LOADING);

		let formResult = this.prepareResult();

		if(this.returnToParent) {
			this.output.emit(formResult);
			this.setStep(EngeEngeFormStep.COMPLETE);
			return;
		}

		if(!this.returnToParent) {
			this.sendToBackEnd(formResult);
			return;
		}
	}

	isValid(control: AbstractControl): boolean {
		if(control.invalid && control.dirty) return false;
		return true;
	}

	checkControlError(control: AbstractControl, error: string): boolean {
		if(control.errors != null && control.errors[error] != null) return true;
		return false;
	}

	protected prepareResult() { }
	protected async sendToBackEnd(request: any) {}
}
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { lastValueFrom, Observable } from 'rxjs';

import { EngeCommonService, EngeEngeFormStep, EngeLibGenericForm, EngeValidator } from '@enge/common-lib';

import { MbsMainAutocompleteService } from '@mbs-main/service/main-auto-complete.service';
import { MbsGovernativeProjectResourceService } from '@mbs-main/services/governative-project.service';
import { MbsGovernativeProjectDto } from '@mbs-main/class/governative-project-dto.class';

@Component({
	selector: 'mbs-governative-project-new-update-form',
	templateUrl: './governative-project-new-update-form.component.html',
	styleUrls: ['./governative-project-new-update-form.component.scss']
})
export class MbsGovernativeProjectNewUpdateFormComponent extends EngeLibGenericForm {
	@Input() governativeProject: MbsGovernativeProjectDto | undefined;
	@Output() governativeProjectOutput: EventEmitter<MbsGovernativeProjectDto> = new EventEmitter<MbsGovernativeProjectDto>();
	

	constructor(
		ecs: EngeCommonService,
		private _formBuilder: FormBuilder,
		private governativeProjectResourceService: MbsGovernativeProjectResourceService, 
		protected mbsMainAutocompleteService: MbsMainAutocompleteService,
	) { super(ecs); }

	override loadVariables(): void {
		if(this.governativeProject !== undefined) {
			this.input = this.governativeProject;
			{
			}
		}
		this.output = this.governativeProjectOutput;
	}


	override loadForm(): void {
		this._newUpdateForm = this._formBuilder.group({
			id: [null],
			code: [null, [  ]],
			description: [null, [ Validators.required,  ]],
			amount: [null, [  ]],
		});

	}

	override prepareResult(): MbsGovernativeProjectDto {
		let result: MbsGovernativeProjectDto = this._newUpdateForm.value;
		{
			result.amount = (result.amount != null) ? +result.amount : null;
		}
		return result;
	}

	override async sendToBackEnd(request: MbsGovernativeProjectDto) {
		try {
			let postOrPut: string;
			if (request.id != null && request.id > 0) {
				await lastValueFrom(this.governativeProjectResourceService.updateGovernativeProjectUsingPUT(request));
				postOrPut = "updated";
			} else {
				request.id = undefined;
				await lastValueFrom(this.governativeProjectResourceService.createGovernativeProjectUsingPOST(request));
				postOrPut = "created";
			}
			this._result = request;

			this.ecs.eventer.launchReloadContent("governativeProject");
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

	protected newGovernativeProject() {
		//this._governativeProject = null;
		this.governativeProjectOutput.emit(this.governativeProject);
		this.setStep(EngeEngeFormStep.FORM);
	}
}
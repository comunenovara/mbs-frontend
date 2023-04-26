import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { lastValueFrom, Observable } from 'rxjs';

import { EngeCommonService, EngeEngeFormStep, EngeLibGenericForm, EngeValidator } from '@enge/common-lib';

import { MbsWorkAutocompleteService } from '@mbs-work/service/work-auto-complete.service';
import { MbsProjectResourceService } from '@mbs-work/services/project.service';
import { MbsProjectDto } from '@mbs-work/class/project-dto.class';

@Component({
	selector: 'mbs-project-new-update-form',
	templateUrl: './project-new-update-form.component.html',
	styleUrls: ['./project-new-update-form.component.scss']
})
export class MbsProjectNewUpdateFormComponent extends EngeLibGenericForm {
	@Input() project: MbsProjectDto | undefined;
	@Output() projectOutput: EventEmitter<MbsProjectDto> = new EventEmitter<MbsProjectDto>();
	

	constructor(
		ecs: EngeCommonService,
		private _formBuilder: FormBuilder,
		private projectResourceService: MbsProjectResourceService, 
		protected mbsWorkAutocompleteService: MbsWorkAutocompleteService,
	) { super(ecs); }

	override loadVariables(): void {
		if(this.project !== undefined) {
			this.input = this.project;
			{
			}
		}
		this.output = this.projectOutput;
	}


	override loadForm(): void {
		this._newUpdateForm = this._formBuilder.group({
			id: [null],
			name: [null, [ Validators.required,  ]],
		});

	}

	override prepareResult(): MbsProjectDto {
		let result: MbsProjectDto = this._newUpdateForm.value;
		{
		}
		return result;
	}

	override async sendToBackEnd(request: MbsProjectDto) {
		try {
			let postOrPut: string;
			if (request.id != null && request.id > 0) {
				await lastValueFrom(this.projectResourceService.updateProjectUsingPUT(request));
				postOrPut = "updated";
			} else {
				request.id = undefined;
				await lastValueFrom(this.projectResourceService.createProjectUsingPOST(request));
				postOrPut = "created";
			}
			this._result = request;

			this.ecs.eventer.launchReloadContent("project");
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

	protected newProject() {
		//this._project = null;
		this.projectOutput.emit(this.project);
		this.setStep(EngeEngeFormStep.FORM);
	}
}
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { lastValueFrom, Observable } from 'rxjs';

import { EngeCommonService, EngeEngeFormStep, EngeLibGenericForm, EngeValidator } from '@enge/common-lib';

import { MbsMainAutocompleteService } from '@mbs-main/service/main-auto-complete.service';
import { MbsElaborateGroupResourceService } from '@mbs-main/services/elaborate-group.service';
import { MbsElaborateGroupDto } from '@mbs-main/class/elaborate-group-dto.class';

@Component({
	selector: 'mbs-elaborate-group-new-update-form',
	templateUrl: './elaborate-group-new-update-form.component.html',
	styleUrls: ['./elaborate-group-new-update-form.component.scss']
})
export class MbsElaborateGroupNewUpdateFormComponent extends EngeLibGenericForm {
	@Input() elaborateGroup: MbsElaborateGroupDto | undefined;
	@Output() elaborateGroupOutput: EventEmitter<MbsElaborateGroupDto> = new EventEmitter<MbsElaborateGroupDto>();
	

	constructor(
		ecs: EngeCommonService,
		private _formBuilder: FormBuilder,
		private elaborateGroupResourceService: MbsElaborateGroupResourceService, 
		protected mbsMainAutocompleteService: MbsMainAutocompleteService,
	) { super(ecs); }

	override loadVariables(): void {
		if(this.elaborateGroup !== undefined) {
			this.input = this.elaborateGroup;
			{
			}
		}
		this.output = this.elaborateGroupOutput;
	}


	override loadForm(): void {
		this._newUpdateForm = this._formBuilder.group({
			id: [null],
			description: [null, [ Validators.required,  ]],
		});

	}

	override prepareResult(): MbsElaborateGroupDto {
		let result: MbsElaborateGroupDto = this._newUpdateForm.value;
		{
		}
		return result;
	}

	override async sendToBackEnd(request: MbsElaborateGroupDto) {
		try {
			let postOrPut: string;
			if (request.id != null && request.id > 0) {
				await lastValueFrom(this.elaborateGroupResourceService.updateElaborateGroupUsingPUT(request));
				postOrPut = "updated";
			} else {
				request.id = undefined;
				await lastValueFrom(this.elaborateGroupResourceService.createElaborateGroupUsingPOST(request));
				postOrPut = "created";
			}
			this._result = request;

			this.ecs.eventer.launchReloadContent("elaborateGroup");
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

	protected newElaborateGroup() {
		//this._elaborateGroup = null;
		this.elaborateGroupOutput.emit(this.elaborateGroup);
		this.setStep(EngeEngeFormStep.FORM);
	}
}
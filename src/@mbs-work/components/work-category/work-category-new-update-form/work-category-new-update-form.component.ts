import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { lastValueFrom, Observable } from 'rxjs';

import { EngeCommonService, EngeEngeFormStep, EngeLibGenericForm, EngeValidator } from '@enge/common-lib';

import { MbsWorkAutocompleteService } from '@mbs-work/service/work-auto-complete.service';
import { MbsWorkCategoryResourceService } from '@mbs-work/services/work-category.service';
import { MbsWorkCategoryDto } from '@mbs-work/class/work-category-dto.class';

@Component({
	selector: 'mbs-work-category-new-update-form',
	templateUrl: './work-category-new-update-form.component.html',
	styleUrls: ['./work-category-new-update-form.component.scss']
})
export class MbsWorkCategoryNewUpdateFormComponent extends EngeLibGenericForm {
	@Input() workCategory: MbsWorkCategoryDto | undefined;
	@Output() workCategoryOutput: EventEmitter<MbsWorkCategoryDto> = new EventEmitter<MbsWorkCategoryDto>();
	

	constructor(
		ecs: EngeCommonService,
		private _formBuilder: FormBuilder,
		private workCategoryResourceService: MbsWorkCategoryResourceService, 
		protected mbsWorkAutocompleteService: MbsWorkAutocompleteService,
	) { super(ecs); }

	override loadVariables(): void {
		if(this.workCategory !== undefined) {
			this.input = this.workCategory;
			{
			}
		}
		this.output = this.workCategoryOutput;
	}


	override loadForm(): void {
		this._newUpdateForm = this._formBuilder.group({
			id: [null],
			name: [null, [ Validators.required,  ]],
		});

	}

	override prepareResult(): MbsWorkCategoryDto {
		let result: MbsWorkCategoryDto = this._newUpdateForm.value;
		{
		}
		return result;
	}

	override async sendToBackEnd(request: MbsWorkCategoryDto) {
		try {
			let postOrPut: string;
			if (request.id != null && request.id > 0) {
				await lastValueFrom(this.workCategoryResourceService.updateWorkCategoryUsingPUT(request));
				postOrPut = "updated";
			} else {
				request.id = undefined;
				await lastValueFrom(this.workCategoryResourceService.createWorkCategoryUsingPOST(request));
				postOrPut = "created";
			}
			this._result = request;

			this.ecs.eventer.launchReloadContent("workCategory");
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

	protected newWorkCategory() {
		//this._workCategory = null;
		this.workCategoryOutput.emit(this.workCategory);
		this.setStep(EngeEngeFormStep.FORM);
	}
}
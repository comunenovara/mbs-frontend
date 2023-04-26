import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { lastValueFrom, Observable } from 'rxjs';

import { EngeCommonService, EngeEngeFormStep, EngeLibGenericForm, EngeValidator } from '@enge/common-lib';

import { MbsWorkAutocompleteService } from '@mbs-work/service/work-auto-complete.service';
import { MbsCompanyResourceService } from '@mbs-work/services/company.service';
import { MbsCompanyDto } from '@mbs-work/class/company-dto.class';

@Component({
	selector: 'mbs-company-new-update-form',
	templateUrl: './company-new-update-form.component.html',
	styleUrls: ['./company-new-update-form.component.scss']
})
export class MbsCompanyNewUpdateFormComponent extends EngeLibGenericForm {
	@Input() company: MbsCompanyDto | undefined;
	@Output() companyOutput: EventEmitter<MbsCompanyDto> = new EventEmitter<MbsCompanyDto>();
	

	constructor(
		ecs: EngeCommonService,
		private _formBuilder: FormBuilder,
		private companyResourceService: MbsCompanyResourceService, 
		protected mbsWorkAutocompleteService: MbsWorkAutocompleteService,
	) { super(ecs); }

	override loadVariables(): void {
		if(this.company !== undefined) {
			this.input = this.company;
			{
			}
		}
		this.output = this.companyOutput;
	}


	override loadForm(): void {
		this._newUpdateForm = this._formBuilder.group({
			id: [null],
			name: [null, [ Validators.required,  ]],
		});

	}

	override prepareResult(): MbsCompanyDto {
		let result: MbsCompanyDto = this._newUpdateForm.value;
		{
		}
		return result;
	}

	override async sendToBackEnd(request: MbsCompanyDto) {
		try {
			let postOrPut: string;
			if (request.id != null && request.id > 0) {
				await lastValueFrom(this.companyResourceService.updateCompanyUsingPUT(request));
				postOrPut = "updated";
			} else {
				request.id = undefined;
				await lastValueFrom(this.companyResourceService.createCompanyUsingPOST(request));
				postOrPut = "created";
			}
			this._result = request;

			this.ecs.eventer.launchReloadContent("company");
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

	protected newCompany() {
		//this._company = null;
		this.companyOutput.emit(this.company);
		this.setStep(EngeEngeFormStep.FORM);
	}
}
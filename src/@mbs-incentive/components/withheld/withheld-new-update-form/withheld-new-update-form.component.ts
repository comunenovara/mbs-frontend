import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { lastValueFrom, Observable } from 'rxjs';

import { EngeCommonService, EngeEngeFormStep, EngeLibGenericForm, EngeValidator } from '@enge/common-lib';

import { MbsIncentiveAutocompleteService } from '@mbs-incentive/service/incentive-auto-complete.service';
import { MbsWithheldResourceService } from '@mbs-incentive/services/withheld.service';
import { MbsWithheldDto } from '@mbs-incentive/class/withheld-dto.class';
import { MbsIncentiveRegulationDto } from '@mbs-incentive/class/incentive-regulation-dto.class';

@Component({
	selector: 'mbs-withheld-new-update-form',
	templateUrl: './withheld-new-update-form.component.html',
	styleUrls: ['./withheld-new-update-form.component.scss']
})
export class MbsWithheldNewUpdateFormComponent extends EngeLibGenericForm {
	@Input() withheld: MbsWithheldDto | undefined;
	@Output() withheldOutput: EventEmitter<MbsWithheldDto> = new EventEmitter<MbsWithheldDto>();
	
	@Input() regulation: MbsIncentiveRegulationDto | undefined;

	constructor(
		ecs: EngeCommonService,
		private _formBuilder: FormBuilder,
		private withheldResourceService: MbsWithheldResourceService, 
		protected mbsIncentiveAutocompleteService: MbsIncentiveAutocompleteService,
	) { super(ecs); }

	override loadVariables(): void {
		if(this.withheld !== undefined) {
			this.input = this.withheld;
			{
			}
		}
		this.output = this.withheldOutput;
	}

	_filteredRegulation: Observable<MbsIncentiveRegulationDto[]>;

	override loadForm(): void {
		this._newUpdateForm = this._formBuilder.group({
			id: [null],
			description: [null, [ Validators.required,  ]],
			amount: [null, [  ]],
			percentage: [null, [  ]],
			active: [false, [  ]],
			regulation: [this.regulation, [  ]],
		});

		this._filteredRegulation = this.mbsIncentiveAutocompleteService.filterIncentiveRegulation(this._newUpdateForm.controls['regulation'].valueChanges);
	}

	override prepareResult(): MbsWithheldDto {
		let result: MbsWithheldDto = this._newUpdateForm.value;
		{
			result.amount = (result.amount != null) ? +result.amount : null;
			result.percentage = (result.percentage != null) ? +result.percentage : null;
			result.regulationId = (result.regulation != null) ? result.regulation.id : undefined;
		}
		return result;
	}

	override async sendToBackEnd(request: MbsWithheldDto) {
		try {
			let postOrPut: string;
			if (request.id != null && request.id > 0) {
				await lastValueFrom(this.withheldResourceService.updateWithheldUsingPUT(request));
				postOrPut = "updated";
			} else {
				request.id = undefined;
				await lastValueFrom(this.withheldResourceService.createWithheldUsingPOST(request));
				postOrPut = "created";
			}
			this._result = request;

			this.ecs.eventer.launchReloadContent("withheld");
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

	protected newWithheld() {
		//this._withheld = null;
		this.withheldOutput.emit(this.withheld);
		this.setStep(EngeEngeFormStep.FORM);
	}
}
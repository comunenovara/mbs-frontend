import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { lastValueFrom, Observable } from 'rxjs';

import { EngeCommonService, EngeEngeFormStep, EngeLibGenericForm, EngeValidator } from '@enge/common-lib';

import { MbsMainAutocompleteService } from '@mbs-main/service/main-auto-complete.service';
import { MbsIncentiveWithheldResourceService } from '@mbs-main/services/incentive-withheld.service';
import { MbsIncentiveWithheldDto } from '@mbs-main/class/incentive-withheld-dto.class';
import { MbsProcurementTypeDto } from '@mbs-main/class/procurement-type-dto.class';
import { MbsIncentiveRegulationDto } from '@mbs-main/class/incentive-regulation-dto.class';

@Component({
	selector: 'mbs-incentive-withheld-new-update-form',
	templateUrl: './incentive-withheld-new-update-form.component.html',
	styleUrls: ['./incentive-withheld-new-update-form.component.scss']
})
export class MbsIncentiveWithheldNewUpdateFormComponent extends EngeLibGenericForm {
	@Input() incentiveWithheld: MbsIncentiveWithheldDto | undefined;
	@Output() incentiveWithheldOutput: EventEmitter<MbsIncentiveWithheldDto> = new EventEmitter<MbsIncentiveWithheldDto>();
	
	@Input() procurementType: MbsProcurementTypeDto | undefined;
	@Input() regulation: MbsIncentiveRegulationDto | undefined;

	constructor(
		ecs: EngeCommonService,
		private _formBuilder: FormBuilder,
		private incentiveWithheldResourceService: MbsIncentiveWithheldResourceService, 
		protected mbsMainAutocompleteService: MbsMainAutocompleteService,
	) { super(ecs); }

	override loadVariables(): void {
		if(this.incentiveWithheld !== undefined) {
			this.input = this.incentiveWithheld;
			{
			}
		}
		this.output = this.incentiveWithheldOutput;
	}

	_filteredProcurementType: Observable<MbsProcurementTypeDto[]>;
	_filteredRegulation: Observable<MbsIncentiveRegulationDto[]>;

	override loadForm(): void {
		this._newUpdateForm = this._formBuilder.group({
			id: [null],
			description: [null, [ Validators.required,  ]],
			active: [false, [  ]],
			amount: [null, [  ]],
			percentage: [null, [  ]],
			procurementType: [this.procurementType, [ EngeValidator.haveId,  ]],
			regulation: [this.regulation, [ EngeValidator.haveId,  ]],
		});

		this._filteredProcurementType = this.mbsMainAutocompleteService.filterProcurementType(this._newUpdateForm.controls['procurementType'].valueChanges);
		this._filteredRegulation = this.mbsMainAutocompleteService.filterIncentiveRegulation(this._newUpdateForm.controls['regulation'].valueChanges);
	}

	override prepareResult(): MbsIncentiveWithheldDto {
		let result: MbsIncentiveWithheldDto = this._newUpdateForm.value;
		{
			result.amount = (result.amount != null) ? +result.amount : null;
			result.percentage = (result.percentage != null) ? +result.percentage : null;
			result.procurementTypeId = (result.procurementType != null) ? result.procurementType.id : undefined;
			result.regulationId = (result.regulation != null) ? result.regulation.id : undefined;
		}
		return result;
	}

	override async sendToBackEnd(request: MbsIncentiveWithheldDto) {
		try {
			let postOrPut: string;
			if (request.id != null && request.id > 0) {
				await lastValueFrom(this.incentiveWithheldResourceService.updateIncentiveWithheldUsingPUT(request));
				postOrPut = "updated";
			} else {
				request.id = undefined;
				await lastValueFrom(this.incentiveWithheldResourceService.createIncentiveWithheldUsingPOST(request));
				postOrPut = "created";
			}
			this._result = request;

			this.ecs.eventer.launchReloadContent("incentiveWithheld");
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

	protected newIncentiveWithheld() {
		//this._incentiveWithheld = null;
		this.incentiveWithheldOutput.emit(this.incentiveWithheld);
		this.setStep(EngeEngeFormStep.FORM);
	}
}
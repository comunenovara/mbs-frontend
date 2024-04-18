import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { lastValueFrom, Observable } from 'rxjs';

import { EngeCommonService, EngeEngeFormStep, EngeLibGenericForm, EngeValidator } from '@enge/common-lib';

import { MbsMainAutocompleteService } from '@mbs-main/service/main-auto-complete.service';
import { MbsIncentiveStageResourceService } from '@mbs-main/services/incentive-stage.service';
import { MbsIncentiveStageDto } from '@mbs-main/class/incentive-stage-dto.class';
import { MbsProcurementTypeDto } from '@mbs-main/class/procurement-type-dto.class';
import { MbsIncentiveRegulationDto } from '@mbs-main/class/incentive-regulation-dto.class';

@Component({
	selector: 'mbs-incentive-stage-new-update-form',
	templateUrl: './incentive-stage-new-update-form.component.html',
	styleUrls: ['./incentive-stage-new-update-form.component.scss']
})
export class MbsIncentiveStageNewUpdateFormComponent extends EngeLibGenericForm {
	@Input() incentiveStage: MbsIncentiveStageDto | undefined;
	@Output() incentiveStageOutput: EventEmitter<MbsIncentiveStageDto> = new EventEmitter<MbsIncentiveStageDto>();
	
	@Input() procurementType: MbsProcurementTypeDto | undefined;
	@Input() regulation: MbsIncentiveRegulationDto | undefined;

	constructor(
		ecs: EngeCommonService,
		private _formBuilder: FormBuilder,
		private incentiveStageResourceService: MbsIncentiveStageResourceService, 
		protected mbsMainAutocompleteService: MbsMainAutocompleteService,
	) { super(ecs); }

	override loadVariables(): void {
		if(this.incentiveStage !== undefined) {
			this.input = this.incentiveStage;
			{
			}
		}
		this.output = this.incentiveStageOutput;
	}

	_filteredProcurementType: Observable<MbsProcurementTypeDto[]>;
	_filteredRegulation: Observable<MbsIncentiveRegulationDto[]>;

	override loadForm(): void {
		this._newUpdateForm = this._formBuilder.group({
			id: [null],
			description: [null, [ Validators.required,  ]],
			procurementType: [this.procurementType, [ EngeValidator.haveId,  ]],
			regulation: [this.regulation, [ EngeValidator.haveId,  ]],
		});

		this._filteredProcurementType = this.mbsMainAutocompleteService.filterProcurementType(this._newUpdateForm.controls['procurementType'].valueChanges);
		this._filteredRegulation = this.mbsMainAutocompleteService.filterIncentiveRegulation(this._newUpdateForm.controls['regulation'].valueChanges);
	}

	override prepareResult(): MbsIncentiveStageDto {
		let result: MbsIncentiveStageDto = this._newUpdateForm.value;
		{
			result.procurementTypeId = (result.procurementType != null) ? result.procurementType.id : undefined;
			result.regulationId = (result.regulation != null) ? result.regulation.id : undefined;
		}
		return result;
	}

	override async sendToBackEnd(request: MbsIncentiveStageDto) {
		try {
			let postOrPut: string;
			if (request.id != null && request.id > 0) {
				await lastValueFrom(this.incentiveStageResourceService.updateIncentiveStageUsingPUT(request));
				postOrPut = "updated";
			} else {
				request.id = undefined;
				await lastValueFrom(this.incentiveStageResourceService.createIncentiveStageUsingPOST(request));
				postOrPut = "created";
			}
			this._result = request;

			this.ecs.eventer.launchReloadContent("incentiveStage");
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

	protected newIncentiveStage() {
		//this._incentiveStage = null;
		this.incentiveStageOutput.emit(this.incentiveStage);
		this.setStep(EngeEngeFormStep.FORM);
	}
}
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { lastValueFrom, Observable } from 'rxjs';

import { EngeCommonService, EngeEngeFormStep, EngeLibGenericForm, EngeValidator } from '@enge/common-lib';

import { MbsIncentiveAutocompleteService } from '@mbs-incentive/service/incentive-auto-complete.service';
import { MbsStageResourceService } from '@mbs-incentive/services/stage.service';
import { MbsStageDto } from '@mbs-incentive/class/stage-dto.class';
import { MbsIncentiveRegulationDto } from '@mbs-incentive/class/incentive-regulation-dto.class';

@Component({
	selector: 'mbs-stage-new-update-form',
	templateUrl: './stage-new-update-form.component.html',
	styleUrls: ['./stage-new-update-form.component.scss']
})
export class MbsStageNewUpdateFormComponent extends EngeLibGenericForm {
	@Input() stage: MbsStageDto | undefined;
	@Output() stageOutput: EventEmitter<MbsStageDto> = new EventEmitter<MbsStageDto>();
	
	@Input() regulation: MbsIncentiveRegulationDto | undefined;

	constructor(
		ecs: EngeCommonService,
		private _formBuilder: FormBuilder,
		private stageResourceService: MbsStageResourceService, 
		protected mbsIncentiveAutocompleteService: MbsIncentiveAutocompleteService,
	) { super(ecs); }

	override loadVariables(): void {
		if(this.stage !== undefined) {
			this.input = this.stage;
			{
			}
		}
		this.output = this.stageOutput;
	}

	_filteredRegulation: Observable<MbsIncentiveRegulationDto[]>;

	override loadForm(): void {
		this._newUpdateForm = this._formBuilder.group({
			id: [null],
			description: [null, [ Validators.required,  ]],
			regulation: [this.regulation, [  ]],
		});

		this._filteredRegulation = this.mbsIncentiveAutocompleteService.filterIncentiveRegulation(this._newUpdateForm.controls['regulation'].valueChanges);
	}

	override prepareResult(): MbsStageDto {
		let result: MbsStageDto = this._newUpdateForm.value;
		{
			result.regulationId = (result.regulation != null) ? result.regulation.id : undefined;
		}
		return result;
	}

	override async sendToBackEnd(request: MbsStageDto) {
		try {
			let postOrPut: string;
			if (request.id != null && request.id > 0) {
				await lastValueFrom(this.stageResourceService.updateStageUsingPUT(request));
				postOrPut = "updated";
			} else {
				request.id = undefined;
				await lastValueFrom(this.stageResourceService.createStageUsingPOST(request));
				postOrPut = "created";
			}
			this._result = request;

			this.ecs.eventer.launchReloadContent("stage");
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

	protected newStage() {
		//this._stage = null;
		this.stageOutput.emit(this.stage);
		this.setStep(EngeEngeFormStep.FORM);
	}
}
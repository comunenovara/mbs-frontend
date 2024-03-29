import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { lastValueFrom, Observable } from 'rxjs';

import { EngeCommonService, EngeEngeFormStep, EngeLibGenericForm, EngeValidator } from '@enge/common-lib';

import { MbsIncentiveAutocompleteService } from '@mbs-incentive/service/incentive-auto-complete.service';
import { MbsGovernativeProjectAndProcurementLotResourceService } from '@mbs-incentive/services/governative-project-and-procurement-lot.service';
import { MbsGovernativeProjectAndProcurementLotDto } from '@mbs-incentive/class/governative-project-and-procurement-lot-dto.class';
import { MbsGovernativeProjectDto } from '@mbs-incentive/class/governative-project-dto.class';
import { MbsGovernativeProcurementLotDto } from '@mbs-incentive/class/governative-procurement-lot-dto.class';

@Component({
	selector: 'mbs-governative-project-and-procurement-lot-new-update-form',
	templateUrl: './governative-project-and-procurement-lot-new-update-form.component.html',
	styleUrls: ['./governative-project-and-procurement-lot-new-update-form.component.scss']
})
export class MbsGovernativeProjectAndProcurementLotNewUpdateFormComponent extends EngeLibGenericForm {
	@Input() governativeProjectAndProcurementLot: MbsGovernativeProjectAndProcurementLotDto | undefined;
	@Output() governativeProjectAndProcurementLotOutput: EventEmitter<MbsGovernativeProjectAndProcurementLotDto> = new EventEmitter<MbsGovernativeProjectAndProcurementLotDto>();
	
	@Input() governativeProject: MbsGovernativeProjectDto | undefined;
	@Input() governativeProcurementLot: MbsGovernativeProcurementLotDto | undefined;

	constructor(
		ecs: EngeCommonService,
		private _formBuilder: FormBuilder,
		private governativeProjectAndProcurementLotResourceService: MbsGovernativeProjectAndProcurementLotResourceService, 
		protected mbsIncentiveAutocompleteService: MbsIncentiveAutocompleteService,
	) { super(ecs); }

	override loadVariables(): void {
		if(this.governativeProjectAndProcurementLot !== undefined) {
			this.input = this.governativeProjectAndProcurementLot;
			{
			}
		}
		this.output = this.governativeProjectAndProcurementLotOutput;
	}

	_filteredGovernativeProject: Observable<MbsGovernativeProjectDto[]>;
	_filteredGovernativeProcurementLot: Observable<MbsGovernativeProcurementLotDto[]>;

	override loadForm(): void {
		this._newUpdateForm = this._formBuilder.group({
			id: [null],
			amount: [null, [  ]],
			governativeProject: [this.governativeProject, [ EngeValidator.haveId,  ]],
			governativeProcurementLot: [this.governativeProcurementLot, [ EngeValidator.haveId,  ]],
		});

		this._filteredGovernativeProject = this.mbsIncentiveAutocompleteService.filterGovernativeProject(this._newUpdateForm.controls['governativeProject'].valueChanges);
		this._filteredGovernativeProcurementLot = this.mbsIncentiveAutocompleteService.filterGovernativeProcurementLot(this._newUpdateForm.controls['governativeProcurementLot'].valueChanges);
	}

	override prepareResult(): MbsGovernativeProjectAndProcurementLotDto {
		let result: MbsGovernativeProjectAndProcurementLotDto = this._newUpdateForm.value;
		{
			result.amount = (result.amount != null) ? +result.amount : null;
			result.governativeProjectId = (result.governativeProject != null) ? result.governativeProject.id : undefined;
			result.governativeProcurementLotId = (result.governativeProcurementLot != null) ? result.governativeProcurementLot.id : undefined;
		}
		return result;
	}

	override async sendToBackEnd(request: MbsGovernativeProjectAndProcurementLotDto) {
		try {
			let postOrPut: string;
			if (request.id != null && request.id > 0) {
				await lastValueFrom(this.governativeProjectAndProcurementLotResourceService.updateGovernativeProjectAndProcurementLotUsingPUT(request));
				postOrPut = "updated";
			} else {
				request.id = undefined;
				await lastValueFrom(this.governativeProjectAndProcurementLotResourceService.createGovernativeProjectAndProcurementLotUsingPOST(request));
				postOrPut = "created";
			}
			this._result = request;

			this.ecs.eventer.launchReloadContent("governativeProjectAndProcurementLot");
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

	protected newGovernativeProjectAndProcurementLot() {
		//this._governativeProjectAndProcurementLot = null;
		this.governativeProjectAndProcurementLotOutput.emit(this.governativeProjectAndProcurementLot);
		this.setStep(EngeEngeFormStep.FORM);
	}
}
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { lastValueFrom, Observable } from 'rxjs';

import { EngeCommonService, EngeEngeFormStep, EngeLibGenericForm, EngeValidator } from '@enge/common-lib';

import { MbsMainAutocompleteService } from '@mbs-main/service/main-auto-complete.service';
import { MbsGovernativeProjectProcurementLotResourceService } from '@mbs-main/services/governative-project-procurement-lot.service';
import { MbsGovernativeProjectProcurementLotDto } from '@mbs-main/class/governative-project-procurement-lot-dto.class';
import { MbsGovernativeProjectDto } from '@mbs-main/class/governative-project-dto.class';
import { MbsGovernativeProcurementLotDto } from '@mbs-main/class/governative-procurement-lot-dto.class';

@Component({
	selector: 'mbs-governative-project-procurement-lot-new-update-form',
	templateUrl: './governative-project-procurement-lot-new-update-form.component.html',
	styleUrls: ['./governative-project-procurement-lot-new-update-form.component.scss']
})
export class MbsGovernativeProjectProcurementLotNewUpdateFormComponent extends EngeLibGenericForm {
	@Input() governativeProjectProcurementLot: MbsGovernativeProjectProcurementLotDto | undefined;
	@Output() governativeProjectProcurementLotOutput: EventEmitter<MbsGovernativeProjectProcurementLotDto> = new EventEmitter<MbsGovernativeProjectProcurementLotDto>();
	
	@Input() project: MbsGovernativeProjectDto | undefined;
	@Input() procurementLot: MbsGovernativeProcurementLotDto | undefined;

	constructor(
		ecs: EngeCommonService,
		private _formBuilder: FormBuilder,
		private governativeProjectProcurementLotResourceService: MbsGovernativeProjectProcurementLotResourceService, 
		protected mbsMainAutocompleteService: MbsMainAutocompleteService,
	) { super(ecs); }

	override loadVariables(): void {
		if(this.governativeProjectProcurementLot !== undefined) {
			this.input = this.governativeProjectProcurementLot;
			{
			}
		}
		this.output = this.governativeProjectProcurementLotOutput;
	}

	_filteredProject: Observable<MbsGovernativeProjectDto[]>;
	_filteredProcurementLot: Observable<MbsGovernativeProcurementLotDto[]>;

	override loadForm(): void {
		this._newUpdateForm = this._formBuilder.group({
			id: [null],
			amount: [null, [  ]],
			project: [this.project, [ EngeValidator.haveId,  ]],
			procurementLot: [this.procurementLot, [ EngeValidator.haveId,  ]],
		});

		this._filteredProject = this.mbsMainAutocompleteService.filterGovernativeProject(this._newUpdateForm.controls['project'].valueChanges);
		this._filteredProcurementLot = this.mbsMainAutocompleteService.filterGovernativeProcurementLot(this._newUpdateForm.controls['procurementLot'].valueChanges);
	}

	override prepareResult(): MbsGovernativeProjectProcurementLotDto {
		let result: MbsGovernativeProjectProcurementLotDto = this._newUpdateForm.value;
		{
			result.amount = (result.amount != null) ? +result.amount : null;
			result.projectId = (result.project != null) ? result.project.id : undefined;
			result.procurementLotId = (result.procurementLot != null) ? result.procurementLot.id : undefined;
		}
		return result;
	}

	override async sendToBackEnd(request: MbsGovernativeProjectProcurementLotDto) {
		try {
			let postOrPut: string;
			if (request.id != null && request.id > 0) {
				await lastValueFrom(this.governativeProjectProcurementLotResourceService.updateGovernativeProjectProcurementLotUsingPUT(request));
				postOrPut = "updated";
			} else {
				request.id = undefined;
				await lastValueFrom(this.governativeProjectProcurementLotResourceService.createGovernativeProjectProcurementLotUsingPOST(request));
				postOrPut = "created";
			}
			this._result = request;

			this.ecs.eventer.launchReloadContent("governativeProjectProcurementLot");
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

	protected newGovernativeProjectProcurementLot() {
		//this._governativeProjectProcurementLot = null;
		this.governativeProjectProcurementLotOutput.emit(this.governativeProjectProcurementLot);
		this.setStep(EngeEngeFormStep.FORM);
	}
}
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { lastValueFrom, Observable } from 'rxjs';

import { EngeCommonService, EngeEngeFormStep, EngeLibGenericForm, EngeValidator } from '@enge/common-lib';

import { MbsIncentiveAutocompleteService } from '@mbs-incentive/service/incentive-auto-complete.service';
import { MbsGovernativeProcurementLotResourceService } from '@mbs-incentive/services/governative-procurement-lot.service';
import { MbsGovernativeProcurementLotDto } from '@mbs-incentive/class/governative-procurement-lot-dto.class';
import { MbsProcurementTypeDto } from '@mbs-incentive/class/procurement-type-dto.class';

@Component({
	selector: 'mbs-governative-procurement-lot-new-update-form',
	templateUrl: './governative-procurement-lot-new-update-form.component.html',
	styleUrls: ['./governative-procurement-lot-new-update-form.component.scss']
})
export class MbsGovernativeProcurementLotNewUpdateFormComponent extends EngeLibGenericForm {
	@Input() governativeProcurementLot: MbsGovernativeProcurementLotDto | undefined;
	@Output() governativeProcurementLotOutput: EventEmitter<MbsGovernativeProcurementLotDto> = new EventEmitter<MbsGovernativeProcurementLotDto>();
	
	@Input() type: MbsProcurementTypeDto | undefined;

	constructor(
		ecs: EngeCommonService,
		private _formBuilder: FormBuilder,
		private governativeProcurementLotResourceService: MbsGovernativeProcurementLotResourceService, 
		protected mbsIncentiveAutocompleteService: MbsIncentiveAutocompleteService,
	) { super(ecs); }

	override loadVariables(): void {
		if(this.governativeProcurementLot !== undefined) {
			this.input = this.governativeProcurementLot;
			{
			}
		}
		this.output = this.governativeProcurementLotOutput;
	}

	_filteredType: Observable<MbsProcurementTypeDto[]>;

	override loadForm(): void {
		this._newUpdateForm = this._formBuilder.group({
			id: [null],
			code: [null, [  ]],
			description: [null, [ Validators.required,  ]],
			amount: [null, [  ]],
			type: [this.type, [ EngeValidator.haveId,  ]],
		});

		this._filteredType = this.mbsIncentiveAutocompleteService.filterProcurementType(this._newUpdateForm.controls['type'].valueChanges);
	}

	override prepareResult(): MbsGovernativeProcurementLotDto {
		let result: MbsGovernativeProcurementLotDto = this._newUpdateForm.value;
		{
			result.amount = (result.amount != null) ? +result.amount : null;
			result.typeId = (result.type != null) ? result.type.id : undefined;
		}
		return result;
	}

	override async sendToBackEnd(request: MbsGovernativeProcurementLotDto) {
		try {
			let postOrPut: string;
			if (request.id != null && request.id > 0) {
				await lastValueFrom(this.governativeProcurementLotResourceService.updateGovernativeProcurementLotUsingPUT(request));
				postOrPut = "updated";
			} else {
				request.id = undefined;
				await lastValueFrom(this.governativeProcurementLotResourceService.createGovernativeProcurementLotUsingPOST(request));
				postOrPut = "created";
			}
			this._result = request;

			this.ecs.eventer.launchReloadContent("governativeProcurementLot");
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

	protected newGovernativeProcurementLot() {
		//this._governativeProcurementLot = null;
		this.governativeProcurementLotOutput.emit(this.governativeProcurementLot);
		this.setStep(EngeEngeFormStep.FORM);
	}
}
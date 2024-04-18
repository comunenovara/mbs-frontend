import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { lastValueFrom, Observable } from 'rxjs';

import { EngeCommonService, EngeEngeFormStep, EngeLibGenericForm, EngeValidator } from '@enge/common-lib';

import { MbsMainAutocompleteService } from '@mbs-main/service/main-auto-complete.service';
import { MbsIncentiveRoleResourceService } from '@mbs-main/services/incentive-role.service';
import { MbsIncentiveRoleDto } from '@mbs-main/class/incentive-role-dto.class';
import { MbsProcurementTypeDto } from '@mbs-main/class/procurement-type-dto.class';
import { MbsIncentiveRegulationDto } from '@mbs-main/class/incentive-regulation-dto.class';

@Component({
	selector: 'mbs-incentive-role-new-update-form',
	templateUrl: './incentive-role-new-update-form.component.html',
	styleUrls: ['./incentive-role-new-update-form.component.scss']
})
export class MbsIncentiveRoleNewUpdateFormComponent extends EngeLibGenericForm {
	@Input() incentiveRole: MbsIncentiveRoleDto | undefined;
	@Output() incentiveRoleOutput: EventEmitter<MbsIncentiveRoleDto> = new EventEmitter<MbsIncentiveRoleDto>();
	
	@Input() procurementType: MbsProcurementTypeDto | undefined;
	@Input() regulation: MbsIncentiveRegulationDto | undefined;

	constructor(
		ecs: EngeCommonService,
		private _formBuilder: FormBuilder,
		private incentiveRoleResourceService: MbsIncentiveRoleResourceService, 
		protected mbsMainAutocompleteService: MbsMainAutocompleteService,
	) { super(ecs); }

	override loadVariables(): void {
		if(this.incentiveRole !== undefined) {
			this.input = this.incentiveRole;
			{
			}
		}
		this.output = this.incentiveRoleOutput;
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

	override prepareResult(): MbsIncentiveRoleDto {
		let result: MbsIncentiveRoleDto = this._newUpdateForm.value;
		{
			result.procurementTypeId = (result.procurementType != null) ? result.procurementType.id : undefined;
			result.regulationId = (result.regulation != null) ? result.regulation.id : undefined;
		}
		return result;
	}

	override async sendToBackEnd(request: MbsIncentiveRoleDto) {
		try {
			let postOrPut: string;
			if (request.id != null && request.id > 0) {
				await lastValueFrom(this.incentiveRoleResourceService.updateIncentiveRoleUsingPUT(request));
				postOrPut = "updated";
			} else {
				request.id = undefined;
				await lastValueFrom(this.incentiveRoleResourceService.createIncentiveRoleUsingPOST(request));
				postOrPut = "created";
			}
			this._result = request;

			this.ecs.eventer.launchReloadContent("incentiveRole");
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

	protected newIncentiveRole() {
		//this._incentiveRole = null;
		this.incentiveRoleOutput.emit(this.incentiveRole);
		this.setStep(EngeEngeFormStep.FORM);
	}
}
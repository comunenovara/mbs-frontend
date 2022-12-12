import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom, Observable } from 'rxjs';

import { MbsOperationTypeResourceService } from '@mbs-main/services/operation-type.service';
import { MbsOperationTypeDto } from '@mbs-main/class/operation-type-dto.class';

@Component({
	selector: 'mbs-operation-type-new-update-form',
	templateUrl: './operation-type-new-update-form.component.html',
	styleUrls: ['./operation-type-new-update-form.component.scss']
})
export class MbsOperationTypeNewUpdateFormComponent implements OnInit {
	@Input() operationType: MbsOperationTypeDto;
	@Input() returnToParent: boolean = false; 

	@Output() operationTypeOutput = new EventEmitter<MbsOperationTypeDto>();
    
    constructor(
		private _formBuilder: FormBuilder,
		private operationTypeResourceService: MbsOperationTypeResourceService,
	) { }

	step: any = {
		form: true,
		loading: false,
		complete: false
	};

    
	_operationTypeNewUpdateForm: FormGroup;
	_isUpdate: boolean = false;
	_operationTypeResult: any;


	ngOnInit(): void {
		this._operationTypeNewUpdateForm = this._formBuilder.group({
			id: [null],
			description: [null, []],
		});

		if(this.operationType != null) {
			this._operationTypeNewUpdateForm.patchValue(this.operationType);
			this._isUpdate = true;
		}

	}

	async submit() {
		if (!this._operationTypeNewUpdateForm.valid) {
			return;
		}

		this.setStep("loading");

		let operationType: MbsOperationTypeDto = this._operationTypeNewUpdateForm.value;

		if(this.returnToParent) {
			this.operationTypeOutput.emit(operationType);
			this.setStep("complete");
		} 

		if(!this.returnToParent) {
			try {
				let postOrPut: string;
				if (operationType.id != 0) {
					await lastValueFrom(this.operationTypeResourceService.updateOperationTypeUsingPUT(operationType));
					postOrPut = "updated";
				} else {
					await lastValueFrom(this.operationTypeResourceService.createOperationTypeUsingPOST(operationType));
					postOrPut = "created";
				}

				this._operationTypeResult = operationType;

				//this.eventService.reloadCurrentPage();

				this.setStep("complete");

			} catch (e: any) {
				console.log("errore gestito:", e.error.message);
				//this._snackBar.open("Error: " + e.error.title, null, { duration: 5000, });
				this.setStep("form");
			}
		}

		//this._fuseProgressBarService.hide();
	}



	newOperationType() {
		//this._operationType = null;
		this.operationTypeOutput.emit(this.operationType);
		this.setStep("form");
	}

	private setStep(stepToShow: string) {
		this.step.form = false;
		this.step.loading = false;
		this.step.complete = false;
		this.step[stepToShow] = true;
	}
}
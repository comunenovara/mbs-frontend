import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { MbsOperationDto } from '@mbs-main/class/operation-dto.class';

@Component({
	selector: 'mbs-operation-new-update-form',
	templateUrl: './operation-new-update-form.component.html',
	styleUrls: ['./operation-new-update-form.component.scss']
})
export class MbsOperationNewUpdateFormComponent implements OnInit {
	@Input() operation: MbsOperationDto;
	@Input() returnToParent: boolean = false; 

	@Output() operationOutput = new EventEmitter<MbsOperationDto>();
    
    constructor(
		private _formBuilder: FormBuilder,
	) { }

	step: any = {
		form: true,
		loading: false,
		complete: false
	};

    
	_operationNewUpdateForm: FormGroup;
	_isUpdate: boolean = false;
	_operationResult: any;

    // relation
	//_filteredAsset: Observable<MbsAssetDto[]>;

	ngOnInit(): void {
		this._operationNewUpdateForm = this._formBuilder.group({
			id: [''],
			description: [null, []],
			value: [null, []],
			startDate: [null, []],
			endDate: [null, []],
			type: [null, []],
			asset: [null, []],
		});

		if(this.operation != null) {
			this._operationNewUpdateForm.patchValue(this.operation);
			this._isUpdate = true;
		}

		//this._filteredAsset = this.commerceAutocompleteService.filterBuyer(this._operationNewUpdateForm.controls['buyer'].valueChanges);
	}

	async submit() {
		if (!this._operationNewUpdateForm.valid) {
			return;
		}

		this.setStep("loading");

		let operation: MbsOperationDto = this._operationNewUpdateForm.value;

		if(this.returnToParent) {
			this.operationOutput.emit(operation);
			this.setStep("complete");
		} 

		if(!this.returnToParent) {
			try {
				let postOrPut: string;
				if (operation.id != 0) {
					//await this.operationResourceService.updateOperationUsingPUT(operation).toPromise();
					postOrPut = "updated";
				} else {
					//await this.operationResourceService.createOperationUsingPOST(operation).toPromise();
					postOrPut = "created";
				}

				this._operationResult = operation;

				//this.eventService.reloadCurrentPage();

				this.setStep("complete");

			} catch (error: any) {
				//this._snackBar.open("Error: " + error.error.title, null, { duration: 5000, });
				this.setStep("form");
			}
		}

		//this._fuseProgressBarService.hide();
	}



	newOperation() {
		//this._operation = null;
		this.operationOutput.emit(this.operation);
		this.setStep("form");
	}

	private setStep(stepToShow: string) {
		this.step.form = false;
		this.step.loading = false;
		this.step.complete = false;
		this.step[stepToShow] = true;
	}
}
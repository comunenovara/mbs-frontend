import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom, Observable } from 'rxjs';

import { MbsMainAutocompleteService } from '@mbs-main/service/main-auto-complete.service';
import { MbsOperationResourceService } from '@mbs-main/services/operation.service';
import { MbsOperationDto } from '@mbs-main/class/operation-dto.class';
import { MbsOperationTypeDto } from '@mbs-main/class/operation-type-dto.class';
import { MbsAssetDto } from '@mbs-main/class/asset-dto.class';

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
		private operationResourceService: MbsOperationResourceService,
		private mbsMainAutocompleteService: MbsMainAutocompleteService,
		
	) { }

	step: any = {
		form: true,
		loading: false,
		complete: false
	};

    
	_operationNewUpdateForm: FormGroup;
	_isUpdate: boolean = false;
	_operationResult: any;

	_filteredType: Observable<MbsOperationTypeDto[]>;
	_filteredAsset: Observable<MbsAssetDto[]>;

	ngOnInit(): void {
		this._operationNewUpdateForm = this._formBuilder.group({
			id: [null],
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

		this._filteredType = this.mbsMainAutocompleteService.filterOperationType(this._operationNewUpdateForm.controls['type'].valueChanges);
		this._filteredAsset = this.mbsMainAutocompleteService.filterAsset(this._operationNewUpdateForm.controls['asset'].valueChanges);
	}

	async submit() {
		if (!this._operationNewUpdateForm.valid) {
			return;
		}

		this.setStep("loading");

		let operation: MbsOperationDto = this._operationNewUpdateForm.value;
		operation.typeId = operation.type.id;
		operation.assetId = operation.asset.id;

		if(this.returnToParent) {
			this.operationOutput.emit(operation);
			this.setStep("complete");
		} 

		if(!this.returnToParent) {
			try {
				let postOrPut: string;
				if (operation.id != 0) {
					await lastValueFrom(this.operationResourceService.updateOperationUsingPUT(operation));
					postOrPut = "updated";
				} else {
					await lastValueFrom(this.operationResourceService.createOperationUsingPOST(operation));
					postOrPut = "created";
				}

				this._operationResult = operation;

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

	displayFn: Function = (selectedElement: any) => {
        return selectedElement.description;
    };
}
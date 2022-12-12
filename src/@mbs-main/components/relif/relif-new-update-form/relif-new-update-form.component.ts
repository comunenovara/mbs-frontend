import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom, Observable } from 'rxjs';

import { MbsMainAutocompleteService } from '@mbs-main/service/main-auto-complete.service';
import { MbsRelifResourceService } from '@mbs-main/services/relif.service';
import { MbsRelifDto } from '@mbs-main/class/relif-dto.class';
import { MbsAssetDto } from '@mbs-main/class/asset-dto.class';

@Component({
	selector: 'mbs-relif-new-update-form',
	templateUrl: './relif-new-update-form.component.html',
	styleUrls: ['./relif-new-update-form.component.scss']
})
export class MbsRelifNewUpdateFormComponent implements OnInit {
	@Input() relif: MbsRelifDto;
	@Input() returnToParent: boolean = false; 

	@Output() relifOutput = new EventEmitter<MbsRelifDto>();
    
    constructor(
		private _formBuilder: FormBuilder,
		private relifResourceService: MbsRelifResourceService,
		private mbsMainAutocompleteService: MbsMainAutocompleteService,
		
	) { }

	step: any = {
		form: true,
		loading: false,
		complete: false
	};

    
	_relifNewUpdateForm: FormGroup;
	_isUpdate: boolean = false;
	_relifResult: any;

	_filteredAsset: Observable<MbsAssetDto[]>;

	ngOnInit(): void {
		this._relifNewUpdateForm = this._formBuilder.group({
			id: [null],
			description: [null, []],
			startDate: [null, []],
			endDate: [null, []],
			asset: [null, []],
		});

		if(this.relif != null) {
			this._relifNewUpdateForm.patchValue(this.relif);
			this._isUpdate = true;
		}

		this._filteredAsset = this.mbsMainAutocompleteService.filterAsset(this._relifNewUpdateForm.controls['asset'].valueChanges);
	}

	async submit() {
		if (!this._relifNewUpdateForm.valid) {
			return;
		}

		this.setStep("loading");

		let relif: MbsRelifDto = this._relifNewUpdateForm.value;

		if(this.returnToParent) {
			this.relifOutput.emit(relif);
			this.setStep("complete");
		} 

		if(!this.returnToParent) {
			try {
				let postOrPut: string;
				if (relif.id != 0) {
					await lastValueFrom(this.relifResourceService.updateRelifUsingPUT(relif));
					postOrPut = "updated";
				} else {
					await lastValueFrom(this.relifResourceService.createRelifUsingPOST(relif));
					postOrPut = "created";
				}

				this._relifResult = relif;

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



	newRelif() {
		//this._relif = null;
		this.relifOutput.emit(this.relif);
		this.setStep("form");
	}

	private setStep(stepToShow: string) {
		this.step.form = false;
		this.step.loading = false;
		this.step.complete = false;
		this.step[stepToShow] = true;
	}
}
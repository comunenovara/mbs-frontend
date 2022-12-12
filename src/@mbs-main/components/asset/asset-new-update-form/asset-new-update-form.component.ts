import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom, Observable } from 'rxjs';

import { MbsAssetResourceService } from '@mbs-main/services/asset.service';
import { MbsAssetDto } from '@mbs-main/class/asset-dto.class';

@Component({
	selector: 'mbs-asset-new-update-form',
	templateUrl: './asset-new-update-form.component.html',
	styleUrls: ['./asset-new-update-form.component.scss']
})
export class MbsAssetNewUpdateFormComponent implements OnInit {
	@Input() asset: MbsAssetDto;
	@Input() returnToParent: boolean = false; 

	@Output() assetOutput = new EventEmitter<MbsAssetDto>();
    
    constructor(
		private _formBuilder: FormBuilder,
		private assetResourceService: MbsAssetResourceService,
	) { }

	step: any = {
		form: true,
		loading: false,
		complete: false
	};

    
	_assetNewUpdateForm: FormGroup;
	_isUpdate: boolean = false;
	_assetResult: any;


	ngOnInit(): void {
		this._assetNewUpdateForm = this._formBuilder.group({
			id: [null],
			description: [null, []],
			address: [null, []],
			mq: [null, []],
		});

		if(this.asset != null) {
			this._assetNewUpdateForm.patchValue(this.asset);
			this._isUpdate = true;
		}

	}

	async submit() {
		if (!this._assetNewUpdateForm.valid) {
			return;
		}

		this.setStep("loading");

		let asset: MbsAssetDto = this._assetNewUpdateForm.value;

		if(this.returnToParent) {
			this.assetOutput.emit(asset);
			this.setStep("complete");
		} 

		if(!this.returnToParent) {
			try {
				let postOrPut: string;
				if (asset.id != 0) {
					await lastValueFrom(this.assetResourceService.updateAssetUsingPUT(asset));
					postOrPut = "updated";
				} else {
					await lastValueFrom(this.assetResourceService.createAssetUsingPOST(asset));
					postOrPut = "created";
				}

				this._assetResult = asset;

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



	newAsset() {
		//this._asset = null;
		this.assetOutput.emit(this.asset);
		this.setStep("form");
	}

	private setStep(stepToShow: string) {
		this.step.form = false;
		this.step.loading = false;
		this.step.complete = false;
		this.step[stepToShow] = true;
	}
}
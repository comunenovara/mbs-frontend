import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { MbsDossierDto } from '@mbs-main/class/dossier-dto.class';

@Component({
	selector: 'mbs-dossier-new-update-form',
	templateUrl: './dossier-new-update-form.component.html',
	styleUrls: ['./dossier-new-update-form.component.scss']
})
export class MbsDossierNewUpdateFormComponent implements OnInit {
	@Input() dossier: MbsDossierDto;
	@Input() returnToParent: boolean = false; 

	@Output() dossierOutput = new EventEmitter<MbsDossierDto>();
    
    constructor(
		private _formBuilder: FormBuilder,
	) { }

	step: any = {
		form: true,
		loading: false,
		complete: false
	};

    
	_dossierNewUpdateForm: FormGroup;
	_isUpdate: boolean = false;
	_dossierResult: any;

    // relation
	//_filteredAsset: Observable<MbsAssetDto[]>;

	ngOnInit(): void {
		this._dossierNewUpdateForm = this._formBuilder.group({
			id: [''],
			description: [null, []],
			type: [null, []],
			asset: [null, []],
			relif: [null, []],
			operation: [null, []],
		});

		if(this.dossier != null) {
			this._dossierNewUpdateForm.patchValue(this.dossier);
			this._isUpdate = true;
		}

		//this._filteredAsset = this.commerceAutocompleteService.filterBuyer(this._dossierNewUpdateForm.controls['buyer'].valueChanges);
	}

	async submit() {
		if (!this._dossierNewUpdateForm.valid) {
			return;
		}

		this.setStep("loading");

		let dossier: MbsDossierDto = this._dossierNewUpdateForm.value;

		if(this.returnToParent) {
			this.dossierOutput.emit(dossier);
			this.setStep("complete");
		} 

		if(!this.returnToParent) {
			try {
				let postOrPut: string;
				if (dossier.id != 0) {
					//await this.dossierResourceService.updateDossierUsingPUT(dossier).toPromise();
					postOrPut = "updated";
				} else {
					//await this.dossierResourceService.createDossierUsingPOST(dossier).toPromise();
					postOrPut = "created";
				}

				this._dossierResult = dossier;

				//this.eventService.reloadCurrentPage();

				this.setStep("complete");

			} catch (error: any) {
				//this._snackBar.open("Error: " + error.error.title, null, { duration: 5000, });
				this.setStep("form");
			}
		}

		//this._fuseProgressBarService.hide();
	}



	newDossier() {
		//this._dossier = null;
		this.dossierOutput.emit(this.dossier);
		this.setStep("form");
	}

	private setStep(stepToShow: string) {
		this.step.form = false;
		this.step.loading = false;
		this.step.complete = false;
		this.step[stepToShow] = true;
	}
}
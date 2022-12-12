import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom, Observable } from 'rxjs';

import { MbsDossierResourceService } from '@mbs-main/services/dossier.service';
import { MbsDossierDto } from '@mbs-main/class/dossier-dto.class';
import { MbsDossierTypeDto } from '@mbs-main/class/dossier-type-dto.class';
import { MbsAssetDto } from '@mbs-main/class/asset-dto.class';
import { MbsRelifDto } from '@mbs-main/class/relif-dto.class';
import { MbsOperationDto } from '@mbs-main/class/operation-dto.class';

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
		private dossierResourceService: MbsDossierResourceService,
	) { }

	step: any = {
		form: true,
		loading: false,
		complete: false
	};

    
	_dossierNewUpdateForm: FormGroup;
	_isUpdate: boolean = false;
	_dossierResult: any;

	_filteredType: Observable<MbsDossierTypeDto[]>;
	_filteredAsset: Observable<MbsAssetDto[]>;
	_filteredRelif: Observable<MbsRelifDto[]>;
	_filteredOperation: Observable<MbsOperationDto[]>;

	ngOnInit(): void {
		this._dossierNewUpdateForm = this._formBuilder.group({
			id: [null],
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

		//this._filteredType = this.mbsMainAutocompleteService.filterType(this._dossierNewUpdateForm.controls['type'].valueChanges);
		//this._filteredAsset = this.mbsMainAutocompleteService.filterAsset(this._dossierNewUpdateForm.controls['asset'].valueChanges);
		//this._filteredRelif = this.mbsMainAutocompleteService.filterRelif(this._dossierNewUpdateForm.controls['relif'].valueChanges);
		//this._filteredOperation = this.mbsMainAutocompleteService.filterOperation(this._dossierNewUpdateForm.controls['operation'].valueChanges);
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
					await lastValueFrom(this.dossierResourceService.updateDossierUsingPUT(dossier));
					postOrPut = "updated";
				} else {
					await lastValueFrom(this.dossierResourceService.createDossierUsingPOST(dossier));
					postOrPut = "created";
				}

				this._dossierResult = dossier;

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
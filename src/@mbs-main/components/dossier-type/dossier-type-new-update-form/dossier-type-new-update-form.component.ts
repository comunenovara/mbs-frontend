import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom, Observable } from 'rxjs';

import { MbsDossierTypeResourceService } from '@mbs-main/services/dossier-type.service';
import { MbsDossierTypeDto } from '@mbs-main/class/dossier-type-dto.class';

@Component({
	selector: 'mbs-dossier-type-new-update-form',
	templateUrl: './dossier-type-new-update-form.component.html',
	styleUrls: ['./dossier-type-new-update-form.component.scss']
})
export class MbsDossierTypeNewUpdateFormComponent implements OnInit {
	@Input() dossierType: MbsDossierTypeDto;
	@Input() returnToParent: boolean = false; 

	@Output() dossierTypeOutput = new EventEmitter<MbsDossierTypeDto>();
    
    constructor(
		private _formBuilder: FormBuilder,
		private dossierTypeResourceService: MbsDossierTypeResourceService,
	) { }

	step: any = {
		form: true,
		loading: false,
		complete: false
	};

    
	_dossierTypeNewUpdateForm: FormGroup;
	_isUpdate: boolean = false;
	_dossierTypeResult: any;


	ngOnInit(): void {
		this._dossierTypeNewUpdateForm = this._formBuilder.group({
			id: [null],
			description: [null, []],
			category: [null, []],
		});

		if(this.dossierType != null) {
			this._dossierTypeNewUpdateForm.patchValue(this.dossierType);
			this._isUpdate = true;
		}

	}

	async submit() {
		if (!this._dossierTypeNewUpdateForm.valid) {
			return;
		}

		this.setStep("loading");

		let dossierType: MbsDossierTypeDto = this._dossierTypeNewUpdateForm.value;

		if(this.returnToParent) {
			this.dossierTypeOutput.emit(dossierType);
			this.setStep("complete");
		} 

		if(!this.returnToParent) {
			try {
				let postOrPut: string;
				if (dossierType.id != 0) {
					await lastValueFrom(this.dossierTypeResourceService.updateDossierTypeUsingPUT(dossierType));
					postOrPut = "updated";
				} else {
					await lastValueFrom(this.dossierTypeResourceService.createDossierTypeUsingPOST(dossierType));
					postOrPut = "created";
				}

				this._dossierTypeResult = dossierType;

				//this.eventService.reloadCurrentPage();

				this.setStep("complete");

			} catch (error: any) {
				//this._snackBar.open("Error: " + error.error.title, null, { duration: 5000, });
				this.setStep("form");
			}
		}

		//this._fuseProgressBarService.hide();
	}



	newDossierType() {
		//this._dossierType = null;
		this.dossierTypeOutput.emit(this.dossierType);
		this.setStep("form");
	}

	private setStep(stepToShow: string) {
		this.step.form = false;
		this.step.loading = false;
		this.step.complete = false;
		this.step[stepToShow] = true;
	}
}
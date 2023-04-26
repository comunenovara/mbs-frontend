import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { lastValueFrom, Observable } from 'rxjs';

import { EngeCommonService, EngeEngeFormStep, EngeLibGenericForm, EngeValidator } from '@enge/common-lib';

import { MbsWorkAutocompleteService } from '@mbs-work/service/work-auto-complete.service';
import { MbsNominaResourceService } from '@mbs-work/services/nomina.service';
import { MbsNominaDto } from '@mbs-work/class/nomina-dto.class';
import { MbsProgettoDto } from '@mbs-work/class/progetto-dto.class';
import { MbsIncaricoDto } from '@mbs-work/class/incarico-dto.class';
import { MbsFaseDto } from '@mbs-work/class/fase-dto.class';
import { MbsTecnicoDto } from '@mbs-work/class/tecnico-dto.class';
import { MbsAziendaDto } from '@mbs-work/class/azienda-dto.class';

@Component({
	selector: 'mbs-nomina-new-update-form',
	templateUrl: './nomina-new-update-form.component.html',
	styleUrls: ['./nomina-new-update-form.component.scss']
})
export class MbsNominaNewUpdateFormComponent extends EngeLibGenericForm {
	@Input() nomina: MbsNominaDto | undefined;
	@Output() nominaOutput: EventEmitter<MbsNominaDto> = new EventEmitter<MbsNominaDto>();
	
	@Input() progetto: MbsProgettoDto | undefined;
	@Input() incarico: MbsIncaricoDto | undefined;
	@Input() fase: MbsFaseDto | undefined;
	@Input() tecnico: MbsTecnicoDto | undefined;
	@Input() azienda: MbsAziendaDto | undefined;

	constructor(
		ecs: EngeCommonService,
		private _formBuilder: FormBuilder,
		private nominaResourceService: MbsNominaResourceService, 
		protected mbsWorkAutocompleteService: MbsWorkAutocompleteService,
	) { super(ecs); }

	override loadVariables(): void {
		if(this.nomina !== undefined) {
			this.input = this.nomina;
			{
			}
		}
		this.output = this.nominaOutput;
	}

	_filteredProgetto: Observable<MbsProgettoDto[]>;
	_filteredIncarico: Observable<MbsIncaricoDto[]>;
	_filteredFase: Observable<MbsFaseDto[]>;
	_filteredTecnico: Observable<MbsTecnicoDto[]>;
	_filteredAzienda: Observable<MbsAziendaDto[]>;

	override loadForm(): void {
		this._newUpdateForm = this._formBuilder.group({
			id: [null],
			ie: [false, [  ]],
			progetto: [this.progetto, [ EngeValidator.haveId,  ]],
			incarico: [this.incarico, [ EngeValidator.haveId,  ]],
			fase: [this.fase, [  ]],
			tecnico: [this.tecnico, [  ]],
			azienda: [this.azienda, [  ]],
		});

		this._filteredProgetto = this.mbsWorkAutocompleteService.filterProgetto(this._newUpdateForm.controls['progetto'].valueChanges);
		this._filteredIncarico = this.mbsWorkAutocompleteService.filterIncarico(this._newUpdateForm.controls['incarico'].valueChanges);
		this._filteredFase = this.mbsWorkAutocompleteService.filterFase(this._newUpdateForm.controls['fase'].valueChanges);
		this._filteredTecnico = this.mbsWorkAutocompleteService.filterTecnico(this._newUpdateForm.controls['tecnico'].valueChanges);
		this._filteredAzienda = this.mbsWorkAutocompleteService.filterAzienda(this._newUpdateForm.controls['azienda'].valueChanges);
	}

	override prepareResult(): MbsNominaDto {
		let result: MbsNominaDto = this._newUpdateForm.value;
		{
			result.progettoId = (result.progetto != null) ? result.progetto.id : undefined;
			result.incaricoId = (result.incarico != null) ? result.incarico.id : undefined;
			result.faseId = (result.fase != null) ? result.fase.id : undefined;
			result.tecnicoId = (result.tecnico != null) ? result.tecnico.id : undefined;
			result.aziendaId = (result.azienda != null) ? result.azienda.id : undefined;
		}
		return result;
	}

	override async sendToBackEnd(request: MbsNominaDto) {
		try {
			let postOrPut: string;
			if (request.id != null && request.id > 0) {
				await lastValueFrom(this.nominaResourceService.updateNominaUsingPUT(request));
				postOrPut = "updated";
			} else {
				request.id = undefined;
				await lastValueFrom(this.nominaResourceService.createNominaUsingPOST(request));
				postOrPut = "created";
			}
			this._result = request;

			this.ecs.eventer.launchReloadContent("nomina");
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

	protected newNomina() {
		//this._nomina = null;
		this.nominaOutput.emit(this.nomina);
		this.setStep(EngeEngeFormStep.FORM);
	}
}
import { Injectable } from '@angular/core';
import { Observable, of, startWith, switchMap } from 'rxjs';

import { MbsIncaricoResourceService } from '@mbs-work/services/incarico.service';
import { MbsIncaricoDto } from '@mbs-work/class/incarico-dto.class';
import { MbsFaseResourceService } from '@mbs-work/services/fase.service';
import { MbsFaseDto } from '@mbs-work/class/fase-dto.class';
import { MbsProgettoResourceService } from '@mbs-work/services/progetto.service';
import { MbsProgettoDto } from '@mbs-work/class/progetto-dto.class';
import { MbsTecnicoResourceService } from '@mbs-work/services/tecnico.service';
import { MbsTecnicoDto } from '@mbs-work/class/tecnico-dto.class';
import { MbsAziendaResourceService } from '@mbs-work/services/azienda.service';
import { MbsAziendaDto } from '@mbs-work/class/azienda-dto.class';
import { MbsNominaResourceService } from '@mbs-work/services/nomina.service';
import { MbsNominaDto } from '@mbs-work/class/nomina-dto.class';

@Injectable({providedIn: 'root'})
export class MbsWorkAutocompleteService {
	constructor(
		private incaricoResourceService: MbsIncaricoResourceService,
		private faseResourceService: MbsFaseResourceService,
		private progettoResourceService: MbsProgettoResourceService,
		private tecnicoResourceService: MbsTecnicoResourceService,
		private aziendaResourceService: MbsAziendaResourceService,
		private nominaResourceService: MbsNominaResourceService,
	) { }

	filterIncarico(observable: Observable<any>): Observable<MbsIncaricoDto[]> {
		return observable.pipe(
			startWith(() => ''),
			switchMap((value: string) => {
				let filter: any = {};
				if(value && value.length > 0)  {
					filter.descriptionContains = value;
				};
				return this.incaricoResourceService.getAllIncaricosUsingGET(filter);
		  })
	   );
	}

	displayIncarico(selectedElement: any) {
		return selectedElement.description;
	}

	filterFase(observable: Observable<any>): Observable<MbsFaseDto[]> {
		return observable.pipe(
			startWith(() => ''),
			switchMap((value: string) => {
				let filter: any = {};
				if(value && value.length > 0)  {
					filter.descriptionContains = value;
				};
				return this.faseResourceService.getAllFasesUsingGET(filter);
		  })
	   );
	}

	displayFase(selectedElement: any) {
		return selectedElement.description;
	}

	filterProgetto(observable: Observable<any>): Observable<MbsProgettoDto[]> {
		return observable.pipe(
			startWith(() => ''),
			switchMap((value: string) => {
				let filter: any = {};
				if(value && value.length > 0)  {
					filter.descriptionContains = value;
				};
				return this.progettoResourceService.getAllProgettosUsingGET(filter);
		  })
	   );
	}

	displayProgetto(selectedElement: any) {
		return selectedElement.description;
	}

	filterTecnico(observable: Observable<any>): Observable<MbsTecnicoDto[]> {
		return observable.pipe(
			startWith(() => ''),
			switchMap((value: string) => {
				let filter: any = {};
				if(value && value.length > 0)  {
					filter.descriptionContains = value;
				};
				return this.tecnicoResourceService.getAllTecnicosUsingGET(filter);
		  })
	   );
	}

	displayTecnico(selectedElement: any) {
		return selectedElement.description;
	}

	filterAzienda(observable: Observable<any>): Observable<MbsAziendaDto[]> {
		return observable.pipe(
			startWith(() => ''),
			switchMap((value: string) => {
				let filter: any = {};
				if(value && value.length > 0)  {
					filter.descriptionContains = value;
				};
				return this.aziendaResourceService.getAllAziendasUsingGET(filter);
		  })
	   );
	}

	displayAzienda(selectedElement: any) {
		return selectedElement.description;
	}

	filterNomina(observable: Observable<any>): Observable<MbsNominaDto[]> {
		return observable.pipe(
			startWith(() => ''),
			switchMap((value: string) => {
				let filter: any = {};
				if(value && value.length > 0)  {
					filter.descriptionContains = value;
				};
				return this.nominaResourceService.getAllNominasUsingGET(filter);
		  })
	   );
	}

	displayNomina(selectedElement: any) {
		return selectedElement.description;
	}

}
import { Injectable } from '@angular/core';
import { Observable, of, startWith, switchMap } from 'rxjs';

import { MbsProcurementTypeResourceService } from '@mbs-incentive/services/procurement-type.service';
import { MbsProcurementTypeDto } from '@mbs-incentive/class/procurement-type-dto.class';
import { MbsIncentiveRegulationResourceService } from '@mbs-incentive/services/incentive-regulation.service';
import { MbsIncentiveRegulationDto } from '@mbs-incentive/class/incentive-regulation-dto.class';
import { MbsCalculationMethodResourceService } from '@mbs-incentive/services/calculation-method.service';
import { MbsCalculationMethodDto } from '@mbs-incentive/class/calculation-method-dto.class';
import { MbsCalculationFactorResourceService } from '@mbs-incentive/services/calculation-factor.service';
import { MbsCalculationFactorDto } from '@mbs-incentive/class/calculation-factor-dto.class';
import { MbsWithheldResourceService } from '@mbs-incentive/services/withheld.service';
import { MbsWithheldDto } from '@mbs-incentive/class/withheld-dto.class';
import { MbsStageResourceService } from '@mbs-incentive/services/stage.service';
import { MbsStageDto } from '@mbs-incentive/class/stage-dto.class';
import { MbsRoleResourceService } from '@mbs-incentive/services/role.service';
import { MbsRoleDto } from '@mbs-incentive/class/role-dto.class';
import { MbsRoleValueResourceService } from '@mbs-incentive/services/role-value.service';
import { MbsRoleValueDto } from '@mbs-incentive/class/role-value-dto.class';

@Injectable({providedIn: 'root'})
export class MbsIncentiveAutocompleteService {
	constructor(
		private procurementTypeResourceService: MbsProcurementTypeResourceService,
		private incentiveRegulationResourceService: MbsIncentiveRegulationResourceService,
		private calculationMethodResourceService: MbsCalculationMethodResourceService,
		private calculationFactorResourceService: MbsCalculationFactorResourceService,
		private withheldResourceService: MbsWithheldResourceService,
		private stageResourceService: MbsStageResourceService,
		private roleResourceService: MbsRoleResourceService,
		private roleValueResourceService: MbsRoleValueResourceService,
	) { }

	filterProcurementType(observable: Observable<any>): Observable<MbsProcurementTypeDto[]> {
		return observable.pipe(
			startWith(() => ''),
			switchMap((value: string) => {
				let filter: any = {};
				if(value && value.length > 0)  {
					filter.descriptionContains = value;
				};
				return this.procurementTypeResourceService.getAllProcurementTypesUsingGET(filter);
		  })
	   );
	}

	displayProcurementType(selectedElement: any) {
		return selectedElement.description;
	}

	filterIncentiveRegulation(observable: Observable<any>): Observable<MbsIncentiveRegulationDto[]> {
		return observable.pipe(
			startWith(() => ''),
			switchMap((value: string) => {
				let filter: any = {};
				if(value && value.length > 0)  {
					filter.descriptionContains = value;
				};
				return this.incentiveRegulationResourceService.getAllIncentiveRegulationsUsingGET(filter);
		  })
	   );
	}

	displayIncentiveRegulation(selectedElement: any) {
		return selectedElement.description;
	}

	filterCalculationMethod(observable: Observable<any>): Observable<MbsCalculationMethodDto[]> {
		return observable.pipe(
			startWith(() => ''),
			switchMap((value: string) => {
				let filter: any = {};
				if(value && value.length > 0)  {
					filter.descriptionContains = value;
				};
				return this.calculationMethodResourceService.getAllCalculationMethodsUsingGET(filter);
		  })
	   );
	}

	displayCalculationMethod(selectedElement: any) {
		return selectedElement.description;
	}

	filterCalculationFactor(observable: Observable<any>): Observable<MbsCalculationFactorDto[]> {
		return observable.pipe(
			startWith(() => ''),
			switchMap((value: string) => {
				let filter: any = {};
				if(value && value.length > 0)  {
					filter.descriptionContains = value;
				};
				return this.calculationFactorResourceService.getAllCalculationFactorsUsingGET(filter);
		  })
	   );
	}

	displayCalculationFactor(selectedElement: any) {
		return selectedElement.description;
	}

	filterWithheld(observable: Observable<any>): Observable<MbsWithheldDto[]> {
		return observable.pipe(
			startWith(() => ''),
			switchMap((value: string) => {
				let filter: any = {};
				if(value && value.length > 0)  {
					filter.descriptionContains = value;
				};
				return this.withheldResourceService.getAllWithheldsUsingGET(filter);
		  })
	   );
	}

	displayWithheld(selectedElement: any) {
		return selectedElement.description;
	}

	filterStage(observable: Observable<any>): Observable<MbsStageDto[]> {
		return observable.pipe(
			startWith(() => ''),
			switchMap((value: string) => {
				let filter: any = {};
				if(value && value.length > 0)  {
					filter.descriptionContains = value;
				};
				return this.stageResourceService.getAllStagesUsingGET(filter);
		  })
	   );
	}

	displayStage(selectedElement: any) {
		return selectedElement.description;
	}

	filterRole(observable: Observable<any>): Observable<MbsRoleDto[]> {
		return observable.pipe(
			startWith(() => ''),
			switchMap((value: string) => {
				let filter: any = {};
				if(value && value.length > 0)  {
					filter.descriptionContains = value;
				};
				return this.roleResourceService.getAllRolesUsingGET(filter);
		  })
	   );
	}

	displayRole(selectedElement: any) {
		return selectedElement.description;
	}

	filterRoleValue(observable: Observable<any>): Observable<MbsRoleValueDto[]> {
		return observable.pipe(
			startWith(() => ''),
			switchMap((value: string) => {
				let filter: any = {};
				if(value && value.length > 0)  {
					filter.descriptionContains = value;
				};
				return this.roleValueResourceService.getAllRoleValuesUsingGET(filter);
		  })
	   );
	}

	displayRoleValue(selectedElement: any) {
		return selectedElement.description;
	}

}
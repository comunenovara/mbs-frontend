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
import { MbsGovernativeProcurementLotResourceService } from '@mbs-incentive/services/governative-procurement-lot.service';
import { MbsGovernativeProcurementLotDto } from '@mbs-incentive/class/governative-procurement-lot-dto.class';
import { MbsIncentiveCalculationResourceService } from '@mbs-incentive/services/incentive-calculation.service';
import { MbsIncentiveCalculationDto } from '@mbs-incentive/class/incentive-calculation-dto.class';
import { MbsBeneficiaryResourceService } from '@mbs-incentive/services/beneficiary.service';
import { MbsBeneficiaryDto } from '@mbs-incentive/class/beneficiary-dto.class';
import { MbsIncentiveRoleValueResourceService } from '@mbs-incentive/services/incentive-role-value.service';
import { MbsIncentiveRoleValueDto } from '@mbs-incentive/class/incentive-role-value-dto.class';
import { MbsIncentiveAssignationRoleResourceService } from '@mbs-incentive/services/incentive-assignation-role.service';
import { MbsIncentiveAssignationRoleDto } from '@mbs-incentive/class/incentive-assignation-role-dto.class';
import { MbsIncentiveAssignationStageResourceService } from '@mbs-incentive/services/incentive-assignation-stage.service';
import { MbsIncentiveAssignationStageDto } from '@mbs-incentive/class/incentive-assignation-stage-dto.class';
import { MbsGovernativeProjectResourceService } from '@mbs-incentive/services/governative-project.service';
import { MbsGovernativeProjectDto } from '@mbs-incentive/class/governative-project-dto.class';
import { MbsGovernativeProjectAndProcurementLotResourceService } from '@mbs-incentive/services/governative-project-and-procurement-lot.service';
import { MbsGovernativeProjectAndProcurementLotDto } from '@mbs-incentive/class/governative-project-and-procurement-lot-dto.class';

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
		private governativeProcurementLotResourceService: MbsGovernativeProcurementLotResourceService,
		private incentiveCalculationResourceService: MbsIncentiveCalculationResourceService,
		private beneficiaryResourceService: MbsBeneficiaryResourceService,
		private incentiveRoleValueResourceService: MbsIncentiveRoleValueResourceService,
		private incentiveAssignationRoleResourceService: MbsIncentiveAssignationRoleResourceService,
		private incentiveAssignationStageResourceService: MbsIncentiveAssignationStageResourceService,
		private governativeProjectResourceService: MbsGovernativeProjectResourceService,
		private governativeProjectAndProcurementLotResourceService: MbsGovernativeProjectAndProcurementLotResourceService,
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

	filterGovernativeProcurementLot(observable: Observable<any>): Observable<MbsGovernativeProcurementLotDto[]> {
		return observable.pipe(
			startWith(() => ''),
			switchMap((value: string) => {
				let filter: any = {};
				if(value && value.length > 0)  {
					filter.descriptionContains = value;
				};
				return this.governativeProcurementLotResourceService.getAllGovernativeProcurementLotsUsingGET(filter);
		  })
	   );
	}

	displayGovernativeProcurementLot(selectedElement: any) {
		return selectedElement.description;
	}

	filterIncentiveCalculation(observable: Observable<any>): Observable<MbsIncentiveCalculationDto[]> {
		return observable.pipe(
			startWith(() => ''),
			switchMap((value: string) => {
				let filter: any = {};
				if(value && value.length > 0)  {
					filter.descriptionContains = value;
				};
				return this.incentiveCalculationResourceService.getAllIncentiveCalculationsUsingGET(filter);
		  })
	   );
	}

	displayIncentiveCalculation(selectedElement: any) {
		return selectedElement.description;
	}

	filterBeneficiary(observable: Observable<any>): Observable<MbsBeneficiaryDto[]> {
		return observable.pipe(
			startWith(() => ''),
			switchMap((value: string) => {
				let filter: any = {};
				if(value && value.length > 0)  {
					filter.nameContains = value;
				};
				return this.beneficiaryResourceService.getAllBeneficiariesUsingGET(filter);
		  })
	   );
	}

	displayBeneficiary(selectedElement: any) {
		return selectedElement.name;
	}

	filterIncentiveRoleValue(observable: Observable<any>): Observable<MbsIncentiveRoleValueDto[]> {
		return observable.pipe(
			startWith(() => ''),
			switchMap((value: string) => {
				let filter: any = {};
				if(value && value.length > 0)  {
					filter.descriptionContains = value;
				};
				return this.incentiveRoleValueResourceService.getAllIncentiveRoleValuesUsingGET(filter);
		  })
	   );
	}

	displayIncentiveRoleValue(selectedElement: any) {
		return selectedElement.description;
	}

	filterIncentiveAssignationRole(observable: Observable<any>): Observable<MbsIncentiveAssignationRoleDto[]> {
		return observable.pipe(
			startWith(() => ''),
			switchMap((value: string) => {
				let filter: any = {};
				if(value && value.length > 0)  {
					filter.descriptionContains = value;
				};
				return this.incentiveAssignationRoleResourceService.getAllIncentiveAssignationRolesUsingGET(filter);
		  })
	   );
	}

	displayIncentiveAssignationRole(selectedElement: any) {
		return selectedElement.description;
	}

	filterIncentiveAssignationStage(observable: Observable<any>): Observable<MbsIncentiveAssignationStageDto[]> {
		return observable.pipe(
			startWith(() => ''),
			switchMap((value: string) => {
				let filter: any = {};
				if(value && value.length > 0)  {
					filter.descriptionContains = value;
				};
				return this.incentiveAssignationStageResourceService.getAllIncentiveAssignationStagesUsingGET(filter);
		  })
	   );
	}

	displayIncentiveAssignationStage(selectedElement: any) {
		return selectedElement.description;
	}

	filterGovernativeProject(observable: Observable<any>): Observable<MbsGovernativeProjectDto[]> {
		return observable.pipe(
			startWith(() => ''),
			switchMap((value: string) => {
				let filter: any = {};
				if(value && value.length > 0)  {
					filter.descriptionContains = value;
				};
				return this.governativeProjectResourceService.getAllGovernativeProjectsUsingGET(filter);
		  })
	   );
	}

	displayGovernativeProject(selectedElement: any) {
		return selectedElement.description;
	}

	filterGovernativeProjectAndProcurementLot(observable: Observable<any>): Observable<MbsGovernativeProjectAndProcurementLotDto[]> {
		return observable.pipe(
			startWith(() => ''),
			switchMap((value: string) => {
				let filter: any = {};
				if(value && value.length > 0)  {
					filter.descriptionContains = value;
				};
				return this.governativeProjectAndProcurementLotResourceService.getAllGovernativeProjectAndProcurementLotsUsingGET(filter);
		  })
	   );
	}

	displayGovernativeProjectAndProcurementLot(selectedElement: any) {
		return selectedElement.description;
	}

}
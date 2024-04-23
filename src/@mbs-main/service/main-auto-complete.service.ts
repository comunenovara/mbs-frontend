import { Injectable } from '@angular/core';
import { Observable, of, startWith, switchMap } from 'rxjs';

import { MbsAssetResourceService } from '@mbs-main/services/asset.service';
import { MbsAssetDto } from '@mbs-main/class/asset-dto.class';
import { MbsRelifResourceService } from '@mbs-main/services/relif.service';
import { MbsRelifDto } from '@mbs-main/class/relif-dto.class';
import { MbsOperationTypeResourceService } from '@mbs-main/services/operation-type.service';
import { MbsOperationTypeDto } from '@mbs-main/class/operation-type-dto.class';
import { MbsOperationResourceService } from '@mbs-main/services/operation.service';
import { MbsOperationDto } from '@mbs-main/class/operation-dto.class';
import { MbsDossierTypeResourceService } from '@mbs-main/services/dossier-type.service';
import { MbsDossierTypeDto } from '@mbs-main/class/dossier-type-dto.class';
import { MbsElaborateGroupResourceService } from '@mbs-main/services/elaborate-group.service';
import { MbsElaborateGroupDto } from '@mbs-main/class/elaborate-group-dto.class';
import { MbsDossierResourceService } from '@mbs-main/services/dossier.service';
import { MbsDossierDto } from '@mbs-main/class/dossier-dto.class';
import { MbsProcurementTypeResourceService } from '@mbs-main/services/procurement-type.service';
import { MbsProcurementTypeDto } from '@mbs-main/class/procurement-type-dto.class';
import { MbsGovernativeProjectResourceService } from '@mbs-main/services/governative-project.service';
import { MbsGovernativeProjectDto } from '@mbs-main/class/governative-project-dto.class';
import { MbsGovernativeProcurementLotResourceService } from '@mbs-main/services/governative-procurement-lot.service';
import { MbsGovernativeProcurementLotDto } from '@mbs-main/class/governative-procurement-lot-dto.class';
import { MbsGovernativeProjectProcurementLotResourceService } from '@mbs-main/services/governative-project-procurement-lot.service';
import { MbsGovernativeProjectProcurementLotDto } from '@mbs-main/class/governative-project-procurement-lot-dto.class';
import { MbsIncentiveBeneficiaryResourceService } from '@mbs-main/services/incentive-beneficiary.service';
import { MbsIncentiveBeneficiaryDto } from '@mbs-main/class/incentive-beneficiary-dto.class';
import { MbsIncentiveRegulationResourceService } from '@mbs-main/services/incentive-regulation.service';
import { MbsIncentiveRegulationDto } from '@mbs-main/class/incentive-regulation-dto.class';
import { MbsIncentiveWithheldResourceService } from '@mbs-main/services/incentive-withheld.service';
import { MbsIncentiveWithheldDto } from '@mbs-main/class/incentive-withheld-dto.class';
import { MbsIncentiveCalculationMethodResourceService } from '@mbs-main/services/incentive-calculation-method.service';
import { MbsIncentiveCalculationMethodDto } from '@mbs-main/class/incentive-calculation-method-dto.class';
import { MbsIncentiveCalculationFactorResourceService } from '@mbs-main/services/incentive-calculation-factor.service';
import { MbsIncentiveCalculationFactorDto } from '@mbs-main/class/incentive-calculation-factor-dto.class';
import { MbsIncentiveStageResourceService } from '@mbs-main/services/incentive-stage.service';
import { MbsIncentiveStageDto } from '@mbs-main/class/incentive-stage-dto.class';
import { MbsIncentiveRoleResourceService } from '@mbs-main/services/incentive-role.service';
import { MbsIncentiveRoleDto } from '@mbs-main/class/incentive-role-dto.class';
import { MbsIncentiveRegulationValueResourceService } from '@mbs-main/services/incentive-regulation-value.service';
import { MbsIncentiveRegulationValueDto } from '@mbs-main/class/incentive-regulation-value-dto.class';
import { MbsIncentiveCalculationResourceService } from '@mbs-main/services/incentive-calculation.service';
import { MbsIncentiveCalculationDto } from '@mbs-main/class/incentive-calculation-dto.class';
import { MbsIncentiveRoleAssignationResourceService } from '@mbs-main/services/incentive-role-assignation.service';
import { MbsIncentiveRoleAssignationDto } from '@mbs-main/class/incentive-role-assignation-dto.class';
import { MbsIncentiveCalculationValueResourceService } from '@mbs-main/services/incentive-calculation-value.service';
import { MbsIncentiveCalculationValueDto } from '@mbs-main/class/incentive-calculation-value-dto.class';
import { MbsIncentiveAssignationResourceService } from '@mbs-main/services/incentive-assignation.service';
import { MbsIncentiveAssignationDto } from '@mbs-main/class/incentive-assignation-dto.class';

@Injectable({providedIn: 'root'})
export class MbsMainAutocompleteService {
	constructor(
		private assetResourceService: MbsAssetResourceService,
		private relifResourceService: MbsRelifResourceService,
		private operationTypeResourceService: MbsOperationTypeResourceService,
		private operationResourceService: MbsOperationResourceService,
		private dossierTypeResourceService: MbsDossierTypeResourceService,
		private elaborateGroupResourceService: MbsElaborateGroupResourceService,
		private dossierResourceService: MbsDossierResourceService,
		private procurementTypeResourceService: MbsProcurementTypeResourceService,
		private governativeProjectResourceService: MbsGovernativeProjectResourceService,
		private governativeProcurementLotResourceService: MbsGovernativeProcurementLotResourceService,
		private governativeProjectProcurementLotResourceService: MbsGovernativeProjectProcurementLotResourceService,
		private incentiveBeneficiaryResourceService: MbsIncentiveBeneficiaryResourceService,
		private incentiveRegulationResourceService: MbsIncentiveRegulationResourceService,
		private incentiveWithheldResourceService: MbsIncentiveWithheldResourceService,
		private incentiveCalculationMethodResourceService: MbsIncentiveCalculationMethodResourceService,
		private incentiveCalculationFactorResourceService: MbsIncentiveCalculationFactorResourceService,
		private incentiveStageResourceService: MbsIncentiveStageResourceService,
		private incentiveRoleResourceService: MbsIncentiveRoleResourceService,
		private incentiveRegulationValueResourceService: MbsIncentiveRegulationValueResourceService,
		private incentiveCalculationResourceService: MbsIncentiveCalculationResourceService,
		private incentiveRoleAssignationResourceService: MbsIncentiveRoleAssignationResourceService,
		private incentiveCalculationValueResourceService: MbsIncentiveCalculationValueResourceService,
		private incentiveAssignationResourceService: MbsIncentiveAssignationResourceService,
	) { }

	filterAsset(observable: Observable<any>): Observable<MbsAssetDto[]> {
		return observable.pipe(
			startWith(() => ''),
			switchMap((value: string) => {
				let filter: any = {};
				if(value && value.length > 0)  {
					filter.descriptionContains = value;
				};
				return this.assetResourceService.getAllAssetsUsingGET(filter);
		  })
	   );
	}

	displayAsset(selectedElement: any) {
		return selectedElement.description;
	}

	filterRelif(observable: Observable<any>): Observable<MbsRelifDto[]> {
		return observable.pipe(
			startWith(() => ''),
			switchMap((value: string) => {
				let filter: any = {};
				if(value && value.length > 0)  {
					filter.descriptionContains = value;
				};
				return this.relifResourceService.getAllRelifsUsingGET(filter);
		  })
	   );
	}

	displayRelif(selectedElement: any) {
		return selectedElement.description;
	}

	filterOperationType(observable: Observable<any>): Observable<MbsOperationTypeDto[]> {
		return observable.pipe(
			startWith(() => ''),
			switchMap((value: string) => {
				let filter: any = {};
				if(value && value.length > 0)  {
					filter.descriptionContains = value;
				};
				return this.operationTypeResourceService.getAllOperationTypesUsingGET(filter);
		  })
	   );
	}

	displayOperationType(selectedElement: any) {
		return selectedElement.description;
	}

	filterOperation(observable: Observable<any>): Observable<MbsOperationDto[]> {
		return observable.pipe(
			startWith(() => ''),
			switchMap((value: string) => {
				let filter: any = {};
				if(value && value.length > 0)  {
					filter.descriptionContains = value;
				};
				return this.operationResourceService.getAllOperationsUsingGET(filter);
		  })
	   );
	}

	displayOperation(selectedElement: any) {
		return selectedElement.description;
	}

	filterDossierType(observable: Observable<any>): Observable<MbsDossierTypeDto[]> {
		return observable.pipe(
			startWith(() => ''),
			switchMap((value: string) => {
				let filter: any = {};
				if(value && value.length > 0)  {
					filter.descriptionContains = value;
				};
				return this.dossierTypeResourceService.getAllDossierTypesUsingGET(filter);
		  })
	   );
	}

	displayDossierType(selectedElement: any) {
		return selectedElement.description;
	}

	filterElaborateGroup(observable: Observable<any>): Observable<MbsElaborateGroupDto[]> {
		return observable.pipe(
			startWith(() => ''),
			switchMap((value: string) => {
				let filter: any = {};
				if(value && value.length > 0)  {
					filter.descriptionContains = value;
				};
				return this.elaborateGroupResourceService.getAllElaborateGroupsUsingGET(filter);
		  })
	   );
	}

	displayElaborateGroup(selectedElement: any) {
		return selectedElement.description;
	}

	filterDossier(observable: Observable<any>): Observable<MbsDossierDto[]> {
		return observable.pipe(
			startWith(() => ''),
			switchMap((value: string) => {
				let filter: any = {};
				if(value && value.length > 0)  {
					filter.descriptionContains = value;
				};
				return this.dossierResourceService.getAllDossiersUsingGET(filter);
		  })
	   );
	}

	displayDossier(selectedElement: any) {
		return selectedElement.description;
	}

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

	filterGovernativeProjectProcurementLot(observable: Observable<any>): Observable<MbsGovernativeProjectProcurementLotDto[]> {
		return observable.pipe(
			startWith(() => ''),
			switchMap((value: string) => {
				let filter: any = {};
				if(value && value.length > 0)  {
					filter.descriptionContains = value;
				};
				return this.governativeProjectProcurementLotResourceService.getAllGovernativeProjectProcurementLotsUsingGET(filter);
		  })
	   );
	}

	displayGovernativeProjectProcurementLot(selectedElement: any) {
		return selectedElement.description;
	}

	filterIncentiveBeneficiary(observable: Observable<any>): Observable<MbsIncentiveBeneficiaryDto[]> {
		return observable.pipe(
			startWith(() => ''),
			switchMap((value: string) => {
				let filter: any = {};
				if(value && value.length > 0)  {
					filter.descriptionContains = value;
				};
				return this.incentiveBeneficiaryResourceService.getAllIncentiveBeneficiariesUsingGET(filter);
		  })
	   );
	}

	displayIncentiveBeneficiary(selectedElement: any) {
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

	filterIncentiveWithheld(observable: Observable<any>): Observable<MbsIncentiveWithheldDto[]> {
		return observable.pipe(
			startWith(() => ''),
			switchMap((value: string) => {
				let filter: any = {};
				if(value && value.length > 0)  {
					filter.descriptionContains = value;
				};
				return this.incentiveWithheldResourceService.getAllIncentiveWithheldsUsingGET(filter);
		  })
	   );
	}

	displayIncentiveWithheld(selectedElement: any) {
		return selectedElement.description;
	}

	filterIncentiveCalculationMethod(observable: Observable<any>): Observable<MbsIncentiveCalculationMethodDto[]> {
		return observable.pipe(
			startWith(() => ''),
			switchMap((value: string) => {
				let filter: any = {};
				if(value && value.length > 0)  {
					filter.descriptionContains = value;
				};
				return this.incentiveCalculationMethodResourceService.getAllIncentiveCalculationMethodsUsingGET(filter);
		  })
	   );
	}

	displayIncentiveCalculationMethod(selectedElement: any) {
		return selectedElement.description;
	}

	filterIncentiveCalculationFactor(observable: Observable<any>): Observable<MbsIncentiveCalculationFactorDto[]> {
		return observable.pipe(
			startWith(() => ''),
			switchMap((value: string) => {
				let filter: any = {};
				if(value && value.length > 0)  {
					filter.descriptionContains = value;
				};
				return this.incentiveCalculationFactorResourceService.getAllIncentiveCalculationFactorsUsingGET(filter);
		  })
	   );
	}

	displayIncentiveCalculationFactor(selectedElement: any) {
		return selectedElement.description;
	}

	filterIncentiveStage(observable: Observable<any>): Observable<MbsIncentiveStageDto[]> {
		return observable.pipe(
			startWith(() => ''),
			switchMap((value: string) => {
				let filter: any = {};
				if(value && value.length > 0)  {
					filter.descriptionContains = value;
				};
				return this.incentiveStageResourceService.getAllIncentiveStagesUsingGET(filter);
		  })
	   );
	}

	displayIncentiveStage(selectedElement: any) {
		return selectedElement.description;
	}

	filterIncentiveRole(observable: Observable<any>): Observable<MbsIncentiveRoleDto[]> {
		return observable.pipe(
			startWith(() => ''),
			switchMap((value: string) => {
				let filter: any = {};
				if(value && value.length > 0)  {
					filter.descriptionContains = value;
				};
				return this.incentiveRoleResourceService.getAllIncentiveRolesUsingGET(filter);
		  })
	   );
	}
	filterIncentiveRoleByIncentiveRegulationAndProcurementType(incentiveRegulation: MbsIncentiveRegulationDto, procurementTypeId: number, observable: Observable<any>): Observable<MbsIncentiveRoleDto[]> {
		return observable.pipe(
			startWith(() => ''),
			switchMap((value: string) => {
				let filter: any = {
					regulationIdEquals: incentiveRegulation.id,
					procurementTypeIdEquals: procurementTypeId,
				};
				if(value && value.length > 0)  {
					filter.descriptionContains = value;
				};
				return this.incentiveRoleResourceService.getAllIncentiveRolesUsingGET(filter);
		  })
	   );
	}

	displayIncentiveRole(selectedElement: any) {
		return selectedElement.description;
	}

	filterIncentiveRegulationValue(observable: Observable<any>): Observable<MbsIncentiveRegulationValueDto[]> {
		return observable.pipe(
			startWith(() => ''),
			switchMap((value: string) => {
				let filter: any = {};
				if(value && value.length > 0)  {
					filter.descriptionContains = value;
				};
				return this.incentiveRegulationValueResourceService.getAllIncentiveRegulationValuesUsingGET(filter);
		  })
	   );
	}

	displayIncentiveRegulationValue(selectedElement: any) {
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

	filterIncentiveRoleAssignation(observable: Observable<any>): Observable<MbsIncentiveRoleAssignationDto[]> {
		return observable.pipe(
			startWith(() => ''),
			switchMap((value: string) => {
				let filter: any = {};
				if(value && value.length > 0)  {
					filter.descriptionContains = value;
				};
				return this.incentiveRoleAssignationResourceService.getAllIncentiveRoleAssignationsUsingGET(filter);
		  })
	   );
	}

	displayIncentiveRoleAssignation(selectedElement: any) {
		return selectedElement.description;
	}

	filterIncentiveCalculationValue(observable: Observable<any>): Observable<MbsIncentiveCalculationValueDto[]> {
		return observable.pipe(
			startWith(() => ''),
			switchMap((value: string) => {
				let filter: any = {};
				if(value && value.length > 0)  {
					filter.descriptionContains = value;
				};
				return this.incentiveCalculationValueResourceService.getAllIncentiveCalculationValuesUsingGET(filter);
		  })
	   );
	}

	displayIncentiveCalculationValue(selectedElement: any) {
		return selectedElement.description;
	}

	filterIncentiveAssignation(observable: Observable<any>): Observable<MbsIncentiveAssignationDto[]> {
		return observable.pipe(
			startWith(() => ''),
			switchMap((value: string) => {
				let filter: any = {};
				if(value && value.length > 0)  {
					filter.descriptionContains = value;
				};
				return this.incentiveAssignationResourceService.getAllIncentiveAssignationsUsingGET(filter);
		  })
	   );
	}

	displayIncentiveAssignation(selectedElement: any) {
		return selectedElement.description;
	}

}
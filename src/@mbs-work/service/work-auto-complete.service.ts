import { Injectable } from '@angular/core';
import { Observable, of, startWith, switchMap } from 'rxjs';

import { MbsProjectResourceService } from '@mbs-work/services/project.service';
import { MbsProjectDto } from '@mbs-work/class/project-dto.class';
import { MbsRoleResourceService } from '@mbs-work/services/role.service';
import { MbsRoleDto } from '@mbs-work/class/role-dto.class';
import { MbsWorkCategoryResourceService } from '@mbs-work/services/work-category.service';
import { MbsWorkCategoryDto } from '@mbs-work/class/work-category-dto.class';
import { MbsEmployeeResourceService } from '@mbs-work/services/employee.service';
import { MbsEmployeeDto } from '@mbs-work/class/employee-dto.class';
import { MbsCompanyResourceService } from '@mbs-work/services/company.service';
import { MbsCompanyDto } from '@mbs-work/class/company-dto.class';
import { MbsAssignementResourceService } from '@mbs-work/services/assignement.service';
import { MbsAssignementDto } from '@mbs-work/class/assignement-dto.class';

@Injectable({providedIn: 'root'})
export class MbsWorkAutocompleteService {
	constructor(
		private projectResourceService: MbsProjectResourceService,
		private roleResourceService: MbsRoleResourceService,
		private workCategoryResourceService: MbsWorkCategoryResourceService,
		private employeeResourceService: MbsEmployeeResourceService,
		private companyResourceService: MbsCompanyResourceService,
		private assignementResourceService: MbsAssignementResourceService,
	) { }

	displayProject(selectedElement: any) {
		return selectedElement.name;
	}

	filterProject(observable: Observable<any>): Observable<MbsProjectDto[]> {
		return observable.pipe(
			startWith(() => ''),
			switchMap((value: string) => {
				let filter: any = {};
				if(value && value.length > 0)  {
					filter.nameContains = value;
				};
				return this.projectResourceService.getAllProjectsUsingGET(filter);
		  })
	   );
	}

	displayIncarico(selectedElement: any) {
		return selectedElement.name;
	}

	filterRole(observable: Observable<any>): Observable<MbsRoleDto[]> {
		return observable.pipe(
			startWith(() => ''),
			switchMap((value: string) => {
				let filter: any = {};
				if(value && value.length > 0)  {
					filter.nameContains = value;
				};
				return this.roleResourceService.getAllRolesUsingGET(filter);
		  })
	   );
	}

	displayRole(selectedElement: any) {
		return selectedElement.name;
	}

	filterWorkCategory(observable: Observable<any>): Observable<MbsWorkCategoryDto[]> {
		return observable.pipe(
			startWith(() => ''),
			switchMap((value: string) => {
				let filter: any = {};
				if(value && value.length > 0)  {
					filter.nameContains = value;
				};
				return this.workCategoryResourceService.getAllWorkCategoriesUsingGET(filter);
		  })
	   );
	}

	displayWorkCategory(selectedElement: any) {
		return selectedElement.name;
	}

	filterEmployee(observable: Observable<any>): Observable<MbsEmployeeDto[]> {
		return observable.pipe(
			startWith(() => ''),
			switchMap((value: string) => {
				let filter: any = {};
				if(value && value.length > 0)  {
					filter.nameContains = value;
				};
				return this.employeeResourceService.getAllEmployeesUsingGET(filter);
		  })
	   );
	}

	displayEmployee(selectedElement: any) {
		return selectedElement.name;
	}

	filterCompany(observable: Observable<any>): Observable<MbsCompanyDto[]> {
		return observable.pipe(
			startWith(() => ''),
			switchMap((value: string) => {
				let filter: any = {};
				if(value && value.length > 0)  {
					filter.nameContains = value;
				};
				return this.companyResourceService.getAllCompaniesUsingGET(filter);
		  })
	   );
	}

	displayCompany(selectedElement: any) {
		return selectedElement.name;
	}

	filterAssignement(observable: Observable<any>): Observable<MbsAssignementDto[]> {
		return observable.pipe(
			startWith(() => ''),
			switchMap((value: string) => {
				let filter: any = {};
				if(value && value.length > 0)  {
					filter.nameContains = value;
				};
				return this.assignementResourceService.getAllAssignementsUsingGET(filter);
		  })
	   );
	}

	displayAssignement(selectedElement: any) {
		return selectedElement.name;
	}


}
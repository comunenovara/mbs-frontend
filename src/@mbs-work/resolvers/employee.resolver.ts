import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MbsEmployeeDto } from '../class/employee-dto.class';
import { MbsEmployeeResourceService } from '../services/employee.service';

@Injectable()
export class MbsEmployeeResolver implements Resolve<Observable<MbsEmployeeDto>> {
	constructor(private employeeResourceService: MbsEmployeeResourceService) { }

	resolve(route: ActivatedRouteSnapshot) {
		var id = route.paramMap.get('id');
		if(id === null) throw new Error('Not valid Id');
		return this.employeeResourceService.getEmployeeUsingGET(+id);
	}
}
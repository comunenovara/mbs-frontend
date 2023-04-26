import { Component, Input, OnInit } from '@angular/core';
import { MbsEmployeeDto } from '../../../class/employee-dto.class';

@Component({
	selector: 'mbs-employee-detail-box',
	templateUrl: './employee-detail-box.component.html',
	styleUrls: ['./employee-detail-box.component.scss']
})
export class MbsEmployeeDetailBoxComponent {

	@Input()
	employee: MbsEmployeeDto;

	constructor( ) { }
}
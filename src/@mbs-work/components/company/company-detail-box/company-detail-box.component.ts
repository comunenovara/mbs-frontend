import { Component, Input, OnInit } from '@angular/core';
import { MbsCompanyDto } from '../../../class/company-dto.class';

@Component({
	selector: 'mbs-company-detail-box',
	templateUrl: './company-detail-box.component.html',
	styleUrls: ['./company-detail-box.component.scss']
})
export class MbsCompanyDetailBoxComponent {

	@Input()
	company: MbsCompanyDto;

	constructor( ) { }
}
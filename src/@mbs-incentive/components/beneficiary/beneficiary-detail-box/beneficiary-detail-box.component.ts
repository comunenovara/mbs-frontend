import { Component, Input, OnInit } from '@angular/core';
import { MbsBeneficiaryDto } from '../../../class/beneficiary-dto.class';

@Component({
	selector: 'mbs-beneficiary-detail-box',
	templateUrl: './beneficiary-detail-box.component.html',
	styleUrls: ['./beneficiary-detail-box.component.scss']
})
export class MbsBeneficiaryDetailBoxComponent {

	@Input()
	beneficiary: MbsBeneficiaryDto;

	constructor( ) { }
}
import { Component, Input, OnInit } from '@angular/core';
import { MbsCalculationMethodDto } from '../../../class/calculation-method-dto.class';

@Component({
	selector: 'mbs-calculation-method-detail-box',
	templateUrl: './calculation-method-detail-box.component.html',
	styleUrls: ['./calculation-method-detail-box.component.scss']
})
export class MbsCalculationMethodDetailBoxComponent {

	@Input()
	calculationMethod: MbsCalculationMethodDto;

	constructor( ) { }
}
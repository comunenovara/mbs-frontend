import { Component, Input, OnInit } from '@angular/core';
import { MbsCalculationFactorDto } from '../../../class/calculation-factor-dto.class';

@Component({
	selector: 'mbs-calculation-factor-detail-box',
	templateUrl: './calculation-factor-detail-box.component.html',
	styleUrls: ['./calculation-factor-detail-box.component.scss']
})
export class MbsCalculationFactorDetailBoxComponent {

	@Input()
	calculationFactor: MbsCalculationFactorDto;

	constructor( ) { }
}
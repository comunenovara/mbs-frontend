import { Component, Input, OnInit } from '@angular/core';
import { MbsAssetDTO } from '../../../class/asset-dto.class';

@Component({
	selector: 'mbs-asset-detail-box',
	templateUrl: './asset-detail-box.component.html',
	styleUrls: ['./asset-detail-box.component.scss']
})
export class MbsAssetDetailBoxComponent {

	@Input()
	asset: MbsAssetDTO;

	constructor( ) { }
}
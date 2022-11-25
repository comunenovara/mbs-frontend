import { Component, Input, OnInit } from '@angular/core';
import { PigesConfigDTO } from '../../../class/configDTO.class';

@Component({
    selector: 'piges-config-detail-box',
    templateUrl: './config-detail-box.component.html',
    styleUrls: ['./config-detail-box.component.scss']
})
export class PigesConfigDetailBoxComponent {

	@Input()
    config: PigesConfigDTO;

	constructor( ) { }
}
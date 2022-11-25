import { Component, Input, OnInit } from '@angular/core';
import { PigesFipDTO } from '../../../class/fipDTO.class';

@Component({
    selector: 'piges-fip-detail-box',
    templateUrl: './fip-detail-box.component.html',
    styleUrls: ['./fip-detail-box.component.scss']
})
export class PigesFipDetailBoxComponent {

	@Input()
    fip: PigesFipDTO;

	constructor( ) { }
}
import { Component, Input, OnInit } from '@angular/core';
import { PigesIdentityDTO } from '../../../class/identityDTO.class';

@Component({
    selector: 'piges-identity-detail-box',
    templateUrl: './identity-detail-box.component.html',
    styleUrls: ['./identity-detail-box.component.scss']
})
export class PigesIdentityDetailBoxComponent {

	@Input()
    identity: PigesIdentityDTO;

	constructor( ) { }
}
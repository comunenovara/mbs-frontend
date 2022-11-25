import { Component, Input, OnInit } from '@angular/core';
import { PigesAccountDTO } from '../../../class/accountDTO.class';

@Component({
    selector: 'piges-account-detail-box',
    templateUrl: './account-detail-box.component.html',
    styleUrls: ['./account-detail-box.component.scss']
})
export class PigesAccountDetailBoxComponent {

	@Input()
    account: PigesAccountDTO;

	constructor( ) { }
}
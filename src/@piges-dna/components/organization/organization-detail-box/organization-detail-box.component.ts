import { Component, Input, OnInit } from '@angular/core';
import { PigesOrganizationDTO } from '../../../class/organizationDTO.class';

@Component({
    selector: 'piges-organization-detail-box',
    templateUrl: './organization-detail-box.component.html',
    styleUrls: ['./organization-detail-box.component.scss']
})
export class PigesOrganizationDetailBoxComponent {

	@Input()
    organization: PigesOrganizationDTO;

	constructor( ) { }
}
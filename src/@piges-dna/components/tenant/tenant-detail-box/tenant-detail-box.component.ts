import { Component, Input, OnInit } from '@angular/core';
import { PigesTenantDTO } from '../../../class/tenantDTO.class';

@Component({
    selector: 'piges-tenant-detail-box',
    templateUrl: './tenant-detail-box.component.html',
    styleUrls: ['./tenant-detail-box.component.scss']
})
export class PigesTenantDetailBoxComponent {

	@Input()
    tenant: PigesTenantDTO;

	constructor( ) { }
}
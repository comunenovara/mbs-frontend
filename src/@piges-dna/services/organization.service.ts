import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PigesOrganizationDTO } from '../class/organizationDTO.class';

@Injectable()
export class PigesOrganizationResourceService {
    constructor(
        private http: HttpClient,

    ) { }

    getOrganizationUsingGET(id: number): Observable<PigesOrganizationDTO> {
        return this.http.get<PigesOrganizationDTO>("url");
    }

    getAllOrganizationsUsingGET(filters: any): Observable<PigesOrganizationDTO[]> {
        return this.http.get<PigesOrganizationDTO[]>("url");
    }
    
    countOrganizationsUsingGET(filters: any): Observable<number> {
        return this.http.get<number>("url");
    }
}
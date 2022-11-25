import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PigesTenantDTO } from '../class/tenantDTO.class';

@Injectable()
export class PigesTenantResourceService {
    constructor(
        private http: HttpClient,

    ) { }

    getTenantUsingGET(id: number): Observable<PigesTenantDTO> {
        return this.http.get<PigesTenantDTO>("url");
    }

    getAllTenantsUsingGET(filters: any): Observable<PigesTenantDTO[]> {
        return this.http.get<PigesTenantDTO[]>("url");
    }
    
    countTenantsUsingGET(filters: any): Observable<number> {
        return this.http.get<number>("url");
    }
}
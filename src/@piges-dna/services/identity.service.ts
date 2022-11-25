import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PigesIdentityDTO } from '../class/identityDTO.class';

@Injectable()
export class PigesIdentityResourceService {
    constructor(
        private http: HttpClient,

    ) { }

    getIdentityUsingGET(id: number): Observable<PigesIdentityDTO> {
        return this.http.get<PigesIdentityDTO>("url");
    }

    getAllIdentitiesUsingGET(filters: any): Observable<PigesIdentityDTO[]> {
        return this.http.get<PigesIdentityDTO[]>("url");
    }
    
    countIdentitiesUsingGET(filters: any): Observable<number> {
        return this.http.get<number>("url");
    }
}
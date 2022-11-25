import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PigesAccountDTO } from '../class/accountDTO.class';

@Injectable()
export class PigesAccountResourceService {
    constructor(
        private http: HttpClient,

    ) { }

    getAccountUsingGET(id: number): Observable<PigesAccountDTO> {
        return this.http.get<PigesAccountDTO>("url");
    }

    getAllAccountsUsingGET(filters: any): Observable<PigesAccountDTO[]> {
        return this.http.get<PigesAccountDTO[]>("url");
    }
    
    countAccountsUsingGET(filters: any): Observable<number> {
        return this.http.get<number>("url");
    }
}
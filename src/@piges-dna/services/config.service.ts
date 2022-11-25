import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PigesConfigDTO } from '../class/configDTO.class';

@Injectable()
export class PigesConfigResourceService {
    constructor(
        private http: HttpClient,

    ) { }

    getConfigUsingGET(id: number): Observable<PigesConfigDTO> {
        return this.http.get<PigesConfigDTO>("url");
    }

    getAllConfigsUsingGET(filters: any): Observable<PigesConfigDTO[]> {
        return this.http.get<PigesConfigDTO[]>("url");
    }
    
    countConfigsUsingGET(filters: any): Observable<number> {
        return this.http.get<number>("url");
    }
}
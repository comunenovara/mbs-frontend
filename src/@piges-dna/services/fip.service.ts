import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PigesFipDTO } from '../class/fipDTO.class';

@Injectable()
export class PigesFipResourceService {
    constructor(
        private http: HttpClient,

    ) { }

    getFipUsingGET(id: number): Observable<PigesFipDTO> {
        return this.http.get<PigesFipDTO>("url");
    }

    getAllFipsUsingGET(filters: any): Observable<PigesFipDTO[]> {
        return this.http.get<PigesFipDTO[]>("url");
    }
    
    countFipsUsingGET(filters: any): Observable<number> {
        return this.http.get<number>("url");
    }
}
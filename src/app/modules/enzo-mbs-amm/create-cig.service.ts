import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class CreateCigService {
	
	protected basePath = 'http://localhost:3002';
	//protected basePath = 'http://10.1.20.20:84';

	constructor(private http: HttpClient) { }

	createCigUsingGET(year: number, cig: string, description: string): Observable<any> {
		return this.http.get<any>(this.basePath + "/create-cig", {
			params: {
				year: year,
				cig: cig,
				description: description
			}
		});
	}
	
}
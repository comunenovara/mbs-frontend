import { StalEventerService, StalEvent } from "@stal/eventer";
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class EngeCommonService {
    constructor(
        public eventer: StalEventerService,

    ) {}
}
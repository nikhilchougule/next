import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import {ScipService } from '../_services/scip.service'
@Injectable(
    {providedIn: 'root'}
)
export class scipsResolver implements Resolve<any> {
    constructor(private scipsService: ScipService) {}
    resolve(){
        return this.scipsService.getScipData;
    }
}
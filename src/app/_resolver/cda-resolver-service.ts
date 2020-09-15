import { Resolve } from '@angular/router';
import { ICDA } from "../_models/cda.interface";
import { Injectable } from '@angular/core';
import {CdaService } from '../_services/cda.service'
@Injectable(
    {providedIn: 'root'}
)
export class cdaResolver implements Resolve<any> {
    constructor(private cdaService: CdaService) {}
    resolve(){
        return this.cdaService.getCriticalDigitalAssetsData();
    }
}
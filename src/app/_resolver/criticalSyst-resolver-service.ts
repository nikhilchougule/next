import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import {CriticalSystemService } from '../_services/critical-system.service'
@Injectable(
    {providedIn: 'root'}
)
export class csResolver implements Resolve<any> {
    constructor(private csService: CriticalSystemService) {}
    resolve(){
        return this.csService.getCriticalSystemData();
    }
}
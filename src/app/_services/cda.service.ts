import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { ICDA } from '../_models/cda.interface';
import { from } from 'rxjs';

export const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Credentials' : 'true',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
  })
};
@Injectable({
  providedIn: 'root'
})

export class CdaService {

  constructor(private http: HttpClient) {
  }

  getCriticalDigitalAssetsData() {
    return this.http.get(`${environment.apiUrl}/criticaldigitalassets`)
  }
  updateCriticalDigitalAssetsRecord(data) {
    return this.http.put(`${environment.apiUrl}/criticaldigitalassets/${data.CriticalDigitalAssetId}`, data)
  }
  deleteCriticalAssetsRecord(data) {

    // let result = from(fetch(
    //   `${environment.apiUrl}/criticaldigitalassets/${data.CriticalDigitalAssetId}`,      {
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     method: 'DELETE',
    //     mode: 'no-cors'
    //   }
    // )
    // );
    // console.log(result);
    // return result;
    return this.http.delete(`${environment.apiUrl}/criticaldigitalassets/${data.CriticalDigitalAssetId}`,HTTP_OPTIONS);
  }

}

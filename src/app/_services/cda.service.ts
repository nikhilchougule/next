import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { ICDA } from '../_models/cda.interface';
import { from, BehaviorSubject } from 'rxjs';

export interface PeriodicElement {
  Name: string,
  critical_System: string,
  Revision_status: number,
  Date_Installed: string,
  Cyber_Security:boolean,
  Revision_Number:number,
  Justification:string,
  Another_attribute1:string,
  Another_attribute2:string,
  large_text:string
}

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

  list: PeriodicElement[] = [
    { Name: 'CDA-1', critical_System: 'CS-1', Revision_status: 1, Date_Installed: '2018-04-18T00:00:00',Cyber_Security:true,Revision_Number:2,Justification:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',Another_attribute1:'Another_attribute11',Another_attribute2:'Another_attribute21',large_text:'Lorem Ipsum is simply dummy text of the printing and typesetting' },
    { Name: 'CDA-2', critical_System: 'CS-2', Revision_status: 2, Date_Installed: '2018-05-18T00:00:00',Cyber_Security:false,Revision_Number:3,Justification:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',Another_attribute1:'Another_attribute12',Another_attribute2:'Another_attribute22',large_text:'Lorem Ipsum is simply dummy text of the printing and typesetting' },
    { Name: 'CDA-3', critical_System: 'CS-3', Revision_status: 3, Date_Installed: '2018-06-18T00:00:00',Cyber_Security:true,Revision_Number:5,Justification:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',Another_attribute1:'Another_attribute13',Another_attribute2:'Another_attribute23',large_text:'Lorem Ipsum is simply dummy text of the printing and typesetting' },

  ];
 
  list$: BehaviorSubject<PeriodicElement[]> = new BehaviorSubject(this.list);
  getCriticalDigitalAssetsData() {
    return this.http.get(`${environment.apiUrl}/criticaldigitalassets`)
  }
  updateCriticalDigitalAssetsRecord(data) {
    return this.http.put(`${environment.apiUrl}/criticaldigitalassets/${data.CriticalDigitalAssetId}`, data)
  }
  deleteCriticalAssetsRecord(data) {
    return this.http.delete(`${environment.apiUrl}/criticaldigitalassets/${data.CriticalDigitalAssetId}`,HTTP_OPTIONS);
  }
  addCriticalDigitalAssetsRecord(data:ICDA) {
    return this.http.post(`${environment.apiUrl}/criticaldigitalassets`, data)
  }
  
  update(index, field, value) {
    this.list = this.list.map((e, i) => {
      if (index === i) {
        return {
          ...e,
          [field]: value
        }
      }
      return e;
    });
    this.list$.next(this.list);
  }

  getControl(index, fieldName) {
  }

}

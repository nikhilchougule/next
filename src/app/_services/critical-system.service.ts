import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { ICriticalSystem } from '../_models/criticalSyst.interface';

@Injectable({
  providedIn: 'root'
})
export class CriticalSystemService {

  constructor(private http:HttpClient) { }
  getCriticalSystemData(){
    return this.http.get(`${environment.apiUrl}/criticalsystems`)
  }
  updateCriticalSystemRecord(data){
    return this.http.put(`${environment.apiUrl}/criticalsystems/${data.CriticalSystemId}`,data)
  }
  deleteCriticalSystemRecord(data){
    return this.http.delete(`${environment.apiUrl}/criticalsystems/${data.CriticalSystemId}`);
  }
  addCriticalSystemRecord(data:ICriticalSystem){
    return this.http.post(`${environment.apiUrl}/criticalsystems`,data)
  }
  getGenerateTree(){
    return this.http.get(`${environment.apiUrl}/securitycontrols`)
  }
  getLocations(){
    return this.http.get(`${environment.apiUrl}/locations`);
  }
  getCategory(){
    return this.http.get(`${environment.apiUrl}/categories`)
  }
  getCsApprovalStatus(){
    return this.http.get(`${environment.apiUrl}/CSApprovalStatus`)
  }
  getCSIdentificationApprovalStatus(){
    return this.http.get(`${environment.apiUrl}/CSIdentificationApprovalStatus`)
  }
}






  
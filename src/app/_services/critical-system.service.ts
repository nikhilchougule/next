import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

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
}

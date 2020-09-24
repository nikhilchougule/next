import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { from } from 'rxjs';
const graphMeEndpoint = "https://graph.microsoft.com/v1.0/me";
@Injectable({
  providedIn: 'root'
})
export class ScipService {

  constructor(private http: HttpClient) { }
  getScipData() {
    return this.http.get(`${environment.apiUrl}/SCIPS`)
  }
  updateScipRecord(data) {
    return this.http.put(`${environment.apiUrl}/SCIPS/${data.ComplexityCategoryId}`, data)
  }
  deleteScipRecord(data) {
    return this.http.delete(`${environment.apiUrl}/SCIPS/${data.ComplexityCategoryId}`);
  }
  addScipRecord(data) {
    return this.http.post(`${environment.apiUrl}/SCIPS`, data)
  }
  getProfile() {
   return this.http.get(graphMeEndpoint)
  }
}

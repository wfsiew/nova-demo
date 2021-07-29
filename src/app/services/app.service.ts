import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getVesaliusPatientData(branchId: number, prn: string) {
    return this.http.get(`${this.baseUrl}/public/vesalius/patient-data/${branchId}/${prn}`);
  }
}

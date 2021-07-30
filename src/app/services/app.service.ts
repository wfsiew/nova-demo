import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  listDoctor(page: any, limit: any, sort: any, dir: any) {
    let prm: HttpParams = new HttpParams()
      .set('_page', page)
      .set('_limit', limit);
    if (sort !== '') {
      if (dir === '') {
        dir = 'asc';
      }

      // prm = prm.append('sort', `${sort}:${dir}`);
    }
    return this.http.get(`${this.baseUrl}/public/vesalius/getAllDoctorInformation/1`, { params: prm, observe: 'response' });
  }

  searchDoctor(page: any, limit: any, sort: any, dir: any, keyword: any) {
    let prm: HttpParams = new HttpParams()
      .set('_page', page)
      .set('_limit', limit);
    if (sort !== '') {
      if (dir === '') {
        dir = 'asc';
      }

      // prm = prm.append('sort', `${sort}:${dir}`);
    }
    return this.http.post(`${this.baseUrl}/public/vesalius/getAllDoctorInformation/1`, { keyword: keyword }, { params: prm, observe: 'response' });
  }

  getDoctorDetails(branchId: number, mcr: string) {
    return this.http.get(`${this.baseUrl}/public/vesalius/getDoctorInformationByMCR/${branchId}/${mcr}`);
  }

  getVesaliusPatientData(branchId: number, prn: string) {
    return this.http.get(`${this.baseUrl}/public/vesalius/patient-data/${branchId}/${prn}`);
  }

  getVesaliusNextAvailableSlot(branchId: number, prn: string, o: any) {
    return this.http.post(`${this.baseUrl}/public/vesalius/get-next-available-slots/${branchId}/${prn}`, o);
  }

  postVesaliusMakeAppointment(branchId: number, prn: string, o: any) {
    return this.http.post(`${this.baseUrl}/public/vesalius/make-appointment/${branchId}/${prn}`, o);
  }
}

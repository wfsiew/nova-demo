import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from 'src/app/services/doctor.service';
import { NovaDoctor, NovaDoctorClinicHours, NovaSpecialty } from 'src/app/shared/models';

@Component({
  selector: 'app-doctor-detail',
  templateUrl: './doctor-detail.component.html',
  styleUrls: ['./doctor-detail.component.scss']
})
export class DoctorDetailComponent implements OnInit {

  isLoading = false;
  mcr: any;
  data!: NovaDoctor;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private doctorService: DoctorService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.mcr = params.get('mcr');
      this.load();
    });
  }

  load() {
    this.isLoading = true;
    this.doctorService.getDoctorDetails(1, this.mcr).subscribe((res: any) => {
      if (res && res.length > 0) {
        this.data = res[0];
      }
    }, (error) => {

    }, () => {
      this.isLoading = false;
    });
  }

  getImage() {
    let s = 'assets/img/no-doctor.png';
    if (this.data && this.data.image) {
      return this.data.image;
    }

    return s;
  }

  getSpokenLanguage() {
    let s = '';
    const o = this.data;
    if (o.doctorSpokenLanguage && o.doctorSpokenLanguage.length > 0) {
      const ls = o.doctorSpokenLanguage.map(x => x.spokenLanguage);
      s = ls.join(', ');
    }

    return s;
  }

  getClinicHour(s: NovaDoctorClinicHours) {
    let r = `${s.dayStartTime} - ${s.dayEndTime}${s.byAppointmentOnly ? '*': ''}`;
    return r;
  }
}

import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AppService } from '../services/app.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { MessageService } from 'src/app/services/message.service';
import { NovaDoctor, NovaDoctorClinicHours, NovaSpecialty, Patient } from 'src/app/shared/models';
import { Helper } from '../shared/utils/helper';

@Component({
  selector: 'app-doctor-detail',
  templateUrl: './doctor-detail.component.html',
  styleUrls: ['./doctor-detail.component.scss']
})
export class DoctorDetailComponent implements OnInit, OnDestroy {

  isLoading = false;
  pState: any;
  mcr: any;
  data!: NovaDoctor;
  patient!: Patient;
  bsModalRef!: BsModalRef;
  subs: Subscription;

  nric = '00-000034';

  @ViewChild('modalNRIC') modalNRIC!: TemplateRef<any>;
  @ViewChild('modalNRICNotFound') modalNRICNotFound!: TemplateRef<any>;

  readonly uiState = 'doctor.doctor-detail';

  readonly isEmpty = Helper.isEmpty;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appService: AppService,
    private doctorService: DoctorService,
    private msService: MessageService,
    private toastr: ToastrService,
    private modalService: BsModalService
  ) {
    this.subs = this.msService.get().subscribe(res => {
      if (res.name === this.uiState) {
        const o = res.data;
        this.pState = o;
      }
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.mcr = params.get('mcr');
      this.load();
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
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

  openNRICModal() {
    this.bsModalRef = this.modalService.show(
      this.modalNRIC,
      Object.assign({}, { class: 'modal-lg' })
    );
  }

  onSubmitNRIC() {
    this.isLoading = true;
    this.appService.getVesaliusPatientData(1, this.nric).subscribe((res: any) => {
      this.isLoading = false;
      this.bsModalRef.hide();
      if (!res) {
        this.onNRICNotFoundModal();
      }

      else {
        this.patient = res;
        console.log(px)
        this.msService.send('appointment.make-appointment', {
          ...this.pState,
          patient: this.patient,
          doctor: this.data
        });
        this.router.navigate([`/main/${this.mcr}/appointment/new`]);
      }
    }, (error) => {
      this.isLoading = false;
      this.bsModalRef.hide();
      this.onNRICNotFoundModal();
    });
  }

  onNRICNotFoundModal() {
    this.bsModalRef = this.modalService.show(
      this.modalNRICNotFound,
      Object.assign({}, { class: 'modal-lg' })
    );
  }

  onHomeNRIC() {
    this.bsModalRef.hide();
  }

  get image() {
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

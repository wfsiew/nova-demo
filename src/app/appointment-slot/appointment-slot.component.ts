import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AppService } from '../services/app.service';
import { MessageService } from 'src/app/services/message.service';
import { GeneralForm } from '../shared/classes/general.form';
import { AppConstant } from '../shared/constants/app.constant';
import { Document, NovaDoctor, NovaDoctorSpecialty, Patient, Slot } from '../shared/models';
import { Helper } from '../shared/utils/helper';
const moment = require('moment');

@Component({
  selector: 'app-appointment-slot',
  templateUrl: './appointment-slot.component.html',
  styleUrls: ['./appointment-slot.component.scss']
})
export class AppointmentSlotComponent implements OnInit, OnDestroy {

  isLoading = false;
  submitData: any;
  pState: any;
  data: any;
  patient!: Patient;
  doctor!: NovaDoctor;
  slots: Slot[] = [];
  slotNumber: string = '';
  bsModalRef!: BsModalRef;
  subs: Subscription;

  @ViewChild('modalConfirmAppointment') modalConfirmAppointment!: TemplateRef<any>;
  @ViewChild('modalAppointmentOK') modalAppointmentOK!: TemplateRef<any>;

  readonly uiState = 'appointment.appointment-slot';

  readonly isEmpty = Helper.isEmpty;

  constructor(
    private router: Router,
    private appService: AppService,
    private msService: MessageService,
    private toastr: ToastrService,
    private modalService: BsModalService
  ) {
    this.subs = this.msService.get().subscribe(res => {
      if (res.name === this.uiState) {
        const o = res.data;
        this.data = o;
        this.pState = o;
        this.slots = o.slots;
        this.submitData = o.submitData;
        this.doctor = this.pState.doctor;
        this.patient = this.pState.patient;
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  onBack() {
    this.msService.send('appointment.make-appointment', this.pState);
    this.router.navigate(['/main/appointment/new']);
  }

  onNext() {
    this.bsModalRef = this.modalService.show(
      this.modalConfirmAppointment,
      Object.assign({}, { class: 'modal-lg' })
    );
  }

  onContinue() {
    const o: any = {
      slotNumber: this.slotNumber,
      caseType: this.submitData.caseType
    }

    this.isLoading = true;
    this.appService.postVesaliusMakeAppointment(1, this.patientPRN, o).subscribe((res: any) => {
      this.isLoading = false;
      this.bsModalRef.hide();
      this.bsModalRef = this.modalService.show(
        this.modalAppointmentOK,
        Object.assign({}, { class: 'modal-lg' })
      );
    }, (error) => {
      this.isLoading = false;
      this.toastr.error('Unable to create new appointment at the moment. Please check your internet connection or try again later.');
    });
  }

  onHome() {
    this.bsModalRef.hide();
    console.log(this.pState)
    this.msService.send('doctor.doctor-listing', this.pState);
    this.router.navigate(['/main/home']);
  }

  get doctorImage() {
    let s = 'assets/img/no-doctor.png';
    const o = this.doctor;
    if (o && o.image) {
      return o.image;
    }

    return s;
  }

  get doctorName() {
    let s = '';
    if (!this.doctor) return s;
    s = this.doctor.name;
    return s;
  }

  getDate(s: string): string {
    return s.replace('-', ' ').replace('-', ' ');
  }

  getTime(s: string): string {
    return moment(s, "HH:mm").format("h:mm A");
  }

  get patientName() {
    let s = '';
    if (!this.patient) return s;
    const name = this.patient.name;
    s = [name?.title, name?.firstName, name?.middleName, name?.lastName].join(' ').trim();
    return s;
  }

  get patientNRIC() {
    let s = '';
    if (!this.patient) return s;
    const id = this.patient.documents?.find((x: Document) => x.code === 'ID');
    if (id) {
      s = id.value;
    }

    return s;
  }

  get patientPRN() {
    let s = '';
    if (!this.patient) return s;
    s = this.patient.prn;
    return s;
  }

  get appointmentDate() {
    let s = '';
    if (this.slotNumber === '') return s;
    let slot = this.slots.find(x => x.slotNumber === this.slotNumber);
    if (slot) {
      s = `${this.getDate(slot.date)}, ${this.getTime(slot.startTime)}`;
    }

    return s;
  }
}

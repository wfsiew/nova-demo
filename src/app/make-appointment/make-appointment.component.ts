import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { Document, NovaDoctor, NovaDoctorSpecialty, Patient } from '../shared/models';
import { Helper } from '../shared/utils/helper';

@Component({
  selector: 'app-make-appointment',
  templateUrl: './make-appointment.component.html',
  styleUrls: ['./make-appointment.component.scss']
})
export class MakeAppointmentComponent extends GeneralForm implements OnInit, OnDestroy {

  pState: any;
  data: any;
  specialty!: NovaDoctorSpecialty | undefined;
  subs: Subscription;

  readonly uiState = 'appointment.make-appointment';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private appService: AppService,
    private msService: MessageService,
    private toastr: ToastrService,
    private modalService: BsModalService,
    private loc: Location
  ) {
    super();
    this.createForm();
    this.subs = this.msService.get().subscribe(res => {
      if (res.name === this.uiState) {
        const o = res.data;
        this.data = {
          patient: o.patient,
          doctor: o.doctor
        }
        this.pState = o;
        console.log(o)
      }
    });
  }

  ngOnInit() {
    this.load();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  createForm() {
    this.mform = this.fb.group({
      doctorName: [''],
      doctorMcr: [''],
      specialtyCode: [''],
      specialtyName: [''],
      caseType: ['NC', [Validators.required]],
      date: [''],
      time: [''],
      patientName: [''],
      patientNRIC: [''],
      patientDOB: [''],
      prn: ['']
    });
  }

  load() {
    const a: Patient = this.data.patient;
    const b: NovaDoctor = this.data.doctor;
    const name = a.name;
    const sname = [name?.title, name?.firstName, name?.middleName, name?.lastName].join(' ').trim();
    const id = a.documents?.find((x: Document) => x.code === 'ID');
    let nric = '';
    if (id) {
      nric = id.value;
    }

    let specialtyCode = '';
    let specialtyName = '';
    if (!Helper.isEmpty(b.doctorSpecialty)) {
      this.specialty = b.doctorSpecialty.find((x: NovaDoctorSpecialty) => x.primarySpecialty === true);
      if (this.specialty) {
        specialtyCode = this.specialty.specialty.specialtyCode;
        specialtyName = this.specialty.specialty.specialtyDesc;
      }
    }

    this.mform.patchValue({
      doctorName: b.name,
      doctorMcr: b.mcr,
      specialtyCode: specialtyCode,
      specialtyName: specialtyName,
      patientName: sname,
      patientNRIC: nric,
      patientDOB: a.dob,
      prn: a.prn
    });
  }

  onBack() {
    this.msService.send('doctor.doctor-listing', this.pState);
    this.router.navigate(['/main/home']);
  }

  onSubmit() {

  }
}

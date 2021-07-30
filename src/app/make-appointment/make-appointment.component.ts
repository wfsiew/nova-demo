import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
const moment = require('moment');

@Component({
  selector: 'app-make-appointment',
  templateUrl: './make-appointment.component.html',
  styleUrls: ['./make-appointment.component.scss']
})
export class MakeAppointmentComponent extends GeneralForm implements OnInit, OnDestroy {

  isLoading = false;
  pState: any;
  mcr: any;
  data: any;
  specialty!: NovaDoctorSpecialty | undefined;
  selectedDate!: Date;
  selectedTime!: Date;
  minDate!: Date;
  fromDetail = false;
  subs: Subscription;

  readonly uiState = 'appointment.make-appointment';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private appService: AppService,
    private msService: MessageService,
    private toastr: ToastrService,
    private modalService: BsModalService,
    private loc: Location
  ) {
    super();
    this.setMinDate();
    this.createForm();
    this.subs = this.msService.get().subscribe(res => {
      if (res.name === this.uiState) {
        const o = res.data;
        this.data = o;
        this.pState = o;
      }
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.mcr = params.get('mcr');
      if (this.mcr) {
        this.fromDetail = true;
      }
    });
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
      selectedDate: [''],
      patientName: [''],
      patientNRIC: [''],
      patientDOB: [''],
      prn: ['']
    });
  }

  load() {
    if (!this.data) return;
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

  onDateChange(val: Date) {
    this.selectedDate = val;
  }

  onBack() {
    if (!this.fromDetail) {
      this.msService.send('doctor.doctor-listing', this.pState);
      this.router.navigate([`/main/home`]);
    }
    
    else {
      this.msService.send('doctor.doctor-detail', this.pState);
      this.router.navigate([`/main/doctor/${this.mcr}`]);
    }
  }

  onSubmit() {
    if (this.mform.invalid) {
      this.mform.markAllAsTouched();
      return;
    }

    let dt = moment(this.selectedDate).format('DD-MMM-YYYY');
    let dx = this.selectedTime ? moment(this.selectedTime).format('HH:mm') : '00:01';

    const f = this.mform.value;
    const o: any = {
      caseType: f.caseType,
      mcr: f.doctorMcr,
      specialtyCode: f.specialtyCode,
      startDate: dt,
      startTime: dx
    }

    this.isLoading = true;
    this.appService.getVesaliusNextAvailableSlot(1, f.prn, o).subscribe((res: any) => {
      let slots = res;
      this.isLoading = false;
      if (Helper.isEmpty(slots)) {
        this.toastr.error('There is no available slot on your request date / time.');
      }

      else {
        this.msService.send('appointment.appointment-slot', {
          ...this.pState,
          slots: slots,
          submitData: o
        });
        this.router.navigate([`main/appointment/slots`])
      }
    }, (error) => {
      this.isLoading = false;
      this.toastr.error('Sorry, no appointment slots available based on the selection criteria. Please reset and search again.');
    });
  }

  setMinDate() {
    let today = new Date();
    let now = new Date();
    now.setDate(today.getDate() + 3);
    if (now.getDay() === 5 || now.getDay() === 6) {
      now.setDate(today.getDate() + 4);
    }

    this.minDate = now;
    this.selectedDate = now;
    let tx = new Date();
    tx.setHours(0);
    tx.setMinutes(0);
    this.selectedTime = tx;
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
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

  submitData: any;
  pState: any;
  data: any;
  slots: Slot[] = [];
  slotNumber!: string;
  subs: Subscription;

  readonly uiState = 'appointment.appointment-slot';

  constructor(
    private router: Router,
    private appService: AppService,
    private msService: MessageService,
    private toastr: ToastrService
  ) {
    this.subs = this.msService.get().subscribe(res => {
      if (res.name === this.uiState) {
        const o = res.data;
        this.data = o;
        this.slots = o.slots;
        this.pState = o.pState;
        this.submitData = o.submitData;
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}

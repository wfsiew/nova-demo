import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AppService } from '../services/app.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { MessageService } from 'src/app/services/message.service';
import { AppConstant } from '../shared/constants/app.constant';
import { NovaDoctor, Patient } from '../shared/models';
import { Helper } from '../shared/utils/helper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  isLoading = false;
  list: NovaDoctor[] = [];
  doctor!: NovaDoctor;
  patient!: Patient;
  totalCount = 0;
  totalPage = 0;
  pageSize = AppConstant.PAGE_SIZE;
  page = 1;
  search = '';
  sort = 'doctor_id';
  sortDir = 'asc';
  sx = 0;
  sy = 0;
  bsModalRef!: BsModalRef;
  subs: Subscription;

  nric = '00-000034';

  @ViewChild('modalNRIC') modalNRIC!: TemplateRef<any>;
  @ViewChild('modalNRICNotFound') modalNRICNotFound!: TemplateRef<any>;

  readonly uiState = 'doctor.doctor-listing';

  readonly isEmpty = Helper.isEmpty;
  readonly PAGE_SIZE = AppConstant.PAGE_SIZE;
  readonly MAX_PAGE_NUMBERS = AppConstant.MAX_PAGE_NUMBERS;

  constructor(
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
        this.page = o.page;
        this.sort = o.sort;
        this.sortDir = o.dir;
        this.search = o.search;
        this.sx = o.sx;
        this.sy = o.sy;
      }
    });
  }

  ngOnInit() {
    this.load();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  load() {
    if (this.search && this.search !== '') {
      this.onSearch();
      return;
    }
    
    this.isLoading = true;
    this.doctorService.list(this.page, AppConstant.PAGE_SIZE, this.sort, this.sortDir).subscribe((res: any) => {
      this.list = res.body;
      const headers = res.headers;
      this.totalCount = Number(headers.get(AppConstant.HTTP_HEADER.X_TOTAL_COUNT));
      this.totalPage = Number(headers.get(AppConstant.HTTP_HEADER.X_TOTAL_PAGE));
      this.isLoading = false;
      setTimeout(() => {
        window.scrollTo(this.sx, this.sy);
      }, 200);
    }, (error) => {
      
    }, () => {
      this.isLoading = false;
    });
  }

  onSearch() {
    this.page = 1;
    this.isLoading = true;
    this.doctorService.search(this.page, AppConstant.PAGE_SIZE, this.sort, this.sortDir, this.search).subscribe((res: any) => {
      this.list = res.body;
      const headers = res.headers;
      this.totalCount = Number(headers.get(AppConstant.HTTP_HEADER.X_TOTAL_COUNT));
      this.totalPage = Number(headers.get(AppConstant.HTTP_HEADER.X_TOTAL_PAGE));
      this.isLoading = false;
      setTimeout(() => {
        window.scrollTo(this.sx, this.sy);
      }, 200);
    }, (error) => {

    }, () => {
      this.isLoading = false;
    });
  }

  onSearchKeypress(event: any) {
    this.onSearch();
  }

  getImage(o: NovaDoctor) {
    let s = 'assets/img/no-doctor.png';
    if (!o.image) {
      return s;
    }

    return o.image;
  }

  pageChanged(event: any) {
    this.page = event.page;
    this.load();
  }

  goto(s: string) {
    this.msService.send('doctor.doctor-detail', {
      page: this.page,
      sort: this.sort,
      dir: this.sortDir,
      search: this.search,
      sx: window.scrollX,
      sy: window.scrollY
    });
    this.router.navigate([`/main/doctor/${s}`]);
  }

  openNRICModal(o: NovaDoctor) {
    this.doctor = o;
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
        this.msService.send('appointment.make-appointment', {
          page: this.page,
          sort: this.sort,
          dir: this.sortDir,
          search: this.search,
          sx: window.scrollX,
          sy: window.scrollY,
          patient: this.patient,
          doctor: this.doctor
        });
        this.router.navigate([`/main/appointment/new`]);
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
}

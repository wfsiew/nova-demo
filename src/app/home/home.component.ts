import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { DoctorService } from 'src/app/services/doctor.service';
import { MessageService } from 'src/app/services/message.service';
import { AppConstant } from '../shared/constants/app.constant';
import { NovaDoctor } from '../shared/models';
import { Helper } from '../shared/utils/helper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isLoading = false;
  list: NovaDoctor[] = [];
  totalCount = 0;
  totalPage = 0;
  pageSize = AppConstant.PAGE_SIZE;
  page = 1;
  search = '';
  sort = 'doctor_id';
  sortDir = 'asc';
  sx = 0;
  sy = 0;
  subs: Subscription;

  readonly uiState = 'doctor.doctor-listing';

  readonly isEmpty = Helper.isEmpty;
  readonly PAGE_SIZE = AppConstant.PAGE_SIZE;
  readonly MAX_PAGE_NUMBERS = AppConstant.MAX_PAGE_NUMBERS;

  constructor(
    private router: Router,
    private doctorService: DoctorService,
    private msService: MessageService,
    private toastr: ToastrService,
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

  load() {
    if (this.search !== '') {
      this.onSearch(this.search);
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

  onSearch(s: string) {
    this.search = s;
    this.page = 1;
    this.isLoading = true;
    this.doctorService.search(this.page, AppConstant.PAGE_SIZE, this.sort, this.sortDir, s).subscribe((res: any) => {
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
}

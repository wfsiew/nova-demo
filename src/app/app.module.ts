import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgxUiLoaderModule, NgxUiLoaderHttpModule, POSITION } from 'ngx-ui-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { HomeComponent } from './home/home.component';
import { DoctorDetailComponent } from './doctor-detail/doctor-detail.component';

import { MessageService } from './services/message.service';
import { AppService } from './services/app.service';
import { HttpTimeoutInterceptor } from './shared/interceptors/timeout.interceptor';
import { ErrorInterceptor } from './shared/interceptors/error.interceptor';
import { MakeAppointmentComponent } from './make-appointment/make-appointment.component';
import { AppointmentSlotComponent } from './appointment-slot/appointment-slot.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    IndexComponent,
    DoctorDetailComponent,
    MakeAppointmentComponent,
    AppointmentSlotComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    PaginationModule.forRoot(),
    NgxUiLoaderModule.forRoot({
      bgsPosition: POSITION.centerCenter,
      bgsColor: '#1B548A',
      bgsType: 'square-jelly-box',
      // fgsColor: '#1B548A',
      fgsType: 'square-jelly-box'
    }),
    NgxUiLoaderHttpModule.forRoot({
      showForeground: false,
      exclude: []
    }),
  ],
  providers: [
    MessageService,
    AppService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTimeoutInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

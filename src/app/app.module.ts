import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgxUiLoaderModule, NgxUiLoaderHttpModule, POSITION } from 'ngx-ui-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { HomeComponent } from './home/home.component';

import { MessageService } from './services/message.service';
import { DoctorService } from './services/doctor.service';
import { HttpTimeoutInterceptor } from './shared/interceptors/timeout.interceptor';
import { ErrorInterceptor } from './shared/interceptors/error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    IndexComponent
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
    PaginationModule.forRoot(),
    NgxUiLoaderModule.forRoot({
      bgsPosition: POSITION.centerCenter,
      // bgsColor: '#dc143c',
      bgsType: 'square-jelly-box',
      // fgsColor: '#dc143c',
      fgsType: 'square-jelly-box'
    }),
    NgxUiLoaderHttpModule.forRoot({
      showForeground: false,
      exclude: []
    }),
  ],
  providers: [
    MessageService,
    DoctorService,
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

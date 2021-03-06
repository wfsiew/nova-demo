import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { IndexComponent } from './index/index.component';
import { DoctorDetailComponent } from './doctor-detail/doctor-detail.component';
import { MakeAppointmentComponent } from './make-appointment/make-appointment.component';
import { AppointmentSlotComponent } from './appointment-slot/appointment-slot.component';

const routes: Routes = [
  {
    path: 'main',
    component: IndexComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'doctor/:mcr',
        component: DoctorDetailComponent
      },
      {
        path: 'appointment/new',
        component: MakeAppointmentComponent
      },
      {
        path: ':mcr/appointment/new',
        component: MakeAppointmentComponent
      },
      {
        path: 'appointment/slots',
        component: AppointmentSlotComponent
      }
    ]
  },
  { path: '**', redirectTo: '/main/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top',
    useHash: true,
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

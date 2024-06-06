import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { VehiclelistComponent } from './components/vehiclelist/vehiclelist.component';
import { DriverlistComponent } from './components/driverlist/driverlist.component';
import { RatelistComponent } from './components/ratelist/ratelist.component';
import { BuseslistComponent } from './components/buseslist/buseslist.component';
import { BusesonComponent } from './components/buseson/buseson.component';
import { TicketlistComponent } from './components/ticketlist/ticketlist.component';
import { BookingComponent } from './components/booking/booking.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './components/login/login.component';
import { ChartComponent } from './components/chart/chart.component';
import { TestComponent } from './test/test.component';
import { OrderComponent } from './components/order/order.component';


const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      {
        path: '', component: HomeComponent
      },
      {
        path: 'vehiclelist', component: VehiclelistComponent
      },
      {
        path: 'driverlist', component: DriverlistComponent
      },
      {
        path: 'ratelist', component: RatelistComponent
      },
      {
        path: 'buseslist', component: BuseslistComponent
      },
      {
        path: 'busesmain', component: BusesonComponent
      },
      {
        path: 'ticket', component: TicketlistComponent
      },
      {
        path: 'booking', component: BookingComponent
      },
      {
        path:'chart',component:ChartComponent
      },
      {
        path:'order',component:OrderComponent
      }
    ]
  },
  {
    path:'login',component:LoginComponent
  },
  {
    path:'test',component:TestComponent
  }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LeftComponent } from './components/left/left.component';
import { VehiclelistComponent } from './components/vehiclelist/vehiclelist.component';
import { HttpClientModule } from '@angular/common/http';
import { DriverlistComponent } from './components/driverlist/driverlist.component';
import { BuseslistComponent } from './components/buseslist/buseslist.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { RatelistComponent } from './components/ratelist/ratelist.component';
import { DriverformComponent } from './components/driverform/driverform.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button'; //import {MatButton}
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VehicleformComponent } from './components/vehicleform/vehicleform.component';
import { BusesformComponent } from './components/busesform/busesform.component';
import { BusesonComponent } from './components/buseson/buseson.component';
import { TicketlistComponent } from './components/ticketlist/ticketlist.component';
import { TicketformComponent } from './components/ticketform/ticketform.component';
import { BookingComponent } from './components/booking/booking.component';
import { CommonModule } from '@angular/common';
import { MapComponent } from './components/map/map.component';
import { InformationticketComponent } from './components/informationticket/informationticket.component';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ChartComponent } from './components/chart/chart.component';
import { ChartModule } from 'angular-highcharts';
import { TestComponent } from './test/test.component';
import { OrderComponent } from './components/order/order.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    LeftComponent,
    VehiclelistComponent,
    DriverlistComponent,
    BuseslistComponent,
    RatelistComponent,
    DriverformComponent,
    VehicleformComponent,
    BusesformComponent,
    BusesonComponent,
    TicketlistComponent,
    BookingComponent,
    TicketformComponent,
    MapComponent,
    InformationticketComponent,
    LoginComponent,
    LayoutComponent,
    ChartComponent,
    TestComponent,
    OrderComponent,
    
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgSelectModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    CommonModule,
    ChartModule,
    ToastrModule.forRoot(),
   
    
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }

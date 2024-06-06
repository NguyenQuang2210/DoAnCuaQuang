import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { RatingComponent } from './components/rating/rating.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { ListComponent } from './components/list/list.component';
import { BookingComponent } from './components/booking/booking.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InformationclientComponent } from './components/informationclient/informationclient.component';
import { CancelbillComponent } from './components/cancelbill/cancelbill.component';
import {MatDialogModule } from '@angular/material/dialog';
import { LoadingComponent } from './components/loading/loading.component';
import { DenybillComponent } from './components/denybill/denybill.component';
import { PaymentpageComponent } from './components/paymentpage/paymentpage.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    LoginComponent,
    LayoutComponent,
    RatingComponent,
    AboutusComponent,
    ListComponent,
    BookingComponent,
    InformationclientComponent,
    CancelbillComponent,
    LoadingComponent,
    DenybillComponent,
    PaymentpageComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

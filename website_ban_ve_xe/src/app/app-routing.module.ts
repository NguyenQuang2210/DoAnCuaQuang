import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

import { LayoutComponent } from './components/layout/layout.component';
import { RatingComponent } from './components/rating/rating.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { ListComponent } from './components/list/list.component';
import { InformationclientComponent } from './components/informationclient/informationclient.component';
import { PaymentpageComponent } from './components/paymentpage/paymentpage.component';
import { LoadingComponent } from './components/loading/loading.component';
import { DenybillComponent } from './components/denybill/denybill.component';

const routes: Routes = [
  {path:'',component:LayoutComponent,children:[
    {
      path:'',component:HomeComponent
    },
    {
      path:'rating',component:RatingComponent,
    },
    {
      path:'gioi-thieu',component:AboutusComponent,
    },
    {
      path:'list',component:ListComponent,
    },
    {
      path:'information',component:InformationclientComponent,
    },
   
   
  ]},
  {
    path:'bill',component:PaymentpageComponent
  },
  {
    path:'loading',component:LoadingComponent
  },
  {
    path:'denybill',component:DenybillComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

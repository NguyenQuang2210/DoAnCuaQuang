import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Ticket } from '../../models/ticket';
import { TicketserviceService } from '../../services/ticketservice.service';
import { NavigationExtras, Router } from '@angular/router';
import { state } from '@angular/animations';
import { DenybillComponent } from '../denybill/denybill.component';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  ticketIds: number[] = [];
  orderList: Array<Ticket> = [];
  ckeck: number = 0;
  d: number = 0;
  list:any = []
  intervalId: any;
  isOrderListInitialEmpty: boolean = true;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ticketService: TicketserviceService, private router: Router,public dialogRef: MatDialogRef<LoadingComponent>,private dialog: MatDialog) { }

  ngOnInit(): void {
    this.ticketIds = this.data.ticketIds;
    console.log(this.ticketIds);
    this.intervalId = setInterval(()=>{
      console.log(this.ticketIds.length);
      console.log(this.orderList.length);
      this.getTicketByIds()
      this.check()
      this.completePayment()
    },2000)
  }


  getTicketByIds(){
    this.ticketService.getTicketByListId(this.ticketIds).subscribe(res=>{
      if(res){
        this.orderList = res
      }
    })
  }

  check(): void { 

    if(!this.orderList.length && this.isOrderListInitialEmpty){
      console.log("if1");
      this.isOrderListInitialEmpty = false
      return 
    }
    else if(this.ticketIds.length > this.orderList.length && !this.isOrderListInitialEmpty){
      console.log("if2");
      
      this.ckeck = 2
      return
    }
    for (let item of this.orderList) {
      if (item.status !== 3) {
        this.ckeck = 1
        return
      }
    }
    this.ckeck = 3
  }

  completePayment(): void {
    if (this.ckeck == 3) {
      this.dialogRef.close()         
      this.router.navigate(['/information'] ).then();
      clearInterval(this.intervalId)
    } 
    else if(this.ckeck == 2){
      this.dialogRef.close()
      this.openDialog()
      clearInterval(this.intervalId)
    }
    else if(this.ckeck == 1) {
      
      console.log("Đang chờ");
    }
  }
  openDialog(){
    this.dialog.open(DenybillComponent,{
      width: '600px',
      height: '200px',
      disableClose: true
  
    });
  }
}

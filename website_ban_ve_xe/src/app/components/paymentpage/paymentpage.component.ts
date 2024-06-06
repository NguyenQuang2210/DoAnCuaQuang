import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CancelbillComponent } from '../cancelbill/cancelbill.component';

import { Router } from '@angular/router';
import { TicketserviceService } from '../../services/ticketservice.service';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-paymentpage',
  templateUrl: './paymentpage.component.html',
  styleUrl: './paymentpage.component.scss'
})
export class PaymentpageComponent implements OnInit {
  countdownTime: number = 900; // 15 minutes
  totalprice:any
  data: any;
  name:any;
  phone_number:any
  note:any
  pick_up_loc:any
  drop_down_loc:any
  list_seat_detail:any
  loader:boolean = true
  issumit:boolean = false
  constructor(private dialog: MatDialog,private router: Router,private ticketService:TicketserviceService){
    const statedata:any = this.router.getCurrentNavigation()?.extras.state
    if (statedata) {
      this.data = statedata.data;
      this.name = this.data.name;
      this.note = this.data.note;
      this.phone_number = this.data.phoneNumber;
      this.drop_down_loc = this.data.dropDownLoc;
      this.pick_up_loc = this.data.pickUpLoc;
      this.list_seat_detail = this.data.listSeatDetail;
      this.totalprice = this.data.totalPrice;
    }
    
    
    console.log(this.totalprice)
    
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.loader = false;
    }, 3000);
  
    const intervalId = setInterval(() => {
      if (!this.loader) {
        this.countdown();
        clearInterval(intervalId); // Gọi clearInterval với ID của interval
      }
    }, 3000);
  }

  countdown() {
    const countdownElement = document.getElementById('countdown');

    let timeLeft = this.countdownTime;

    const countdownInterval = setInterval(() => {
      const minutes = Math.floor(timeLeft / 60);
      let seconds = timeLeft % 60;

      if (seconds < 10) {
        seconds = 0 + seconds;
      }

      countdownElement.innerHTML = `${minutes}:${seconds}`;

      timeLeft--;

      if (timeLeft < 0) {
        clearInterval(countdownInterval);
        countdownElement.innerHTML = "Hết thời gian";
      }
    }, 1000);
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value).replace('₫', '');
  }
  
  button_access(){
    if(this.issumit){
     return 
    }
    this.issumit = true
    const convertPhoneNumber = (phone: string): string => {
      if (phone.startsWith('0')) {
          return '+84' + phone.substring(1);
      }
      return phone;
  };
    let ticketIds:Array<number> = new Array<number>();
    for (let i = 0; i < this.list_seat_detail.length; i++) {
      const ticketData = {
        name: this.name,
        phone_number: convertPhoneNumber(this.phone_number),
        note: this.note,
        pick_up_loc: this.pick_up_loc,
        drop_down_loc: this.drop_down_loc,
        id_seatdetail: this.list_seat_detail[i].id,
        
        // Add other necessary information from listselected to ticketData
      };
      this.ticketService.createclientticket(ticketData).subscribe(
        (res:any) => {
          ticketIds.push(res.id)
          // Show success message for each ticket
          this.router.navigate(['/information'] ).then();
              
        },
        (error) => {
          // Handle error here if needed
          console.error('Error saving ticket:', error);
          // Show error message if needed
          this.issumit = false 
        }
      );
    }
  }

  OpenDialogCancel(){
    this.dialog.open(CancelbillComponent,{
      width: '400px',
      height: '200px',
  
    });
  }
}
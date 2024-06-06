import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../service/notification.service';
import { Notifiation } from '../../models/notification';
import { format } from 'date-fns';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  NotificationList: Array<Notifiation> = new Array<Notifiation>;
  ngOnInit(): void {
    setInterval(() => {
      this.loadData();
    }, 3000); // 3 seconds
    throw new Error('Method not implemented.');
  }
  constructor(private notiService: NotificationService) {
    this.loadData();
  }

  loadData(){
    this.notiService.getNotificationList().subscribe(res => {
      this.NotificationList=[];    
      res.map(item=>{
        let r = new Notifiation();
        r.setRate(item);
        r.message = `Khách hàng có số điện thoại ${this.convertPhoneNumberBack(r.phoneNumber)} vừa đặt chuyến.`;
        r.message += this.messageNotification(this.dateTimeToString(r.timeStart));
        r.message += " "
        r.message += this.messageNotification(this.getTourname(r.idTour));
        console.log(r.message);
        
        this.NotificationList.push(r);
      })
      // this.rates = res;
    })
  }

  messageNotification(str:string){
    let m = "";
    m = m + str;
    return m
  }

  getTourname(id:number){
    switch (id){
      case 1 : return "Thanh Hóa - Lào Cai";
      case 2 : return "Thanh Hóa - Sa Pa";
      case 3: return "Lào Cai - Thanh Hóa";
      case 4: return "Sa Pa - Thanh Hóa";
      default : return "Không xác định";
    }   
  }

  dateTimeToString(dateTime: Date): string {
    return format(dateTime, "HH:mm dd/MM/yyyy");
  }
  
  convertPhoneNumberBack(phone: string): string {
    if (phone.startsWith('+84')) {
      return '0' + phone.substring(3);
    }
    return phone;
  }


}

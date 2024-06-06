import { Component, OnInit } from '@angular/core';
import { TicketserviceService } from '../../service/ticketservice.service';
import { Ticket } from '../../models/ticket';
import { forkJoin } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { tick } from '@angular/core/testing';
import { Order } from '../../models/order';
import { Tick } from 'highcharts';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit {
  orderList: Array<Order> = new Array<Order>;
  toastr: any;
  message: string = '';
  constructor(private tickerservice:TicketserviceService,private buidr: FormBuilder,private toart:ToastrService){}
  ngOnInit(): void {
    this.loadData()
  }

  loadData() {
    this.tickerservice.getOrderList().subscribe(res => {
      this.orderList = res;
      console.log(this.orderList);
    });
  }
  
  denyOrder(id: number): void {
    this.tickerservice.getOrderbyid(id).subscribe(
      (ticket) => {
        if (ticket) {
          const date = new Date(ticket.time_start);
          const message = `Nha Xe Quang Dung: vé ${this.getNameSeat(ticket.id_seat)} chuyến ${this.getTourname(Number(ticket.id_tour))} vào lúc ${this.getStartTime(date)} đã bị hủy`;
          this.tickerservice.denyOrder(id, message).subscribe(
            (response) => {            
              this.loadData();  // Tải lại dữ liệu sau khi xác nhận đơn hàng
            },
            (error) => {
              console.error('Lỗi khi xác nhận đơn hàng', error);
              // Xử lý lỗi nếu cần
            }
          );
        } else {
          console.error('Vé không tìm thấy');
        }
      },
      (error) => {
        console.error('Lỗi khi tải vé', error);
        // Xử lý lỗi nếu cần
      }
    );
  }

  accessOrder(id: number): void {
    this.tickerservice.getOrderbyid(id).subscribe(
      (ticket) => {
        if (ticket) {
          const date = new Date(ticket.time_start);
          const message = `Nha Xe Quang Dung: vé ${this.getNameSeat(ticket.id_seat)} chuyến ${this.getTourname(Number(ticket.id_tour))} vào lúc ${this.getStartTime(date)} đã được xác nhận`;
          this.tickerservice.successOrder(id, message).subscribe(
            (response) => {
             
              this.loadData();  // Tải lại dữ liệu sau khi xác nhận đơn hàng
            },
            (error) => {
              console.error('Lỗi khi xác nhận đơn hàng', error);
              // Xử lý lỗi nếu cần
            }
          );
        } else {
          console.error('Vé không tìm thấy');
        }
      },
      (error) => {
        console.error('Lỗi khi tải vé', error);
        // Xử lý lỗi nếu cần
      }
    );
  }
  convertPhoneNumberBack(phone: string): string {
    if (phone.startsWith('+84')) {
      return '0' + phone.substring(3);
    }
    return phone;
  }
 
  getStatus(id:number){
    switch (id){
      case 1:return "Đang chờ xác nhận"
      case 2:return "Chưa thanh toán"
      case 3:return "Đã thanh toán"
      case 4:return "Hủy bỏ"
      default:
        return "Không xác định"
    }
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
  getNameSeat(id:number){
    switch (id){
      case 1: return "A1"
      case 2: return "A2"
      case 3: return "A3"
      case 4: return "A4"
      case 5: return "A5"
      case 6: return "A6"
      case 7: return "A7"
      case 8: return "A8"
      case 9: return "A9"
      case 10: return "A10"
      case 11: return "A11"
      case 12: return "A12"
      case 13: return "A13"
      case 14: return "A14"
      case 15: return "A15"
      case 16: return "A16"
      case 17: return "A17"
      case 18: return "A18"
      case 19: return "A19"
      case 20: return "A20"
      case 21: return "A21"
      case 22: return "A22"
      case 23: return "A23"
      case 24: return "A24"
      default:
        return "Khong xac dinh"        
    }
  }

  getStartTime(date: Date): string {
    // Lấy giờ và phút
    let hours: number = date.getHours();
    let minutes: number = date.getMinutes();
    
    // Thêm số 0 phía trước nếu giờ hoặc phút chỉ có một chữ số
    hours = Number(hours < 10 ? '0' + hours : hours);
    minutes = Number(minutes < 10 ? '0' + minutes : minutes);
    
    // Lấy ngày, tháng và năm
    const day: number = date.getDate();
    const month: number = date.getMonth() + 1; // Tháng bắt đầu từ 0
    const year: number = date.getFullYear();
    
    // Định dạng chuỗi
    const startTime: string = `${hours}:${minutes} ${day}/${month}/${year}`;
    
    return startTime;
  }
  
  checkTerm(t: Order): boolean {
    const now = new Date();  // Get current date and time
    const ticketTime = new Date(t.timeStart);  
    return ticketTime.getTime() > now.getTime();
  }
  coverToDate(t: string) {
    const date = new Date(t);
    return date;
  }
  searchform=this.buidr.group({
    phone:this.buidr.control(''),
    departure_date:this.buidr.control(''),
    id_tour:this.buidr.control('')
  })  
  searchOrder(){
    const phone = this.convertPhoneNumber(this.searchform.get('phone').value.toString());
    const date = this.searchform.get('departure_date').value.toString();
    const id_tour = +this.searchform.get('id_tour').value;
    if(phone == '' || date == "" || id_tour == null ){
     this.toart.warning("Vui lòng nhập đầy đủ thông tin", "Thông báo");
  }
    else{
      this.tickerservice.searchOrder(id_tour,date,phone).subscribe(res =>{
        this.orderList = res;
        console.log(this.orderList);
      })
    } 
  }
  convertPhoneNumber(phone: string): string {
    if (phone.startsWith('0')) {
      return '%2B84' + phone.substring(1);
    }
    return phone;
  }
}

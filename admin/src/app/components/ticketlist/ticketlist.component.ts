import { Component, OnInit } from '@angular/core';
import { Ticket } from '../../models/ticket';
import { MatDialog } from '@angular/material/dialog';
import { TicketserviceService } from '../../service/ticketservice.service';
import { ActivatedRoute } from '@angular/router';
import { TicketformComponent } from '../ticketform/ticketform.component';
import { FormBuilder, NumberValueAccessor } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { forkJoin, interval } from 'rxjs';
import * as XLSX from 'xlsx';
import { BusesserviceService } from '../../service/busesservice.service';
import { Buses } from '../../models/buses';
import html2canvas from 'html2canvas';
import { tick } from '@angular/core/testing';


@Component({
  selector: 'app-ticketlist',
  templateUrl: './ticketlist.component.html',
  styleUrl: './ticketlist.component.scss'
})
export class TicketlistComponent implements OnInit {
  ticketList: Array<Ticket> = new Array<Ticket>;
  id: number
  plates: string
  datestart: string
  tour: string
  id_tour: number
  showdownload: boolean = true;
  interval: any
  isbill: boolean = false;
  ispay: boolean = false;
  listid: number[] = [];
  list = [
    {
      status: true, name: 'dang lam'
    },
    {
      status: false, name: 'da nghi viec'
    },
  ]

  constructor(private ticketService: TicketserviceService, private dialog: MatDialog, private route: ActivatedRoute, private buidr: FormBuilder, private toastr: ToastrService, private ticketsevice: TicketserviceService, private busesService: BusesserviceService) {
    // this.loadData();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = +params['id'];
      console.log(this.id)
    });
    const { plateNumber, id_tour } = history.state;
    this.plates = plateNumber
    this.id_tour = id_tour
    console.log(this.id_tour)

    this.busesService.getbusesBycode(this.id).subscribe(res => {
      if (res) {
        let buses = new Buses();
        buses.setRate(res);
        const name = this.getTourname(buses.idTour);
        this.tour = name;
        const time = this.getStartTime(buses.timeStart);
        this.datestart = time
        this.filename = 'Danh sach ve ' + this.addFileName(this.filename, name, time);
        console.log(this.filename);


      }
    })

    this.loadData()
  }

  loadData() {
    this.ticketService.getTicketList(this.id).subscribe(res => {
      const requests = res.map(item => {
        let r = new Ticket();
        r.setRate(item);
        return this.ticketService.getTicketName(r.idSeatdetail);
      });

      forkJoin(requests).subscribe(
        (data: any) => {
          this.ticketList = res.map((item, index) => {
            let r = new Ticket();
            r.setRate(item);
            r.seats = data[index];
            return r;
          });
        },
        (error: any) => {
          console.error('Error:', error);
        }
      );
    });
  }

  getstatus(status) {
    switch (status) {
      case true:
        return "Đang làm việc"
      case false:
        return "Đã nghỉ việc"
      default:
        return "Khong xac dinh"
    }
  }

  OpenDialog(code: any, title: any, status: any) {
    var _popup = this.dialog.open(TicketformComponent, {
      width: '50%',
      enterAnimationDuration: '700ms',
      exitAnimationDuration: '700ms',
      height: '600px',
      data: {
        Title: title,
        code: code,
        status: status
      }
    });
    _popup.afterClosed().subscribe(res => {
      console.log(res);
      if (res)
        this.loadData();
    })
  }
  editTicket(code: any) {
    this.OpenDialog(code, "Cập nhật", 1);
  }

  deleteTicket(id: number) {
    this.ticketService.deleteTicket(id).subscribe(res => {
      console.log("Xoa thanh cong");
      this.loadData();
    })
  }
  searchform = this.buidr.group({
    phone: this.buidr.control(''),
  })

  searchTicket() {
    const sdt = this.searchform.get('phone').value.toString();
    if (!sdt) {
      this.toastr.warning("Vui lòng nhập số điện thoại", "Lỗi")
    }
    else {
      this.ticketService.searchticket(this.id, sdt).subscribe(res => {
        this.ticketList = [];
        res.map(item => {
          let r = new Ticket();
          r.setRate(item);
          this.ticketService.getTicketName(r.idSeatdetail).subscribe(
            (data: any) => {
              r.seats = data;
              this.ticketList.push(r);
            },
            (error: any) => {
              console.error('Error:', error);
            }
          );
        });
        clearInterval(this.interval);
      });
    }
  }
  getStatus(id: number) {
    switch (id) {
      case 1: return "Đang chờ xác nhận"
      case 2: return "Chưa thanh toán"
      case 3: return "Đã thanh toán"
      case 4: return "Hủy bỏ"
      default:
        return "Không xác định"
    }
  }


  receive_payment(id: number): void {
    this.ticketsevice.receivePayment(id).subscribe(
      (response) => {
        console.log('Đơn hàng đã được xác nhận', response);
        this.loadData()
        // Thực hiện các thao tác cần thiết sau khi hủy đơn hàng
      },
      (error) => {
        console.error('Lỗi khi hủy đơn hàng', error);
        // Xử lý lỗi nếu cần
      }
    );
  }

  filename = "Danh sách vé.xlsx";

  exportExcel(): void {
    this.showdownload = false;
    let data = document.getElementById('ticketlist');

    // Chuyển đổi bảng HTML thành mảng hai chiều (Array of Arrays)
    const tableArray = Array.from(data.querySelectorAll('tr')).map(row =>
      Array.from(row.querySelectorAll('th:not(.d-none), td:not(.d-none)')).map(cell => cell.textContent.trim())
    );

    // Xóa cột J (chỉ mục 9) trong mỗi hàng
    tableArray.forEach(row => row.splice(9, 1));

    // Xóa hàng thứ 2 (chỉ mục 1)
    tableArray.splice(1, 1);

    // Tạo đối tượng WorkSheet từ mảng hai chiều
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(tableArray);

    // Tạo Workbook và ghi đối tượng WorkSheet vào đó
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Xuất ra file Excel
    XLSX.writeFile(wb, this.filename);

    setTimeout(() => {
      this.showdownload = true
    }, 5000)
  }

  getTourname(id: number) {
    switch (id) {
      case 1: return "Thanh Hóa - Lào Cai";
      case 2: return "Thanh Hóa - Sa Pa";
      case 3: return "Lào Cai - Thanh Hóa";
      case 4: return "Sa Pa - Thanh Hóa";
      default: return "Không xác định";
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
  addFileName(filename: string, tourname: string, time: string): string {
    // Tách phần mở rộng của tên file
    const extension: string = filename.substring(filename.lastIndexOf('.'));

    // Tạo tên file mới với thông tin về tên chuyến, thời gian và phần mở rộng
    const newFilename: string = `${tourname} - ${time}${extension}`;

    return newFilename;
  }

  captureTicket(ticket: any) {
    console.log("Chào");

    // Tạo element tạm thời
    const element = document.createElement('div');
    element.style.position = 'absolute';
    element.style.top = '-9999px';  // Ẩn element khỏi màn hình
    element.innerHTML = `
  <div class="card p-3" style="width: 280px;height: 600px;">
  <h5 class="card-title">CÔNG TY TNHH DL&VT QUANG DŨNG</h5>
  <h5>ĐT: <strong>
      0123456789
  </strong></h5>
  <div class="card-body pt-1">
      <div class="">
          <div class="row justify-content-center" style="height: 30px;">
              <h2><strong>Vé xe<strong></h2>
          </div>
          <div class="row justify-content-center " style="height: 25px;">
              <h3>Mã ghế : <strong>
                  ${ticket.seats}
             </strong>
              </h3>
          </div>
          <div class="row justify-content-center ">
              <h3>Biển số xe : <strong>
                  ${this.plates}
             </strong></h3>
              
          </div>
          <div class="row justify-content-center ">
              <h3>${this.getTourname(this.id_tour)}
              </h3>
              
          </div>

      </div>
      <div>
          <div class="row justify-content-between">
              <h5 class="font-weight-bolder">Tên</h5>
              <h5>${ticket.name}</h5>
          </div>
          <div class="row justify-content-between">
              <h5 class="font-weight-bolder">SĐT</h5>
              <h5>${ticket.phoneNumber}</h5>
          </div>
          <div class="row justify-content-between">
              <h5 class="font-weight-bolder">Điểm đón</h5>
              <h5>${ticket.pickUpLoc}</h5>
          </div>
          <div class="row justify-content-between">
              <h5 class="font-weight-bolder">Điểm trả</h5>
              <h5>${ticket.dropDownLoc}</h5>
          </div>
          <div class="row justify-content-between">
              <h5 class="font-weight-bolder">Khời hành</h5>
              <h5>${this.datestart}</h5>
          </div>
          <hr class="m-0">
          <div class="row justify-content-center">
              <h4 class="font-weight-bolder">Tổng tiền : 380.000Đ</h4>
          </div>
          <div class="row justify-content-between" >
              <h5 style="text-decoration: underline;">Lưu ý</h5>
              <h5 class="text-center">Đồ dùng cá nhân quý khách tự bảo quản.Mất nhà xe không chịu trách nghiệm</h5>
          </div>
      </div>

  </div>
</div>
  `;
    document.body.appendChild(element);

    // Sử dụng html2canvas để chụp ảnh
    html2canvas(element).then(canvas => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'ticket.png';
      link.click();
      document.body.removeChild(element);  // Xóa element sau khi chụp ảnh
    });
  }
  
  convertPhoneNumberBack(phone: string): string {
    if (phone.startsWith('+84')) {
      return '0' + phone.substring(3);
    }
    return phone;
  }
  selectbill() {
    this.listid = []
    this.isbill = !this.isbill;
    this.ispay = false
    
  }
  selectpay() {
    this.listid = []
    this.ispay = !this.ispay;
    this.isbill = false
  
  }

  addlist(id: number) {
    this.listid.includes(id) ? this.listid.splice(this.listid.indexOf(id), 1) : this.listid.push(id);
    console.log(this.listid);
    
  }


}

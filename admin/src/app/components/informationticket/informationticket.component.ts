import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SeatDetail } from '../../models/seatdetail';
import { FormBuilder, Validators } from '@angular/forms';
import { TicketserviceService } from '../../service/ticketservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-informationticket',
  templateUrl: './informationticket.component.html',
  styleUrl: './informationticket.component.scss'
})
export class InformationticketComponent implements OnInit {
  ngOnInit(): void {



  }
  listid: number[] = []
  listeddetailseat: SeatDetail[] = []
  time_start: any
  time_end: any
  hoVaTen: string = '';
  soDienThoai: string = '';
  ghiChu: string = '';
  diemDon: string = '';
  diemTra: string = '';
  submitted = false;
  submitError: boolean = false;
  issummit: boolean = false
  constructor(private ref: MatDialogRef<InformationticketComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog, private buidr: FormBuilder, private ticketService: TicketserviceService, private toastr: ToastrService) {
    this.listid = data.data.listid;
    this.listeddetailseat = data.data.seatdetaillist;
    this.time_end = data.data.timeEnd;
    this.time_start = data.data.timeStart
  }

  myform = this.buidr.group({
    name: this.buidr.control(''),
    phone_number: this.buidr.control(''),
    date_book: this.buidr.control(''),
    pick_up_loc: this.buidr.control(''),
    drop_down_loc: this.buidr.control(''),
    note: this.buidr.control(''),
    id_seatdetail: this.buidr.control('')
  })


  getNameSeat(id: number) {
    switch (id) {
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
  saveTicket() {
    if (this.issummit) {
      return
    }
    // Check if the form is valid
    if (
      this.hoVaTen === '' || this.soDienThoai === '' || this.ghiChu === '' || this.diemDon === '' || this.diemTra === ''
    ) {
      this.toastr.warning('Vui lòng điền đầy đủ thông tin', 'Thông báo');
      return;
    }
    this.issummit = true
    for (let i = 0; i < this.listeddetailseat.length; i++) {
      const ticketData = {
        name: this.hoVaTen,
        phone_number: this.soDienThoai,
        note: this.ghiChu,
        pick_up_loc: this.diemDon,
        drop_down_loc: this.diemTra,
        id_seatdetail: this.listeddetailseat[i].id,
        // Add other necessary information from listselected to ticketData
      };
      this.ticketService.postTicket(ticketData).subscribe(
        (res) => {
          // Show success message for each ticket
          this.toastr.success('Đặt vé thành công', 'Thông báo')
          this.showSuccessMessage()
          this.issummit = false
        },
        (error) => {
          // Handle error here if needed
          console.error('Error saving ticket:', error);
          // Show error message if needed
          this.toastr.error('Đặt vé thất bại')
          this.issummit = false
        }
      );
    }
  }

  showSuccessMessage() {
    setTimeout(() => {
      location.reload();
    }, 2000); // Reload page after 3 seconds
  }



  closedf() {
    this.ref.close('Close using function');
  }
}

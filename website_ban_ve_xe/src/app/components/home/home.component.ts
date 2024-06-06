import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { BookingComponent } from '../booking/booking.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BusesService } from '../../services/buses.service';
import { ToastrService } from 'ngx-toastr';
import { Buses } from '../../models/buses';
import { Router } from '@angular/router';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  
  constructor(private modalService: BsModalService,private buidr: FormBuilder,private busesService:BusesService,private toastr:ToastrService,private sharedService:SharedService,private router: Router) {}
  busesList: Array<Buses> = new Array<Buses>;
  searchform: FormGroup;
  loader: boolean = true
  ngOnInit(): void {
    this.sharedService.searchForm.subscribe(form => {
      this.searchform = form;
    });
    setTimeout(() => {
      this.loader = false;
    }, 2000)
  }
  tour=[
    {id:1,name:'Thanh Hóa - Lào Cai'},
    {id:2,name:'Thanh Hóa - Sa Pa'},
    {id:3,name:'Lào Cai - Thanh Hóa'},
    {id:4,name:'Sa Pa - Thanh Hóa'}
  ]
  openModalBooking() {
    const initialState: ModalOptions = {
      initialState: {
        list: [
          'Open a modal with component',
          'Pass your data',
          'Do something else',
          '...',
        ],
        title: 'Modal with component',
      },
    };
    this.modalService.show(BookingComponent,{ class: 'gray modal-lg' });
  }

  formatDate(input:any) {
    // Lấy ngày được chọn
    var selectedDate = new Date(input.value);
    
    // Kiểm tra nếu ngày hợp lệ
    if (!isNaN(selectedDate.getTime())) {
        // Lấy ngày, tháng, năm
        var day = selectedDate.getDate();
        var month = selectedDate.getMonth() + 1;
        var year = selectedDate.getFullYear();
        
        // Định dạng lại ngày tháng năm
        var formattedDate = (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '') + month + '/' + year;
        
        // Gán lại giá trị cho input
        input.value = formattedDate;
    }
}

  searchFrom(){
    const id = +this.searchform.get('id_tour').value;
    const date = this.searchform.get('departure_date').value.toString();
    if (!id || !date) {
      this.toastr.warning('Vui lòng chọn ngày đi và chuyến đi!', 'Lỗi');
    }
    else{  
      const params = {
        tourId:id,
        date
      }
      this.router.navigate(['/list'],{queryParams:params})
    }
  }

}

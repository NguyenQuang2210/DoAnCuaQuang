import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Buses } from '../../models/buses';
import { SeatdetailService } from '../../services/seatdetail.service';
import { SharedService } from '../../shared/shared.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BusesService } from '../../services/buses.service';
import { formatDate } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { BookingComponent } from '../booking/booking.component';
import { VehicleServiceService } from '../../services/vehicle-service.service';
import { Vehicle } from '../../models/vehicle';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  numberOfAvailableSeats: { [key: number]: number } = {};
  busesList: Array<Buses> = [];
  vehicleList: Array<Vehicle> = new Array<Vehicle>;
  searchform: FormGroup;
  departureDate: string;
  idTour: number;
  iselect1: boolean = false
  iselect2: boolean = false
  iselect3: boolean = false
  emptyseat: number = 1
  loader: boolean = true

  constructor(private seatDeatilService: SeatdetailService, private vehicleService: VehicleServiceService, private sharedservice: SharedService, private buidr: FormBuilder, private buseserivce: BusesService, private activatedrouter: ActivatedRoute, private dialog: MatDialog, private buseservice: BusesService,private router: Router) {
    this.activatedrouter.queryParams.subscribe((params: any) => {
      if (params) {
        this.idTour = +params.tourId,
          this.departureDate = params.date,
          this.initForm()

        this.loadData()
      }
    })
  }

  ngOnInit(): void {

    this.loadData()
    setTimeout(() => {
      this.loader = false;
    }, 3000)
  }
  initForm() {
    this.searchform = this.buidr.group({
      departure_date: [formatDate(new Date(this.departureDate), 'yyyy-MM-dd', 'en')],
      id_tour: [this.idTour]
    })
  }
  loadData() {
    this.buseserivce.searchbuses(this.idTour, this.departureDate).subscribe(res => {
      this.busesList = [];
      res.map(item => {
        let r = new Buses();
        r.setRate(item);
        this.busesList.push(r);
        this.getNumberOfAvailableSeats(r.id);

      })
      // this.rates = res;
    })
    this.vehicleService.getVehicleList().subscribe(res => {
      this.vehicleList = [];
      res.map(item => {
        let r = new Vehicle();
        r.setRate(item);
        this.vehicleList.push(r);
      })
      // this.rates = res;

    })
  }
  gettimexuatphat(time: Date): Date {
    return new Date(time.getTime() - 15 * 60000); // Trừ đi 15 phút (15 * 60000 milliseconds)
  }
  getNumberOfAvailableSeats(id_buses: number): number {
    this.seatDeatilService.getavaiableseat(id_buses).subscribe(
      (res: number) => {
        this.numberOfAvailableSeats[id_buses] = res
        return res
      }
    );
    return 0;

  }
  getlisencepaltes(idVehicle: number): string {
    const vehicle = this.vehicleList.find(vehicle => vehicle.id === idVehicle);
    return vehicle ? vehicle.licensePlate : 'Loading...';
  }


  getBusesInfo() {
    this.busesList.forEach(buses => {
      this.getNumberOfAvailableSeats(buses.id);
    });
  }

  OpenDialog(id: number, id_vehicle, time_start: Date, time_end: Date) {
    const lisenceplate = this.getlisencepaltes(id_vehicle);
    console.log(lisenceplate);

    var _popup = this.dialog.open(
      BookingComponent, {
      width: '50%',
      enterAnimationDuration: '700ms',
      exitAnimationDuration: '700ms',
      height: '700px',
      data: {
        Title: "Đặt vé",
        data: {
          id_buses: id,
          time_start: time_start,
          time_end: time_end,
          lisence_plate: lisenceplate
        }
      }
    });
    _popup.afterClosed().subscribe(res => {
      const id = +this.searchform.get('id_tour').value;
      const date = this.searchform.get('departure_date').value.toString();
      if (!id && !date) {
        this.loadData();

      }
      else {
        this.searchBuses();
      }
      this.getBusesInfo();
    })
  }

  formatDate(input: any) {
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

  searchBuses() {
    const id = +this.searchform.get('id_tour').value;
    const date = this.searchform.get('departure_date').value.toString();
    if (!id || !date) {
      // this.toastr.warning("Yêu cầu nhập ngày đi và tuyến xe","lỗi")
    }
    else {
      this.buseservice.searchbuses(id, date).subscribe(res => {
        this.busesList = [];
        res.map(item => {
          let r = new Buses();
          r.setRate(item);
          this.busesList.push(r);
          this.getNumberOfAvailableSeats(r.id);
        })
        // this.rates = res;
        this.getBusesInfo();
        console.log(this.busesList);
      })
      this.vehicleService.getVehicleList().subscribe(res => {
        this.vehicleList = [];
        res.map(item => {
          let r = new Vehicle();
          r.setRate(item);
          this.vehicleList.push(r);
        })
        // this.rates = res;
        console.log(this.vehicleList);
      })
    }
    const params = {
      tourId:id,
      date
    }
    // this.router.navigate(['/list'],{queryParams:params})
  }
  select1() {
    this.iselect1 = !this.iselect1
    if((this.iselect2 || this.iselect3) && !this.iselect1){
      this.busesList = [];
    }
    else{
      this.loadData();
    }
   

  }
  select2() {
    this.iselect2 = !this.iselect2
    if (this.iselect1) {
      return
    }
    if (this.iselect2) {
      this.busesList = [];
    }
    else {
      this.loadData();
    }
  }
  select3() {
    this.iselect3 = !this.iselect3
    if (this.iselect1) {
      return
    }
    if (this.iselect3) {
      this.busesList = [];
    }
    else {
      this.loadData();
    }
  }
  filterseat($event: any) {
    this.emptyseat = $event.target.value;
  }
  filtertimestart($event: any) {
    const inputElement = event.target as HTMLInputElement;
    this.sliderValue = Number(inputElement.value);
    this.time = this.convertMinutesToTime(this.sliderValue);
  }

  sliderValue: number = 0;
  time: string = this.convertMinutesToTime(this.sliderValue);

  convertMinutesToTime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${this.padZero(hours)}:${this.padZero(mins)}`;
  }

  padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  convertTimeToMinutes(time: Date): number {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    return hours * 60 + minutes;
  }

  resetfilter() {
    this.sliderValue = 0;
    this.iselect1 = false;
    this.iselect2 = false;
    this.iselect3 = false;
    this.emptyseat = 1;
    this.loadData();
  }

}

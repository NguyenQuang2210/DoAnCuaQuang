import { Component } from '@angular/core';
import { TicketserviceService } from '../../service/ticketservice.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Ticket } from '../../models/ticket';
import { Buses } from '../../models/buses';
import { Driver } from '../../models/driver';
import { Vehicle } from '../../models/vehicle';
import { BusesserviceService } from '../../service/busesservice.service';
import { DriverserviceService } from '../../service/driverservice.service';
import { FormBuilder } from '@angular/forms';
import { VehicleServiceService } from '../../service/vehicle-service.service';
import { MapComponent } from '../map/map.component';
import { SeatdetailService } from '../../service/seatdetail.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent {
  busesList: Array<Buses> = new Array<Buses>;
  driverList: Array<Driver> = new Array<Driver>;
  vehicleList: Array<Vehicle> = new Array<Vehicle>;
  numberOfAvailableSeats: { [key: number]: number } = {};

  constructor(private busesService: BusesserviceService, private driverService: DriverserviceService, private vehicleService: VehicleServiceService, private buidr: FormBuilder, private dialog: MatDialog, private seatdetailService: SeatdetailService, private toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.loadData();
    this.getBusesInfo();
   
  }

  getBusesInfo() {
    this.busesList.forEach(buses => {
      this.getNumberOfAvailableSeats(buses.id);
    });
  }
  tour = [
    { id: 1, name: 'Thanh Hóa - Lào Cai' },
    { id: 2, name: 'Thanh Hóa - Sa Pa' },
    { id: 3, name: 'Lào Cai - Thanh Hóa' },
    { id: 4, name: 'Sa Pa - Thanh Hóa' }
  ]


  loadData() {
    this.busesService.checkbusestoday().subscribe(res => {
      this.busesList = [];
      res.map(item => {
        let r = new Buses();
        r.setRate(item);
        this.busesList.push(r);
        this.getNumberOfAvailableSeats(r.id);
      })
      // this.rates = res;
      console.log(this.busesList);
    })
    this.driverService.getDriverList().subscribe(res => {
      this.driverList = [];
      res.map(item => {
        let r = new Driver();
        r.setRate(item);
        this.driverList.push(r);

      })
      // this.rates = res;
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
      console.log(this.busesList);
    })
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

  getDriverName(idDriver: number): string {
    const driver = this.driverList.find(driver => driver.id === idDriver);
    return driver ? driver.name : 'Loading...';
  }

  getlisencepaltes(idVehicle: number): string {
    const vehicle = this.vehicleList.find(vehicle => vehicle.id === idVehicle);
    return vehicle ? vehicle.licensePlate : 'Loading...';
  }

  searchform = this.buidr.group({
    departure_date: this.buidr.control(''),
    id_tour: this.buidr.control('')
  })


  searchBuses() {
    const id = +this.searchform.get('id_tour').value;
    const date = this.searchform.get('departure_date').value.toString();
    if(!id||!date){
      this.toastr.warning("Yêu cầu nhập ngày đi và tuyến xe","lỗi")
    }
    else{
    this.busesService.searchbuses(id, date).subscribe(res => {
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
  }
}


  OpenDialog(id: number, time_start: Date, time_end: Date) {
    var _popup = this.dialog.open(MapComponent, {
      width: '50%',
      enterAnimationDuration: '700ms',
      exitAnimationDuration: '700ms',
      height: '600px',
      data: {
        Title: "Đặt vé",
        data: {
          id_buses: id,
          time_start: time_start,
          time_end: time_end
        }
      }
    });
    _popup.afterClosed().subscribe(res => {
      const id = +this.searchform.get('id_tour').value;
      const date = this.searchform.get('departure_date').value.toString();
      if(!id && ! date){
        this.loadData();
        
      }
      else{
        this.searchBuses();
      }
    this.getBusesInfo();
    })
  }


  getNumberOfAvailableSeats(id_buses: number): void {
    this.seatdetailService.getavaiableseat(id_buses).subscribe(
      (res: number) => {
        this.numberOfAvailableSeats[id_buses] = res
      }
    );
  }
}

import { Component, ViewEncapsulation } from '@angular/core';
import { Driver } from '../../models/driver';
import { Vehicle } from '../../models/vehicle';
import { Buses } from '../../models/buses';
import { BusesserviceService } from '../../service/busesservice.service';
import { DriverserviceService } from '../../service/driverservice.service';
import { VehicleServiceService } from '../../service/vehicle-service.service';
import { FormBuilder } from '@angular/forms';
import { SeatdetailService } from '../../service/seatdetail.service';
import { ToastrService } from 'ngx-toastr';
import { TicketserviceService } from '../../service/ticketservice.service';
import { Ticket } from '../../models/ticket';
import { Router } from '@angular/router';


@Component({
  selector: 'app-buseson',
  templateUrl: './buseson.component.html',
  styleUrls: ['./buseson.component.scss'],
})
export class BusesonComponent {
  busesList: Array<Buses> = new Array<Buses>;
  driverList: Array<Driver> = new Array<Driver>;
  vehicleList: Array<Vehicle> = new Array<Vehicle>;
  orderList: Array<Ticket> = new Array<Ticket>;
  empty_seat:number=0
  constructor(private busesService: BusesserviceService,private driverService: DriverserviceService,private vehicleService: VehicleServiceService,private buidr: FormBuilder,private toastr: ToastrService,private ticketsevice:TicketserviceService,private router: Router) {

  }

  ngOnInit(): void {
    this.loadData()

  }

  tour=[
    {id:1,name:'Thanh Hóa - Lào Cai'},
    {id:2,name:'Thanh Hóa - Sa Pa'},
    {id:3,name:'Lào Cai - Thanh Hóa'},
    {id:4,name:'Sa Pa - Thanh Hóa'}
  ]


  loadData(){
    this.busesService.checkbusestoday().subscribe(res => {
      this.busesList=[];    
      res.map(item=>{
        let r = new Buses();
        r.setRate(item);
        this. busesList.push(r);
      })
      // this.rates = res;
      console.log(this.busesList);
    })
    this.driverService.getDriverList().subscribe(res => {
      this.driverList=[];    
      res.map(item=>{
        let r = new Driver();
        r.setRate(item);
        this. driverList.push(r);
      })
      // this.rates = res;
      console.log(this.busesList);
    })
    this.vehicleService.getVehicleList().subscribe(res =>{
      this. vehicleList=[];    
      res.map(item=>{
        let r = new Vehicle();
        r.setRate(item);
        this. vehicleList.push(r);
      })
      // this.rates = res;
      console.log(this.busesList);
    })
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
  
  getDriverName(idDriver: number): string {
    const driver = this.driverList.find(driver => driver.id === idDriver);
    return driver ? driver.name : 'Loading...';
  }

  getlisencepaltes(idVehicle: number): string {
    const vehicle = this.vehicleList.find(vehicle => vehicle.id === idVehicle);
    return vehicle ? vehicle.licensePlate : 'Loading...';
  }

  searchform=this.buidr.group({
    departure_date:this.buidr.control(''),
    id_tour:this.buidr.control('')
  })


  searchBuses(){
    const id = +this.searchform.get('id_tour').value;
    const date = this.searchform.get('departure_date').value.toString();
    if (!id || !date) {
      this.toastr.warning('Vui lòng chọn ngày đi và chuyến đi!', 'Lỗi');
    }
    else{
    this.busesService.searchbuses(id,date).subscribe(res => {
      this.busesList=[];    
      res.map(item=>{
        let r = new Buses();
        r.setRate(item);
        this. busesList.push(r);
      })
      // this.rates = res;
      console.log(this.busesList);
    })
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
  onNavigate(buses: Buses) {
    const queryParams = { id: buses.id };
    const navigationExtras = {
      state: {
        plateNumber: this.getlisencepaltes(buses.idVehicle),
        id_tour: buses.idTour
      }
    };

    
    this.router.navigate(['/ticket'], { queryParams, ...navigationExtras });
  }

 

}

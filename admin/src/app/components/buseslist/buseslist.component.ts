import { Component } from '@angular/core';
import { Buses } from '../../models/buses';
import { BusesserviceService } from '../../service/busesservice.service';
import { Driver } from '../../models/driver';
import { Vehicle } from '../../models/vehicle';
import { DriverserviceService } from '../../service/driverservice.service';
import { VehicleServiceService } from '../../service/vehicle-service.service';
import { NgFor } from '@angular/common';
import { BusesformComponent } from '../busesform/busesform.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-buseslist',
  templateUrl: './buseslist.component.html',
  styleUrl: './buseslist.component.scss'
})
export class BuseslistComponent {
  busesList: Array<Buses> = new Array<Buses>;
  driverList: Array<Driver> = new Array<Driver>;
  vehicleList: Array<Vehicle> = new Array<Vehicle>;

  constructor(private busesService: BusesserviceService,private driverService: DriverserviceService,private vehicleService: VehicleServiceService,private dialog: MatDialog,private toart:ToastrService) {

  }

  ngOnInit(): void {
    this.loadData();
  }

  tour=[
    {id:1,name:'Thanh Hóa - Lào Cai'},
    {id:2,name:'Thanh Hóa - Sa Pa'},
    {id:3,name:'Lào Cai - Thanh Hóa'},
    {id:4,name:'Sa Pa - Thanh Hóa'}
  ]


  loadData(){
    this.busesService.getBusesList().subscribe(res => {
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

  OpenDialog(code:any,title:any,status:any){
    var _popup = this.dialog.open(BusesformComponent,{
      width: '50%',
      enterAnimationDuration:'700ms',
      exitAnimationDuration:'700ms',
      height: '600px',
      data:{
        Title:title,
        code:code,
        status:status
      }
    });
    _popup.afterClosed().subscribe(res => {
      this.loadData();
    })
  }
  editBuses(code:any) {
    this.OpenDialog(code,"Cập nhật",1);
    }
  addBuses() {
    this.OpenDialog(0,"Thêm mới",0);
  }  
  deleteBuses(id:number){
    this.busesService.deleteBuses(id).subscribe(res=>{
      this.toart.warning("Xóa chuyến xe thành công","Thông báo");
      this.loadData();
    })
  }
}

import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BusesserviceService } from '../../service/busesservice.service';
import { Driver } from '../../models/driver';
import { Vehicle } from '../../models/vehicle';
import { DriverserviceService } from '../../service/driverservice.service';
import { VehicleServiceService } from '../../service/vehicle-service.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-busesform',
  templateUrl: './busesform.component.html',
  styleUrl: './busesform.component.scss'
})
export class BusesformComponent {
  driverList: Array<Driver> = new Array<Driver>;
  vehicleList: Array<Vehicle> = new Array<Vehicle>;
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private ref:MatDialogRef<BusesformComponent>,private buidr:FormBuilder,private busesService: BusesserviceService,private driverService: DriverserviceService,private vehicleService: VehicleServiceService,private toart:ToastrService){}
  ngOnInit(): void {
    this.inputdata = this.data
    if(this.inputdata.code>0){
      this.setbuses(this.inputdata.code)
    }
    this.driverService.getDriverList().subscribe(res => {
      this.driverList=[];    
      res.map(item=>{
        let r = new Driver();
        r.setRate(item);
        this. driverList.push(r);
      })
    })
    this.vehicleService.getVehicleList().subscribe(res =>{
      this. vehicleList=[];    
      res.map(item=>{
        let r = new Vehicle();
        r.setRate(item);
        this. vehicleList.push(r);
      })
    })
  }
  inputdata:any
  editdata:any
  closedf(){
    this.ref.close('Close using function');
  }
  
  setbuses(code:any){
    this.busesService.getbusesBycode(code).subscribe(res=>{
      this.editdata = res
      this.myform.setValue({
        time_start:this.editdata.time_start,
        price:this.editdata.price,
        id_vehicle:this.editdata.id_vehicle,
        id_driver:this.editdata.id_driver,
        id_tour:this.editdata.id_tour
      })
    })
  }

  getDriverName(idDriver: number): string {
    const driver = this.driverList.find(driver => driver.id === idDriver);
    return driver ? driver.name : 'Loading...';
  }

  getlisencepaltes(idVehicle: number): string {
    const vehicle = this.vehicleList.find(vehicle => vehicle.id === idVehicle);
    return vehicle ? vehicle.licensePlate : 'Loading...';
  }
  
  myform=this.buidr.group({
    time_start:this.buidr.control(''),
    price:this.buidr.control(''),
    id_vehicle:this.buidr.control(''),
    id_driver:this.buidr.control(''),
    id_tour:this.buidr.control('')
  })

  saveBuses(){
    this.busesService.postBuses(this.myform.value).subscribe(res=>{
      this.toart.success("Tạo chuyến xe thành công",'Thông báo');
            
     this.closedf()      
    });
  }
  updateBuses(){
    this.busesService.updateBuses(this.myform.value,this.editdata.id).subscribe(res=>{
      this.toart.warning("Thông tin chuyến xe đã được thay đổi",'Thông báo');
      this.closedf()
    })
  }
  

  showAddButton(){
    document.getElementById('addButton').style.display = 'none';
    document.getElementById('saveButton').style.display = 'inline';
  }

  showEditButton(){
    document.getElementById('addButton').style.display = 'inline';
    document.getElementById('saveButton').style.display = 'none';
  }
  
}

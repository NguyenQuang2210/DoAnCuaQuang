import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../../models/vehicle';
import { VehicleServiceService } from '../../service/vehicle-service.service';
import { MatDialog } from '@angular/material/dialog';
import { VehicleformComponent } from '../vehicleform/vehicleform.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vehiclelist',
  templateUrl: './vehiclelist.component.html',
  styleUrl: './vehiclelist.component.scss'
})
export class VehiclelistComponent implements OnInit {

  vehicleList: Array<Vehicle> = new Array<Vehicle>;

  constructor(private vehicleService: VehicleServiceService,private dialog: MatDialog,private toart:ToastrService) {

  }

  ngOnInit(): void {
    this.loadData();    
  }

  loadData(){
    this.vehicleService.getVehicleList().subscribe(res => {
      this. vehicleList=[];    
      res.map(item=>{
        let r = new Vehicle();
        r.setRate(item);
        this. vehicleList.push(r);
      })
      // this.rates = res;
      console.log(this.vehicleList);
    })
  }
  getType(type){
    switch(type){
      case 1:return "Xe buồng nằm";
      case 2:return "Xe limousine 16 chỗ";
      default:return "Không xác định";
    }
  }

  OpenDialog(code:any,title:any,status:any){
    var _popup = this.dialog.open(VehicleformComponent,{
      width: '40%',
      enterAnimationDuration:'700ms',
      exitAnimationDuration:'700ms',
      height: '450px',
      data:{
        title:title,
        code:code,
        status:status
      }
    });
    _popup.afterClosed().subscribe(res => {
      this.loadData();
    })
  }

  addVehicle(){
    this.OpenDialog(0,'Thêm mới',0);
  }

  editVehicle(code:any) {
    this.OpenDialog(code,"Cập nhật",1);
    }

  deleteVehicle(id:number) {
    this.vehicleService.deleteVehicle(id).subscribe(res=>{
      this.toart.error("Xóa xe thành công","Thông báo")
      this.loadData();})
  }
  getMaxNumberSeat(type){
    switch(type){
      case 1:return "24 chỗ";
      case 2:return "16 chỗ";
      default:return "Không xác định";
    }
  }
}

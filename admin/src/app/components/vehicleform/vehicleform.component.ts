import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VehicleServiceService } from '../../service/vehicle-service.service';
import { NgSelectConfig } from '@ng-select/ng-select';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vehicleform',
  templateUrl: './vehicleform.component.html',
  styleUrl: './vehicleform.component.scss'
})
export class VehicleformComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private ref:MatDialogRef<VehicleformComponent>,private buidr:FormBuilder,private vehicleService: VehicleServiceService,private cf:NgSelectConfig,private toart:ToastrService){}
  ngOnInit(): void {
    this.inputdata = this.data
    if(this.inputdata.code>0){
      this.setvehicle(this.inputdata.code)
    }
  }
  inputdata:any
  editdata:any
  type = [
    {
      id:1,name:"xe buồng nằm"
    },
    {
      id:2,name:"xe limousine 16 chỗ"
    }
  ]

  closedf(){
    this.ref.close('Close using function');
  }
  
  setvehicle(code:any){
    this.vehicleService.getVehiclebycode(code).subscribe(res=>{
      this.editdata = res
      this.myform.setValue({
     license_plates:this.editdata.license_plates,
     status:this.editdata.status,
     id_type:this.editdata.id_type
      })
    })
  }
  
  myform=this.buidr.group({
    license_plates:this.buidr.control(''),
    status:this.buidr.control(true),
    id_type:this.buidr.control('')
  })

  saveVehicle(){
    this.vehicleService.postVehicle(this.myform.value).subscribe(res=>{      
      this.toart.success("Tạo xe thành công",' Thông báo');
     this.closedf()      
    });
  }
  updateVehicle(){
    this.vehicleService.updateVehicle(this.myform.value,this.editdata.id).subscribe(res=>{
      this.toart.warning("Cập nhật xe thành công",' Thông báo');
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

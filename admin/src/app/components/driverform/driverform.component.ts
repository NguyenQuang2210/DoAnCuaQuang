
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DriverserviceService } from '../../service/driverservice.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-driverform',
  templateUrl: './driverform.component.html',
  styleUrl: './driverform.component.scss',

})
export class DriverformComponent implements OnInit{
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private ref:MatDialogRef<DriverformComponent>,private buidr:FormBuilder,private driverService: DriverserviceService,private toart:ToastrService){}
  ngOnInit(): void {
    this.inputdata = this.data
    if(this.inputdata.code>0){
      this.setdf(this.inputdata.code)
    }
  }
  inputdata:any
  editdata:any
  closedf(){
    this.ref.close('Close using function');
  }
  
  setdf(code:any){
    this.driverService.getDriverbycode(code).subscribe(res=>{
      this.editdata = res
      this.myform.setValue({
        name:this.editdata.name,
        phone_number:this.editdata.phone_number,
        date_start:this.editdata.date_start,
        status:this.editdata.status,
        driver_license:this.editdata.driver_license
      })
    })
  }
  
  myform=this.buidr.group({
    name:this.buidr.control(''),
    phone_number:this.buidr.control(''),
    driver_license:this.buidr.control(''),
    date_start:this.buidr.control(''),
    status:this.buidr.control(true)

  })

  saveDriver(){
    this.driverService.postDriver(this.myform.value).subscribe(res=>{     
      this.toart.success("Lái xe mới đã được thêm",'Thông báo'); 
     this.closedf()      
    });
  }
  updateDriver(){
    this.driverService.updateDriver(this.myform.value,this.editdata.id).subscribe(res=>{
      this.toart.warning("Thông tin Lái xe đã được thay đổi",'Thông báo');
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

import { Component, OnInit } from '@angular/core';
import { Driver } from '../../models/driver';
import { DriverserviceService } from '../../service/driverservice.service';
import { MatDialog } from '@angular/material/dialog';
import { DriverformComponent } from '../driverform/driverform.component';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-driverlist',
  templateUrl: './driverlist.component.html',
  styleUrl: './driverlist.component.scss'
})
export class DriverlistComponent  implements OnInit{

  driverList: Array<Driver> = new Array<Driver>;
  list = [
    {
      status:true,name:'dang lam'
    },
    {
      status:false,name:'da nghi viec'
    },
   
  ]

  constructor(private driverService: DriverserviceService,private dialog: MatDialog,private toart:ToastrService) {
    this.loadData();
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.driverService.getDriverList().subscribe(res => {
      this.driverList=[];    
      res.map(item=>{
        let r = new Driver();
        r.setRate(item);
        this. driverList.push(r);
      })
      // this.rates = res;
      console.log(this.driverList);
    })
  }

  getstatus(status){
    switch(status){
      case true:
        return "Đang làm việc"
      case false:
        return "Đã nghỉ việc"
      default:
        return "Khong xac dinh"
    }
  }

  OpenDialog(code:any,title:any,status:any){ 
    var _popup = this.dialog.open(DriverformComponent,{
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
  editDriver(code:any) {
    this.OpenDialog(code,"Cập nhật",1);
    }
  addDriver() {
    this.OpenDialog(0,"Thêm mới",0);
  }  
  deleteDriver(id:number){
    this.driverService.deleteDriver(id).subscribe(res=>{
      this.toart.warning("Xóa thành công","Thông báo");
      this.loadData();
    })
  }
}

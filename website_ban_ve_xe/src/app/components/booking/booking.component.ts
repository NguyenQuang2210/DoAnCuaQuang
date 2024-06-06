import { Component, Inject } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SeatDetail } from '../../models/seatdetail';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SeatdetailService } from '../../services/seatdetail.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss',
})
export class BookingComponent {
  id: any;
  seatdetailList: Array<SeatDetail> = new Array<SeatDetail>;
  listselected: SeatDetail[]=[];
  listuid:number[]=[]
  timeStart: any;
  timeEnd: any;
  lisenceplate:any;

  constructor(private ref:MatDialogRef<BookingComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private SeatdetailService:SeatdetailService,private router: Router){
    this.id = data.data.id_buses;
    this.timeStart = data.data.time_start;
    this.timeEnd = data.data.time_end;
    this.lisenceplate = data.data.lisence_plate
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.SeatdetailService.getseatdetailbyidbuses(this.id).subscribe(res => {
      this.seatdetailList=[];    
      res.map(item=>{
        let r = new SeatDetail();
        r.setRate(item);
        this.seatdetailList.push(r);
      })
      // this.rates = res;
      console.log(this.seatdetailList);
    })
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
  toggleSeat(seat: any) {
    if (seat.status===1) { // Chỉ cho phép chọn nếu status !== 1
      return 
    } 
    const index = this.seatdetailList.findIndex((s)=>s.id===seat.id)
    this.seatdetailList[index].selected = !this.seatdetailList[index].selected
    this.calmoney()
  }
  //
  calmoney(){
    let list = this.seatdetailList.filter((s)=>
      s.selected
    )
    this.listselected = list
    this.listuid = list.map(seat => seat.id)
  }

  closeDialog(){
    this.ref.close();
  }

  bookTicket(): void {
    const data = {
      timeStart: this.timeStart,
      timeEnd: this.timeEnd,
      listselected: this.listselected,
      id:this.id,
      lisenceplate:this.lisenceplate
    };
    const params = {
      idbuses:this.id
    }
    this.router.navigate(['/information'], {state:{data:data},queryParams:params}).then();
  
    this.closeDialog()
    
  }
}
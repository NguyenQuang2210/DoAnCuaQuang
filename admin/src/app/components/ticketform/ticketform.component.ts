import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TicketserviceService } from '../../service/ticketservice.service';
import { NotExpr } from '@angular/compiler';

@Component({
  selector: 'app-ticketform',
  templateUrl: './ticketform.component.html',
  styleUrl: './ticketform.component.scss'
})
export class TicketformComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private ref:MatDialogRef<TicketformComponent>,private buidr:FormBuilder,private TicketService: TicketserviceService){}
  ngOnInit(): void {
    this.inputdata = this.data
    if(this.inputdata.code>0){
      this.setticket(this.inputdata.code)
    }
  }
  inputdata:any
  editdata:any
  closedf(){
    this.ref.close('Close using function');
  }
  
  setticket(code:any){
    this.TicketService.getTicketBycode(code).subscribe(res=>{
      this.editdata = res
      this.myform.setValue({
        name:this.editdata.name,
        phone_number:this.editdata.phone_number,
        pick_up_loc:this.editdata.pick_up_loc,
        drop_down_loc:this.editdata.drop_down_loc,
        note:this.editdata.note,
        id_seatdetail:this.editdata.id_seatdetail,
        status:this.editdata.status,
      })
    })
  }
  
  myform=this.buidr.group({
    name:this.buidr.control(''),
    phone_number:this.buidr.control(''),
    pick_up_loc:this.buidr.control(''),
    drop_down_loc:this.buidr.control(''),
    note:this.buidr.control(''),
    id_seatdetail:this.buidr.control(''),
    status:this.buidr.control(''),
  })

  updateTicket(){
    this.TicketService.updateTicket(this.myform.value,this.editdata.id).subscribe(res=>{
      this.closedf()
    })
  }

  
}

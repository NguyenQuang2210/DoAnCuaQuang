import { Component } from '@angular/core';
import { Rate } from '../../models/rate';
import { RateServiceService } from '../../service/rateservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ratelist',
  templateUrl: './ratelist.component.html',
  styleUrl: './ratelist.component.scss'
})
export class RatelistComponent {
  rateList: Array<Rate> = new Array<Rate>;

  constructor(private rateService: RateServiceService,private toart:ToastrService) {

  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.rateService.getRateList().subscribe(res => {
      this.rateList=[];    
      res.map(item=>{
        let r = new Rate();
        r.setRate(item);
        this. rateList.push(r);
      })
      // this.rates = res;
      console.log(this.rateList);
    })
  }

  onDelete(id:number){
    this.rateService.deleteRate(id).subscribe(res=>{
      this.toart.success("Xóa thành công","Thành công");
      this.loadData();
    })  
  } 
}

import { Component, OnInit } from '@angular/core';
import { RatingService } from '../../services/rating.service';
import { Rate } from '../../models/rate';
import { FormControl, FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { from } from 'rxjs';
import moment from 'moment';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss'
})
export class RatingComponent implements OnInit {

  form:FormGroup;


  rates: Array<Rate> = new Array<Rate>;
  loader:boolean = true;
  constructor(private rate:RatingService,private fb:FormBuilder){

  }
  ngOnInit(): void {
    this.initForm();
    this.loadData();
    setTimeout(() => {
      this.loader = false;
    }, 2000)
  }

  initForm(){
    this.form = this.fb.group({
      name:[''],
      phoneNumber:[''],
      message:['']
    })
  }

  onSubmit(){
    const dataform = this.form.value;
    const datasubmit:any = {
      name:dataform.name,
      phone_number:dataform.phoneNumber,
      content:dataform.message,
      day_send: moment(new Date()).format('YYYY-MM-DD')
    }
    this.rate.postRate(datasubmit).subscribe(res=>{
      this.loadData();
    })
  }

  onDelete(id:number){
    this.rate.deleteRate(id).subscribe(res=>{
      this.loadData();
    })  
  }

  loadData(){
    this.rate.getRateList().subscribe(res => {
      this.rates=[];    
      res.map(item=>{
        let r = new Rate();
        r.setRate(item);
        this.rates.push(r);
      })
      // this.rates = res;
      console.log(this.rates);
    })
  }

}

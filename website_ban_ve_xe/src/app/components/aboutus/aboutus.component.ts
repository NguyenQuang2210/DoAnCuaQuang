import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrl: './aboutus.component.scss'
})
export class AboutusComponent implements OnInit{
  loader: boolean = true

  ngOnInit(): void {
    setTimeout(() => {
    this.loader = false
  }, 2000);}

}

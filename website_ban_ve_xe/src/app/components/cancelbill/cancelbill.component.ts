import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DenybillComponent } from '../denybill/denybill.component';

@Component({
  selector: 'app-cancelbill',
  templateUrl: './cancelbill.component.html',
  styleUrl: './cancelbill.component.scss'
})
export class CancelbillComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<CancelbillComponent>,public dialog: MatDialog
  ) { }
  ngOnInit(): void {
    
  }
  closeDialog() {
    this.dialog.open(DenybillComponent,{
      width: '600px',
      height: '200px',
      disableClose: true
  
    });
  
    this.dialogRef.close();
  }

}

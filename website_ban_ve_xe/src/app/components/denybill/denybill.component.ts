import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-denybill',
  templateUrl: './denybill.component.html',
  styleUrl: './denybill.component.scss'
})
export class DenybillComponent   implements OnInit{
  constructor(private dialog: MatDialog,public dialogRef: MatDialogRef<DenybillComponent>,private router: Router
  ) {}
  ngOnInit(): void {
   setTimeout(() => {
     this.dialogRef.close();
      this.router.navigate(['/']);
   }, 3000);
  }
  closeDialog() {
    this.dialogRef.close();
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-details-dialog',
  templateUrl: './details-dialog.component.html',
  styleUrl: './details-dialog.component.scss'
})
export class DetailsDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string, img: string, details: string }) { }

  ngOnInit(): void {
  }

}

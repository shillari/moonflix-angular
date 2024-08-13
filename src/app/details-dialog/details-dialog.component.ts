import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Component representing a dialog that shows details like a title, image, and description.
 */
@Component({
  selector: 'app-details-dialog',
  templateUrl: './details-dialog.component.html',
  styleUrl: './details-dialog.component.scss'
})
export class DetailsDialogComponent implements OnInit {

  /**
   * Data injected into the dialog containing the title, image, and details.
   * 
   * @param data.title The title to be displayed in the dialog.
   * @param data.img The image URL to be displayed in the dialog.
   * @param data.details The descriptive details to be shown in the dialog.
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string, img: string, details: string }) { }

  ngOnInit(): void {
  }

}

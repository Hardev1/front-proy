import { MatDialog } from "@angular/material/dialog";
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'info',
    templateUrl: './info.component.html',
  })

export class InfoComponent {
    
    constructor(
      public dialog: MatDialog,
    ) { }
    close() {
    this.dialog.closeAll();
  }}
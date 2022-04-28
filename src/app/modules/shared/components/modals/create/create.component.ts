import { MatDialog } from "@angular/material/dialog";
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'create',
    templateUrl: './create.component.html',
  })

export class InfoComponent {
    
    constructor(
      public dialog: MatDialog,
    ) { }
    close() {
    this.dialog.closeAll();
  }}
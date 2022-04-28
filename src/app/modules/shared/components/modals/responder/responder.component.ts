import { MatDialog } from "@angular/material/dialog";
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'responder',
    templateUrl: './responder.component.html',
  })

export class ResponderComponent {
    
    constructor(
      public dialog: MatDialog,
    ) { }
    close() {
    this.dialog.closeAll();
}}
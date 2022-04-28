import { MatDialog } from "@angular/material/dialog";
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'asignar',
    templateUrl: './asignar.component.html',
  })

export class AsignarComponent {
    
    constructor(
      public dialog: MatDialog,
    ) { }
    close() {
    this.dialog.closeAll();
}}
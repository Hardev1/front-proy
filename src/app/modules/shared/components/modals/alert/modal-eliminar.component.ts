import { MatDialog } from "@angular/material/dialog";
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'info',
    templateUrl: './modal-eliminar.component.html',
  })

export class ModalEliminarComponent {
    
    constructor(
      public dialog: MatDialog,
    ) { }
    close() {
    this.dialog.closeAll();
  }}
import {Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {ModalEliminarComponent} from '../../shared/components/modals/alert/modal-eliminar.component';

@Component({
  selector: 'app-eliminar-invitacion-ev',
  templateUrl: './eliminar-invitacion-ev.component.html',
  styleUrls: ['./eliminar-invitacion-ev.component.css']
})
export class EliminarInvitacionEvComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  openDialog() {
    this.dialog.open(ModalEliminarComponent);
  }

  ngOnInit(): void {
  }

}

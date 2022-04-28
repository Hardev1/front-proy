import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ResponderComponent } from '../../shared/components/modals/responder/responder.component';

@Component({
  selector: 'app-aceptada-invitacion-ev',
  templateUrl: './aceptada-invitacion-ev.component.html',
  styleUrls: ['./aceptada-invitacion-ev.component.css']
})
export class AceptadaInvitacionEvComponent implements OnInit {

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  openDialog() {
    this.dialog.open(ResponderComponent);
  }

}

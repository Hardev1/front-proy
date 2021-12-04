import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { InvitacionEvaluarModel } from 'src/app/models/parametros/invitacion-evaluar.model';
import { InvitacionEvaluarService } from 'src/app/services/parametros/invitacion-evaluar.service';
import { ModalEliminarComponent } from '../../shared/components/modals/alert/modal-eliminar.component';

@Component({
  selector: 'app-eliminar-invitacion-ev',
  templateUrl: './eliminar-invitacion-ev.component.html',
  styleUrls: ['./eliminar-invitacion-ev.component.css']
})
export class EliminarInvitacionEvComponent implements OnInit {

  id: number = 0;

  constructor(
    private router: Router,
    private service: InvitacionEvaluarService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.SearchRecord();
  }


  SearchRecord() {
    this.id = parseInt(this.route.snapshot.params["id"]);
    this.service.SearchRecord(this.id).subscribe({
      next: (data: InvitacionEvaluarModel) => {

      }
    });
  }

  RemoveRecord() {

    this.service.RemoveRecord(this.id).subscribe({
      next: (data: InvitacionEvaluarModel) => {
        this.router.navigate(["/invitacion-evaluar/listar-invitacion-evaluar"]);
      },
      error: (err: any) => {
      }
    });
  }

  close() {
    this.dialog.closeAll();
  }

}

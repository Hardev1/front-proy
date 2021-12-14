import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { EstadoSolicitudModel } from 'src/app/models/parametros/estado-solicitud.model';
import { EstadoSolicitudService } from 'src/app/services/parametros/estado-solicitud.service';

@Component({
  selector: 'app-eliminar-estado-sol',
  templateUrl: './eliminar-estado-sol.component.html',
  styleUrls: ['./eliminar-estado-sol.component.css']
})
export class EliminarEstadoSolComponent implements OnInit {

  id:any
  nombre: string | undefined = ""

  constructor(
    private router: Router,
    private service: EstadoSolicitudService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.SearchRecord()
  }

  SearchRecord(){
    let id = parseInt(this.route.snapshot.params["id"]);
    this.service.SearchRecord(id).subscribe({
      next: (data: EstadoSolicitudModel) => {
        if(data.id && data.nombre ){
        this.id = data.id
        this.nombre = data.nombre
      }
    }
    });
  }

  RemoveRecord() {
    this.service.RemoveRecord(this.id).subscribe({
      next: (data: EstadoSolicitudModel) => {
        this.router.navigate(["/parametros/listar-estado-solicitud"]);
      },
      error: (err: any) => {
      }
    });
  }

  close() {
    this.dialog.closeAll();
  }

}
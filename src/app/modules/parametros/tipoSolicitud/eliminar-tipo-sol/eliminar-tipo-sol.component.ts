import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoSolicitudModel } from 'src/app/models/parametros/tipo-solicitud.model';
import { TipoSolicitudService } from 'src/app/services/parametros/tipo-solicitud.service';

@Component({
  selector: 'app-eliminar-tipo-sol',
  templateUrl: './eliminar-tipo-sol.component.html',
  styleUrls: ['./eliminar-tipo-sol.component.css']
})
export class EliminarTipoSolComponent implements OnInit {

  id:any
  nombre: string | undefined = ""

  constructor(
    private router: Router,
    private service: TipoSolicitudService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.SearchRecord()
  }

  SearchRecord(){
    let id = parseInt(this.route.snapshot.params["id"]);
    this.service.SearchRecord(id).subscribe({
      next: (data: TipoSolicitudModel) => {
        if(data.id && data.nombre ){
        this.id = data.id
        this.nombre = data.nombre
      }
    }
    });
  }

  RemoveRecord() {
    this.service.RemoveRecord(this.id).subscribe({
      next: (data: TipoSolicitudModel) => {
        this.router.navigate(["/parametros/listar-tipo-solicitud"]);
      },
      error: (err: any) => {
      }
    });
  }

  close() {
    this.dialog.closeAll();
  }

}

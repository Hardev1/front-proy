import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitudProponenteModel } from 'src/app/models/parametros/solicitud-proponente.model';
import { SolicitudModel } from 'src/app/models/parametros/solicitud.model';
import { SolicitudProponenteService } from 'src/app/services/parametros/solicitud-proponente.service';
import { SolicitudService } from 'src/app/services/parametros/solicitud.service';

@Component({
  selector: 'app-eliminar-solicitud',
  templateUrl: './eliminar-solicitud.component.html',
  styleUrls: ['./eliminar-solicitud.component.css']
})
export class EliminarSolicitudComponent implements OnInit {

  id:any
  nombre: string | undefined = ""
  id_proponente: any
  id_solicitud_proponente: any

  constructor(
    private router: Router,
    private service: SolicitudService,
    private solicitudProponenteService: SolicitudProponenteService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.SearchRecord()
  }

  SearchRecord(){
    let id = parseInt(this.route.snapshot.params["id"]);
    this.service.SearchRecord(id).subscribe({
      next: (data: SolicitudModel) => {
        if(data.id && data.nombre_solicitud ){
        this.id = data.id
        this.nombre = data.nombre_solicitud
      }
    }
    });
    this.solicitudProponenteService.SearchRecord(id).subscribe({
      next: (data: SolicitudProponenteModel) => {
        if(data.id_solicitud && data.id_proponente){
        this.id_proponente = data.id_proponente
        this.id_solicitud_proponente = data.id
        console.log(data);
        
      }
    }
    });
  }

  RemoveRecord() {
    this.solicitudProponenteService.RemoveRecord(this.id_solicitud_proponente).subscribe({
      next: (data: SolicitudProponenteModel) => {
        this.service.RemoveRecord(this.id).subscribe({
          next: (data: SolicitudModel) => {
            this.router.navigate(["/solicitud/listar-solicitud"]);
          },
          error: (err: any) => {
          }
        });
      },
      error: (err: any) => {
      }
    });
  }

  close() {
    this.dialog.closeAll();
  }

}

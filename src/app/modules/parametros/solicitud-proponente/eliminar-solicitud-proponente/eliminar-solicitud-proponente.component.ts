import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitudProponenteModel } from 'src/app/models/parametros/solicitud-proponente.model';
import { SolicitudProponenteService } from 'src/app/services/parametros/solicitud-proponente.service';

@Component({
  selector: 'app-eliminar-solicitud-proponente',
  templateUrl: './eliminar-solicitud-proponente.component.html',
  styleUrls: ['./eliminar-solicitud-proponente.component.css']
})
export class EliminarSolicitudProponenteComponent implements OnInit {

  id:any

  constructor(
    private router: Router,
    private service: SolicitudProponenteService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.SearchRecord()
  }

  SearchRecord(){
    let id = parseInt(this.route.snapshot.params["id"]);
    this.service.SearchRecord(id).subscribe({
      next: (data: SolicitudProponenteModel) => {
        if(data.id){
        this.id = data.id
        }
    }
    });
  }

  RemoveRecord() {
    this.service.RemoveRecord(this.id).subscribe({
      next: (data: SolicitudProponenteModel) => {
        this.router.navigate(["/parametros/listar-solicitud-proponente"]);
      },
      error: (err: any) => {
      }
    });
  }

  close() {
    this.dialog.closeAll();
  }

}


import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitudComiteModel } from 'src/app/models/parametros/solicitud-comite.model';
import { SolicitudComiteService } from 'src/app/services/parametros/solicitud-comite.service';

@Component({
  selector: 'app-eliminar-solicitud-comite',
  templateUrl: './eliminar-solicitud-comite.component.html',
  styleUrls: ['./eliminar-solicitud-comite.component.css']
})
export class EliminarSolicitudComiteComponent implements OnInit {

  id:any

  constructor(
    private router: Router,
    private service: SolicitudComiteService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.SearchRecord()
  }

  SearchRecord(){
    let id = parseInt(this.route.snapshot.params["id"]);
    this.service.SearchRecord(id).subscribe({
      next: (data: SolicitudComiteModel) => {
        if(data.id){
        this.id = data.id
        }
    }
    });
  }

  RemoveRecord() {
    this.service.RemoveRecord(this.id).subscribe({
      next: (data: SolicitudComiteModel) => {
        this.router.navigate(["/parametros/listar-solicitud-comite"]);
      },
      error: (err: any) => {
      }
    });
  }

  close() {
    this.dialog.closeAll();
  }

}


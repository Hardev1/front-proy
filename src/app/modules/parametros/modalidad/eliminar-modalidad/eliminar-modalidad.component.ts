import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalidadModel } from 'src/app/models/parametros/modalidad.model';
import { ModalidadService } from 'src/app/services/parametros/modalidad.service';

@Component({
  selector: 'app-eliminar-modalidad',
  templateUrl: './eliminar-modalidad.component.html',
  styleUrls: ['./eliminar-modalidad.component.css']
})
export class EliminarModalidadComponent implements OnInit {

  id:any
  nombre: string | undefined = ""

  constructor(
    private router: Router,
    private service: ModalidadService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.SearchRecord()
  }

  SearchRecord(){
    let id = parseInt(this.route.snapshot.params["id"]);
    this.service.SearchRecord(id).subscribe({
      next: (data: ModalidadModel) => {
        if(data.id && data.nombre ){
        this.id = data.id
        this.nombre = data.nombre
      }
    }
    });
  }

  RemoveRecord() {
    this.service.RemoveRecord(this.id).subscribe({
      next: (data: ModalidadModel) => {
        this.router.navigate(["/parametros/listar-modalidad"]);
      },
      error: (err: any) => {
      }
    });
  }

  close() {
    this.dialog.closeAll();
  }

}

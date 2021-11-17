import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FacultadModel } from 'src/app/models/facultad.model';
import { FacultadService } from 'src/app/services/parametros/facultad.service';

@Component({
  selector: 'app-eliminar-facultad',
  templateUrl: './eliminar-facultad.component.html',
  styleUrls: ['./eliminar-facultad.component.css']
})
export class EliminarFacultadComponent implements OnInit {

//QUEDA FUNCIONAL SOLO FALTA DAR ESTILO A LOS HTML

  id: number = 0
  nombre: string = ""
  codigo: string = ""

  constructor(
    private router: Router,
    private service: FacultadService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.SearchRecord();
  }


  SearchRecord(){
    let id = parseInt(this.route.snapshot.params["id"]);
    this.service.SearchRecord(id).subscribe({
      next: (data: FacultadModel) => {
        if(data.id && data.nombre && data.codigo){
        this.id = data.id
        this.nombre = data.nombre
        this.codigo = data.codigo
      }
    }
    });
  }

  RemoveRecord() {
  
    this.service.RemoveRecord(this.id).subscribe({
      next: (data: FacultadModel) => {
        this.router.navigate(["/parametros/listar-facultad"]);
      },
      error: (err: any) => {
      }
    });
  }


}

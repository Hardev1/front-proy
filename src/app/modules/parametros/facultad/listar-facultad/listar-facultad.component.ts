import { Component, OnInit } from '@angular/core';
import { FacultadModel } from 'src/app/models/facultad.model';
import { FacultadService } from 'src/app/services/parametros/facultad.service';

@Component({
  selector: 'app-listar-facultad',
  templateUrl: './listar-facultad.component.html',
  styleUrls: ['./listar-facultad.component.css']
})
export class ListarFacultadComponent implements OnInit {

//QUEDA FUNCIONAL SOLO FALTA DAR ESTILO A LOS HTML

  listaFacultad: FacultadModel[] = []
  constructor(
    private facultadService: FacultadService
  ) { }

  ngOnInit(): void {
   this.GetRecordList();
  }

  GetRecordList() {
    this.facultadService.GetRecordList().subscribe({
      next: (data: FacultadModel[]) => {
        this.listaFacultad = data;
        console.log(this.listaFacultad);
        
      }
    });
  }

}

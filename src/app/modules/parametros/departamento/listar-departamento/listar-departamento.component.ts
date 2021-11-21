import { Component, OnInit } from '@angular/core';
import { DepartamentoModel } from 'src/app/models/departamento.model';
import { DepartamentoService } from 'src/app/services/parametros/departamento.service';

@Component({
  selector: 'app-listar-departamento',
  templateUrl: './listar-departamento.component.html',
  styleUrls: ['./listar-departamento.component.css']
})
export class ListarDepartamentoComponent implements OnInit {

  listaDepartamento: DepartamentoModel[] = []
  constructor(
    private departamentoService: DepartamentoService
  ) { }

  ngOnInit(): void {
   this.GetRecordList();
  }

  GetRecordList() {
    this.departamentoService.GetRecordList().subscribe({
      next: (data: DepartamentoModel[]) => {
        this.listaDepartamento = data;
        console.log(this.listaDepartamento);
        
      }
    });
  }


}

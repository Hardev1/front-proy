import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DepartamentoProponenteModel } from 'src/app/models/parametros/proponente-departamento.model';
import { DepartamentoProponenteService } from 'src/app/services/parametros/proponente-departamento.service';

@Component({
  selector: 'app-listar-proponente-departamento',
  templateUrl: './listar-proponente-departamento.component.html',
  styleUrls: ['./listar-proponente-departamento.component.css']
})
export class ListarProponenteDepartamentoComponent implements OnInit {


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  lista: DepartamentoProponenteModel[] = []
  dataSource = new MatTableDataSource<DepartamentoProponenteModel>(this.lista);
  displayedColumns: string[] = ['id', 'id_proponente', 'id_departamento', 'acciones'];
  columnas = [
    { titulo: "Id", name: "id" },
    { titulo: "ID Proponente", name: "id_proponente" },
    { titulo: "ID Departamento", name: "id_departamento" }
  ];
  
  constructor(
    private Service: DepartamentoProponenteService
  ) { }

  ngOnInit(): void {
    this.GetRecordList();
  }

  GetRecordList() {
    this.Service.GetRecordList().subscribe({
      next: (data: DepartamentoProponenteModel[]) => {
        this.dataSource.data = data; //Ejecuta el llenado de la tabla de Angular Material
      }
    });
  };

  ngAfterViewInit() { // Para definir por fuera del componente
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

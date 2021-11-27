import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ProponenteModel } from 'src/app/models/parametros/proponente.model';
import { ProponenteService } from 'src/app/services/parametros/proponente.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-listar-proponente',
  templateUrl: './listar-proponente.component.html',
  styleUrls: ['./listar-proponente.component.css']
})
export class ListarProponenteComponent implements OnInit{

  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  recordList: ProponenteModel[] = [];
  dataSource = new MatTableDataSource<ProponenteModel>(this.recordList); //Para llenar tabla de Angular Material
  displayedColumns: string[] = ['id', 'primer_nombre', 
  'documento', 'email', 'celular', 'tiene_un', 'fotografia', 'acciones'];
  columnas = [
    { titulo: "ID", name: "id" },
    { titulo: "Nombre del proponente", name: "primer_nombre"},
    { titulo: "Documento", name: "documento" },
    { titulo: "Email", name: "email" },
    { titulo: "Celular", name: "celular" },
    { titulo: "Fotografia", name: "fotografia" }
  ];
  colForaneas = [
    { titulo: "Tipo de Vinculación", name: "tiene_un" }
  ]

  constructor(
    private service: ProponenteService,
  ) { }

  ngAfterViewInit() { // Para definir por fuera del componente
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.GetRecordList()
  }

  GetRecordList() {
    this.service.GetRecordList().subscribe({
      next: (data: ProponenteModel[]) => {
        this.dataSource.data = data; //Ejecuta el llenado de la tabla de Angular Material
      }
    });
  };

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

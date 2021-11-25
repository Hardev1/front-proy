import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ComiteModel } from 'src/app/models/parametros/comite.model';
import { ComiteService } from 'src/app/services/parametros/comite.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-listar-comite',
  templateUrl: './listar-comite.component.html',
  styleUrls: ['./listar-comite.component.css']
})
export class ListarComiteComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  recordList: ComiteModel[] = [];
  dataSource = new MatTableDataSource<ComiteModel>(this.recordList); //Para llenar tabla de Angular Material
  displayedColumns: string[] = ['id', 'nombre', 'acciones'];
  columnas = [
    { titulo: "ID", name: "id" },
    { titulo: "Nombre de la comite", name: "nombre" }
  ];

  constructor(
    private service: ComiteService,
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
      next: (data: ComiteModel[]) => {
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

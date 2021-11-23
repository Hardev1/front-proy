import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { TipoVinculacionModel } from 'src/app/models/parametros/tipo-vinculacion.model';
import { TipoVinculacionService } from 'src/app/services/parametros/tipo-vinculacion.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-listar-tipo-vinc',
  templateUrl: './listar-tipo-vinc.component.html',
  styleUrls: ['./listar-tipo-vinc.component.css']
})
export class ListarTipoVincComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  recordList: TipoVinculacionModel[] = [];
  dataSource = new MatTableDataSource<TipoVinculacionModel>(this.recordList); //Para llenar tabla de Angular Material
  displayedColumns: string[] = ['id', 'nombre', 'acciones'];
  columnas = [
    { titulo: "ID", name: "id" },
    { titulo: "Nombre de la tipo-vinculacion", name: "nombre" }
  ];

  constructor(
    private service: TipoVinculacionService,
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
      next: (data: TipoVinculacionModel[]) => {
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

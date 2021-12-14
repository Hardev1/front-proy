import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RecordatorioModel } from 'src/app/models/parametros/recordatorio.model';
import { RecordatorioService } from 'src/app/services/parametros/recordatorio.service';

@Component({
  selector: 'app-listar-recordatorio-ev',
  templateUrl: './listar-recordatorio-ev.component.html',
  styleUrls: ['./listar-recordatorio-ev.component.css']
})
export class ListarRecordatorioEvComponent implements OnInit {
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  listaRecordatorio: RecordatorioModel[] = []
  dataSource = new MatTableDataSource<RecordatorioModel>(this.listaRecordatorio);
  displayedColumns: string[] = ['id', 'fecha', 'tipo_recordatorio', 'descripcion', 'acciones'];

  constructor(
    private recordatorioService: RecordatorioService
  ) { }

  ngOnInit(): void {
    this.GetRecordList();
  }

  GetRecordList() {
    this.recordatorioService.GetRecordList().subscribe({
      next: (data: RecordatorioModel[]) => {
        this.dataSource.data = data; //Ejecuta el llenado de la tabla de Angular Material
        console.log(data)
      }
    });
  };

  ngAfterViewInit() { // Para definir por fuera del componente
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}

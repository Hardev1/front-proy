import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SolicitudComiteModel } from 'src/app/models/parametros/solicitud-comite.model';
import { SolicitudComiteService } from 'src/app/services/parametros/solicitud-comite.service';
import { SolicitudService } from 'src/app/services/parametros/solicitud.service';

@Component({
  selector: 'app-listar-solicitud-comite',
  templateUrl: './listar-solicitud-comite.component.html',
  styleUrls: ['./listar-solicitud-comite.component.css']
})
export class ListarSolicitudComiteComponent implements OnInit, AfterViewInit {

  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  recordList: SolicitudComiteModel[] = []
  dataSource = new MatTableDataSource<SolicitudComiteModel>(this.recordList);
  displayedColumns: string[] = ['id', 'id_solicitud', 'id_comite', 'acciones'];
  columnas = [
    { titulo: "ID Comite", name: "id_comite" },
    { titulo: "ID Solicitud", name: "id_solicitud" },
  ];

  constructor(
    private service: SolicitudComiteService
  ) { }

  ngOnInit(): void {
    this.GetRecordList();
  }

  GetRecordList() {
    this.service.GetRecordList().subscribe({
      next: (data: SolicitudComiteModel[]) => {
        this.dataSource.data = data; 
        console.log(data)
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

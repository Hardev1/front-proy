import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { SolicitudModel } from 'src/app/models/parametros/solicitud.model';
import { SolicitudService } from 'src/app/services/parametros/solicitud.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ArchivosService } from 'src/app/services/parametros/archivos.service';

@Component({
  selector: 'app-listar-solicitud',
  templateUrl: './listar-solicitud.component.html',
  styleUrls: ['./listar-solicitud.component.css']
})
export class ListarSolicitudComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  recordList: SolicitudModel[] = [];
  dataSource = new MatTableDataSource<SolicitudModel>(this.recordList); //Para llenar tabla de Angular Material
  displayedColumns: string[] = ['id', 'fecha', 'nombre_solicitud', 'archivo', 'descripcion', 'posee_un', 'pertenece_a', 'tiene_una', 'acciones'];
  columnas = [
    { titulo: "ID", name: "id" },
    { titulo: "Nombre de la solicitud", name: "nombre_solicitud" },
    { titulo: "Archivo", name: "archivo" },
    { titulo: "Descripción", name: "descripcion" }
  ];
  colForaneas = [
    { titulo: "Estado de Solicitud", name: "posee_un" },
    { titulo: "Modalidad", name: "pertenece_a" },
    { titulo: "Linea de investigación", name: "tiene_una" }
  ]

  constructor(
    private service: SolicitudService,
    private archivosService: ArchivosService
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
      next: (data: SolicitudModel[]) => {
        console.log(data)
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

  DescargarFormato(data:string){   
    console.log(data);
    
      this.archivosService.DownloadFile(data).subscribe({
        next: (data: any) =>{
          console.log(data);
          
        },
        error: (err: any) => {
          console.log(err);
          
        }
      });
      
      }

}

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { JuradoLineaInvestigacionModel } from 'src/app/models/parametros/jurado-linea-investigacion.model';
import { JuradoLineaInvestigacionService } from 'src/app/services/parametros/jurado-linea-investigacion.service';

@Component({
  selector: 'app-listar-jurado-lineaInvestigacion',
  templateUrl: './listar-jurado-lineaInvestigacion.component.html',
  styleUrls: ['./listar-jurado-lineaInvestigacion.component.css']
})
export class ListarJuradoLineaInvestigacionComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  listaInvEvaluar: JuradoLineaInvestigacionModel[] = []
  dataSource = new MatTableDataSource<JuradoLineaInvestigacionModel>(this.listaInvEvaluar);
  displayedColumns: string[] = ['id', 'id_jurado', 'id_linea_investigacion', 'acciones'];
  columnas = [
    { titulo: "Jurado", name: "id_jurado" },
    { titulo: "Linea investigación", name: "id_linea_investigacion" },
  ];

  constructor(
    private service: JuradoLineaInvestigacionService
  ) { }

  ngOnInit(): void {
    this.GetRecordList();
  }

  GetRecordList() {
    this.service.GetRecordList().subscribe({
      next: (data: JuradoLineaInvestigacionModel[]) => {
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

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { JuradoModel } from 'src/app/models/parametros/jurado.model';
import { JuradoService } from 'src/app/services/parametros/jurado.service';

@Component({
  selector: 'app-listar-jurado',
  templateUrl: './listar-jurado.component.html',
  styleUrls: ['./listar-jurado.component.css']
})
export class ListarJuradoComponent implements OnInit {


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  listaJurado: JuradoModel[] = []
  dataSource = new MatTableDataSource<JuradoModel>(this.listaJurado);
  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'email', 'documento', 'telefono', 'fechaNacimiento', 'entidad', 'acciones'];
  columnas = [
    { titulo: "Id", name: "id" },
    { titulo: "Nombre", name: "nombre" },
    { titulo: "Apellido", name: "apellido" },
    { titulo: "Correo electrónico", name: "email" },
    { titulo: "Documento", name: "documento" },
    { titulo: "Celular", name: "telefono" },
    { titulo: "Entidad", name: "entidad" }
  ];
  
  constructor(
    private departamentoService: JuradoService
  ) { }

  ngOnInit(): void {
    this.GetRecordList();
  }

  GetRecordList() {
    this.departamentoService.GetRecordList().subscribe({
      next: (data: JuradoModel[]) => {
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

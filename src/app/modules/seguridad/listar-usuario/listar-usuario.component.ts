import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/shared/usuario.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.css']
})
export class ListarUsuarioComponent implements OnInit {

  //FALTARIA CREAR UN MODELO PARA LOS ESTADOS Y ASI PODER TRAER EL NOMBRE DEL ESTADO
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  recordList: UsuarioModel[] = [];
  dataSource = new MatTableDataSource<UsuarioModel>(this.recordList); //Para llenar tabla de Angular Material
  displayedColumns: string[] = ['nombre', 'apellido', 'documento', 'email', 'fechaNacimiento', 'telefono', 'estado', 'rols',  'acciones'];
  columnas = [
    { titulo: "Nombre", name: "nombre" },
    { titulo: "Apellido", name: "apellido" },
    { titulo: "Documento", name: "documento" },
    { titulo: "Correo electrónico", name: "email" },
    { titulo: "Teléfono", name: "telefono" },
    { titulo: "Estado del usuario", name: "estado" }
  ];

  constructor(
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
   this.GetRecordList();
  }

  GetRecordList() {
    this.usuarioService.GetRecordList().subscribe({
      next: (data: UsuarioModel[]) => {
        this.dataSource.data = data;
        console.log(this.dataSource.data);
      }
    });
  }
  
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

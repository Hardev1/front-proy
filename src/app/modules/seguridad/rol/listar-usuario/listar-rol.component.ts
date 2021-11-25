import { Component, OnInit, ViewChild } from '@angular/core';
import { RolData } from 'src/app/models/sesion/rol-data.model';
import { RolService } from 'src/app/services/shared/rol.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-listar-rol',
  templateUrl: './listar-rol.component.html',
  styleUrls: ['./listar-rol.component.css']
})
export class ListarRolComponent implements OnInit {

  //FALTARIA CREAR UN MODELO PARA LOS ESTADOS Y ASI PODER TRAER EL NOMBRE DEL ESTADO
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  recordList: RolData[] = [];
  dataSource = new MatTableDataSource<RolData>(this.recordList); //Para llenar tabla de Angular Material
  displayedColumns: string[] = ['nombre', 'acciones'];
  columnas = [
    { titulo: "Nombre del rol", name: "nombre" }
  ];

  constructor(
    private RolService: RolService
  ) { }

  ngOnInit(): void {
   this.GetRecordList();
  }

  GetRecordList() {
    this.RolService.GetRecordList().subscribe({
      next: (data: RolData[]) => {
        this.dataSource.data = data; // Se llena la tabla con los elementos
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

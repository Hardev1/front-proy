import { Component, OnInit, ViewChild } from '@angular/core';
import { RolService } from 'src/app/services/shared/rol.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RolModel } from 'src/app/modules/shared/modelos/rol.model';
@Component({
  selector: 'app-listar-rol',
  templateUrl: './listar-rol.component.html',
  styleUrls: ['./listar-rol.component.css']
})
export class ListarRolComponent implements OnInit {

  //FALTARIA CREAR UN MODELO PARA LOS ESTADOS Y ASI PODER TRAER EL NOMBRE DEL ESTADO
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  recordList: RolModel[] = [];
  dataSource = new MatTableDataSource<RolModel>(this.recordList); //Para llenar tabla de Angular Material
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
      next: (data: RolModel[]) => {
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

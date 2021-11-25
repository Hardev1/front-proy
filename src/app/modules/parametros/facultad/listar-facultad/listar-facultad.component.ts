import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FacultadModel } from 'src/app/models/facultad.model';
import { InfoComponent } from 'src/app/modules/shared/components/modals/info/info.component';
import { FacultadService } from 'src/app/services/parametros/facultad.service';

@Component({
  selector: 'app-listar-facultad',
  templateUrl: './listar-facultad.component.html',
  styleUrls: ['./listar-facultad.component.css']
})
export class ListarFacultadComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  listaFacultad: FacultadModel[] = []
  dataSource = new MatTableDataSource<FacultadModel>(this.listaFacultad); //Para llenar tabla de Angular Material
  displayedColumns: string[] = ['id', 'nombre', 'codigo', 'acciones'];
  columnas = [
    { titulo: "ID", name: "id" },
    { titulo: "Nombre", name: "nombre" },
    { titulo: "Código", name: "codigo" }
  ];

  constructor(
    private facultadService: FacultadService,
    public dialog: MatDialog
  ) { }

  ngAfterViewInit() { // Para definir por fuera del componente
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  

  ngOnInit(): void {
    this.GetRecordList();
  }

  GetRecordList() {
    this.facultadService.GetRecordList().subscribe({
      next: (data: FacultadModel[]) => {
        this.dataSource.data = data;

      }
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openDialog() {
    this.dialog.open(InfoComponent);
  }
}  





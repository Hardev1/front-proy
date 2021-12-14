import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InvitacionEvaluarModel } from 'src/app/models/parametros/invitacion-evaluar.model';
import { InvitacionEvaluarService } from 'src/app/services/parametros/invitacion-evaluar.service';

@Component({
  selector: 'app-listar-invitacion-ev',
  templateUrl: './listar-invitacion-aceptada.component.html',
  styleUrls: ['./listar-invitacion-aceptada.component.css']
})
export class ListarInvitacionAceptadaComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  listaInvitacion: InvitacionEvaluarModel[] = []
  dataSource = new MatTableDataSource<InvitacionEvaluarModel>(this.listaInvitacion);
  displayedColumns: string[] = ['id', 'tiene_una', 'pertenece_a', 'fecha_invitacion', 'fecha_respuesta', 'estado_invitacion', 'acciones'];
  columnas = [
    { titulo: "Fecha de invitacion", name: "fecha_invitacion" },
    { titulo: "Fecha de respuesta", name: "fecha_respuesta" },
  ];

  constructor(
    private invitacionEvaluarService: InvitacionEvaluarService
  ) { }

  ngOnInit(): void {
    this.Aceptadas();
  }

  Aceptadas() {
    this.invitacionEvaluarService.Aceptadas().subscribe({
      next: (data: InvitacionEvaluarModel[]) => {
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

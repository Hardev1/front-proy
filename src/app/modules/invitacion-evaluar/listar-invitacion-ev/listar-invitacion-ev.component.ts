import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InvitacionEvaluarModel } from 'src/app/models/parametros/invitacion-evaluar.model';
import { InvitacionEvaluarService } from 'src/app/services/parametros/invitacion-evaluar.service';

@Component({
  selector: 'app-listar-invitacion-ev',
  templateUrl: './listar-invitacion-ev.component.html',
  styleUrls: ['./listar-invitacion-ev.component.css']
})
export class ListarInvitacionEvComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  listaDepartamento: InvitacionEvaluarModel[] = []
  dataSource = new MatTableDataSource<InvitacionEvaluarModel>(this.listaDepartamento);
  displayedColumns: string[] = ['id', 'tiene_una', 'pertenece_a', 'acciones'];
  columnas = [
    { titulo: "Id", name: "id" },
    
  ];
  
  constructor(
    private invitacionEvaluarService: InvitacionEvaluarService
  ) { }

  ngOnInit(): void {
    this.GetRecordList();
  }

  GetRecordList() {
    this.invitacionEvaluarService.GetRecordList().subscribe({
      next: (data: InvitacionEvaluarModel[]) => {
        this.dataSource.data = data; //Ejecuta el llenado de la tabla de Angular Material
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

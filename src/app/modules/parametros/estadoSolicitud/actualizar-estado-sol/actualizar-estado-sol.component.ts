import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { EstadoSolicitudModel } from 'src/app/models/parametros/estado-solicitud.model';
import { EstadoSolicitudService } from 'src/app/services/parametros/estado-solicitud.service';
import { InfoComponent } from 'src/app/modules/shared/components/modals/info/info.component';

@Component({
  selector: 'app-actualizar-estado-sol',
  templateUrl: './actualizar-estado-sol.component.html',
  styleUrls: ['./actualizar-estado-sol.component.css']
})
export class ActualizarEstadoSolComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: EstadoSolicitudService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.CreateForm();
    this.SearchRecord();
  }

  CreateForm() {
    this.form = this.fb.group({
      id: ["", [Validators.required]],
      nombre: ["", [Validators.required]],
    });
  }

  get GetForm() {
    return this.form.controls;
  }

  SearchRecord(){
    let id = parseInt(this.route.snapshot.params["id"]);
    this.service.SearchRecord(id).subscribe({
      next: (data: EstadoSolicitudModel) => {
        this.form.controls.id.setValue(data.id);
        this.form.controls.nombre.setValue(data.nombre);
      }
    });
  }

  SaveRecord() {
    let model = new EstadoSolicitudModel();
    model.id = this.form.controls.id.value;
    model.nombre = this.form.controls.nombre.value;
    this.service.EditRecord(model).subscribe({
      next: (data: EstadoSolicitudModel) => {
        this.router.navigate(["/parametros/listar-estado-solicitud"]);
      },
      error: (err: any) => {
      }
    });
  }

  openDialog() {
    this.dialog.open(InfoComponent);
  }

}


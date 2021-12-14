import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EstadoSolicitudModel } from 'src/app/models/parametros/estado-solicitud.model';
import { EstadoSolicitudService } from 'src/app/services/parametros/estado-solicitud.service';
import { InfoComponent } from 'src/app/modules/shared/components/modals/info/info.component';

@Component({
  selector: 'app-crear-estado-sol',
  templateUrl: './crear-estado-sol.component.html',
  styleUrls: ['./crear-estado-sol.component.css']
})
export class CrearEstadoSolComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private EstadoSolicitudService: EstadoSolicitudService,
    public dialog: MatDialog
  ) { }

  CreateForm() {
    this.form = this.fb.group({
      nombre: ["", [Validators.required]]
    });
  }

  get GetForm() {
    return this.form.controls;
  }

  SaveRecord() {
    let model = new EstadoSolicitudModel();
    model.nombre = this.form.controls.nombre.value;
    
    this.EstadoSolicitudService.SaveRecord(model).subscribe({
      next: (data: EstadoSolicitudModel) => {
        this.router.navigate(["parametros/listar-estado-solicitud"]);
      },
      error: (err: any) => {
      }
    });
  }

  ngOnInit(): void {
    this.CreateForm();
  }

  openDialog() {
    this.dialog.open(InfoComponent);
  }

}

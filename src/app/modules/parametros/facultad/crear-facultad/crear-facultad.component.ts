import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FacultadModel } from 'src/app/models/facultad.model';
import { InfoComponent } from 'src/app/modules/shared/components/modals/create/create.component';
import { FacultadService } from 'src/app/services/parametros/facultad.service';

@Component({
  selector: 'app-crear-facultad',
  templateUrl: './crear-facultad.component.html',
  styleUrls: ['./crear-facultad.component.css']
})
export class CrearFacultadComponent implements OnInit {


//QUEDA FUNCIONAL SOLO FALTA DAR ESTILO A LOS HTML

  form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: FacultadService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.CreateForm();
  }

  CreateForm() {
    this.form = this.fb.group({
      nombre: ["", [Validators.required]],
      codigo: ["", [Validators.required]]
    });
  }

  SaveRecord() {
    let model = new FacultadModel();
    model.nombre = this.form.controls.nombre.value;
    model.codigo = this.form.controls.codigo.value;
    this.service.SaveRecord(model).subscribe({
      next: (data: FacultadModel) => {
        this.openDialog()
        this.router.navigate(["/parametros/listar-facultad"]);
      },
      error: (err: any) => {
      }
    });
  }

  openDialog() {
    this.dialog.open(InfoComponent);
  }

  get GetForm() {
    return this.form.controls;
  }

}





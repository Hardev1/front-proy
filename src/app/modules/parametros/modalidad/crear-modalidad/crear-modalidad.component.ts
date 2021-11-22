import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalidadModel } from 'src/app/models/parametros/modalidad.model';
import { ModalidadService } from 'src/app/services/parametros/modalidad.service';
import { InfoComponent } from 'src/app/modules/shared/components/modals/info/info.component';

@Component({
  selector: 'app-crear-modalidad',
  templateUrl: './crear-modalidad.component.html',
  styleUrls: ['./crear-modalidad.component.css']
})
export class CrearModalidadComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private ModalidadService: ModalidadService,
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
    let model = new ModalidadModel();
    model.nombre = this.form.controls.nombre.value;
    
    this.ModalidadService.SaveRecord(model).subscribe({
      next: (data: ModalidadModel) => {
        this.router.navigate(["parametros/listar-modalidad"]);
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

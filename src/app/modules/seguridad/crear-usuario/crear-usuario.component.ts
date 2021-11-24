import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/shared/usuario.service';
import { InfoComponent } from '../../shared/components/modals/info/info.component';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: UsuarioService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.CreateForm();
  }

  CreateForm() {
    this.form = this.fb.group({
      nombre: ["", [Validators.required]],
      apellido: ["", [Validators.required]],
      documento: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      telefono: ["", [Validators.required]],
      fechaNacimiento: ["", [Validators.required]]
  
    });
  }

  SaveRecord() {
    let model = new UsuarioModel();
    model.nombre = this.form.controls.nombre.value;
    model.apellido = this.form.controls.apellido.value;
    model.telefono = this.form.controls.telefono.value;
    model.email = this.form.controls.email.value;
    model.documento = this.form.controls.documento.value;
    model.fechaNacimiento = this.form.controls.fechaNacimiento.value;
    this.service.SaveRecord(model).subscribe({
      next: (data: UsuarioModel) => {
        this.router.navigate(["/seguridad/listar-usuario"]);
      },
      error: (err: any) => {
      }
    });
  }

  get GetForm() {
    return this.form.controls;
  }

  openDialog() {
    this.dialog.open(InfoComponent);
  }

}

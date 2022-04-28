import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TipoVinculacionModel } from 'src/app/models/parametros/tipo-vinculacion.model';
import { TipoVinculacionService } from 'src/app/services/parametros/tipo-vinculacion.service';
import { InfoComponent } from 'src/app/modules/shared/components/modals/create/create.component';

@Component({
  selector: 'app-crear-tipo-vinc',
  templateUrl: './crear-tipo-vinc.component.html',
  styleUrls: ['./crear-tipo-vinc.component.css']
})
export class CrearTipoVincComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private TipoVinculacionService: TipoVinculacionService,
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
    let model = new TipoVinculacionModel();
    model.nombre = this.form.controls.nombre.value;
    
    this.TipoVinculacionService.SaveRecord(model).subscribe({
      next: (data: TipoVinculacionModel) => {
        this.router.navigate(["parametros/listar-tipo-vinculacion"]);
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

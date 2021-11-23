import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoVinculacionModel } from 'src/app/models/parametros/tipo-vinculacion.model';
import { TipoVinculacionService } from 'src/app/services/parametros/tipo-vinculacion.service';
import { InfoComponent } from 'src/app/modules/shared/components/modals/info/info.component';

@Component({
  selector: 'app-actualizar-tipo-vinc',
  templateUrl: './actualizar-tipo-vinc.component.html',
  styleUrls: ['./actualizar-tipo-vinc.component.css']
})
export class ActualizarTipoVincComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: TipoVinculacionService,
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
      next: (data: TipoVinculacionModel) => {
        this.form.controls.id.setValue(data.id);
        this.form.controls.nombre.setValue(data.nombre);
      }
    });
  }

  SaveRecord() {
    let model = new TipoVinculacionModel();
    model.id = this.form.controls.id.value;
    model.nombre = this.form.controls.nombre.value;
    this.service.EditRecord(model).subscribe({
      next: (data: TipoVinculacionModel) => {
        this.router.navigate(["/parametros/listar-tipo-vinculacion"]);
      },
      error: (err: any) => {
      }
    });
  }

  openDialog() {
    this.dialog.open(InfoComponent);
  }

}

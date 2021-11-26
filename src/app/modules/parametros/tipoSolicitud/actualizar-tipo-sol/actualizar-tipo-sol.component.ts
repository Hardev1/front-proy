import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoSolicitudModel } from 'src/app/models/parametros/tipo-solicitud.model';
import { TipoSolicitudService } from 'src/app/services/parametros/tipo-solicitud.service';
import { InfoComponent } from 'src/app/modules/shared/components/modals/info/info.component';

@Component({
  selector: 'app-actualizar-tipo-sol',
  templateUrl: './actualizar-tipo-sol.component.html',
  styleUrls: ['./actualizar-tipo-sol.component.css']
})
export class ActualizarTipoSolComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: TipoSolicitudService,
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
      formato: ["", [Validators.required]],
    });
  }

  get GetForm() {
    return this.form.controls;
  }

  SearchRecord(){
    let id = parseInt(this.route.snapshot.params["id"]);
    this.service.SearchRecord(id).subscribe({
      next: (data: TipoSolicitudModel) => {
        this.form.controls.id.setValue(data.id);
        this.form.controls.nombre.setValue(data.nombre);
        this.form.controls.formato.setValue(data.formato);
      }
    });
  }

  SaveRecord() {
    let model = new TipoSolicitudModel();
    model.id = this.form.controls.id.value;
    model.nombre = this.form.controls.nombre.value;
    model.formato = this.form.controls.formato.value;
    this.service.EditRecord(model).subscribe({
      next: (data: TipoSolicitudModel) => {
        this.router.navigate(["/parametros/listar-tipo-solicitud"]);
      },
      error: (err: any) => {
      }
    });
  }

  openDialog() {
    this.dialog.open(InfoComponent);
  }

}

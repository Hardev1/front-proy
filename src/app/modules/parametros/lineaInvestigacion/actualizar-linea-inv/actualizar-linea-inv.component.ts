import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { LineaInvestigacionModel } from 'src/app/models/parametros/linea-investigacion.model';
import { LineaInvestigacionService } from 'src/app/services/parametros/linea-investigacion.service';
import { InfoComponent } from 'src/app/modules/shared/components/modals/info/info.component';


@Component({
  selector: 'app-actualizar-linea-inv',
  templateUrl: './actualizar-linea-inv.component.html',
  styleUrls: ['./actualizar-linea-inv.component.css']
})
export class ActualizarLineaInvComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: LineaInvestigacionService,
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
      next: (data: LineaInvestigacionModel) => {
        this.form.controls.id.setValue(data.id);
        this.form.controls.nombre.setValue(data.nombre);
      }
    });
  }

  SaveRecord() {
    let model = new LineaInvestigacionModel();
    model.id = this.form.controls.id.value;
    model.nombre = this.form.controls.nombre.value;
    this.service.EditRecord(model).subscribe({
      next: (data: LineaInvestigacionModel) => {
        this.router.navigate(["/parametros/listar-linea-investigacion"]);
      },
      error: (err: any) => {
      }
    });
  }

  openDialog() {
    this.dialog.open(InfoComponent);
  }

}

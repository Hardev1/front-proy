import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FacultadModel } from 'src/app/models/facultad.model';
import { InfoComponent } from 'src/app/modules/shared/components/modals/info/info.component';
import { FacultadService } from 'src/app/services/parametros/facultad.service';


@Component({
  selector: 'app-actualizar-facultad',
  templateUrl: './actualizar-facultad.component.html',
  styleUrls: ['./actualizar-facultad.component.css']
})
export class ActualizarFacultadComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: FacultadService,
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
      codigo: ["", [Validators.required]]
    });
  }

  SearchRecord(){
    let id = parseInt(this.route.snapshot.params["id"]);
    this.service.SearchRecord(id).subscribe({
      next: (data: FacultadModel) => {
        this.form.controls.id.setValue(data.id);
        this.form.controls.nombre.setValue(data.nombre);
        this.form.controls.codigo.setValue(data.codigo);
      }
    });
  }

  SaveRecord() {
    let model = new FacultadModel();
    model.id = this.form.controls.id.value;
    model.nombre = this.form.controls.nombre.value;
    model.codigo = this.form.controls.codigo.value;
    this.service.EditRecord(model).subscribe({
      next: (data: FacultadModel) => {
        this.router.navigate(["/parametros/listar-facultad"]);
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


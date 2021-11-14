import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FacultadModel } from 'src/app/models/facultad.model';
import { FacultadService } from 'src/app/services/shared/facultad.service';


@Component({
  selector: 'app-actualizar-facultad',
  templateUrl: './actualizar-facultad.component.html',
  styleUrls: ['./actualizar-facultad.component.css']
})
export class ActualizarFacultadComponent implements OnInit {

//QUEDA FUNCIONAL SOLO FALTA DAR ESTILO A LOS HTML

  form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: FacultadService,
    private route: ActivatedRoute
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
    model.nombre = this.form.controls.nombre.value;
    model.id = this.form.controls.id.value;
    model.codigo = this.form.controls.codigo.value;
    this.service.EditRecord(model).subscribe({
      next: (data: FacultadModel) => {
        this.router.navigate(["/parametros/listar-facultad"]);
      },
      error: (err: any) => {
      }
    });
  }

}

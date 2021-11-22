import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartamentoModel } from 'src/app/models/departamento.model';
import { FacultadModel } from 'src/app/models/facultad.model';
import { DepartamentoService } from 'src/app/services/parametros/departamento.service';
import { FacultadService } from 'src/app/services/parametros/facultad.service';

@Component({
  selector: 'app-actualizar-departamento',
  templateUrl: './actualizar-departamento.component.html',
  styleUrls: ['./actualizar-departamento.component.css']
})
export class ActualizarDepartamentoComponent implements OnInit {

  recordList: FacultadModel[] = []
  form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: DepartamentoService,
    private facultadService: FacultadService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.CreateForm();
    this.SearchRecord();
    this.GetRecordList()
  }

  CreateForm() {
    this.form = this.fb.group({
      id: ["", [Validators.required]],
      nombre: ["", [Validators.required]],
      facultadId: ["", [Validators.required]]
    });
  }

  SearchRecord(){
    let id = parseInt(this.route.snapshot.params["id"]);
    this.service.SearchRecord(id).subscribe({
      next: (data: DepartamentoModel) => {
        this.form.controls.id.setValue(data.id);
        this.form.controls.nombre.setValue(data.nombre);
        this.form.controls.facultadId.setValue(data.id_facultad);
      }
    });
  }

  SaveRecord() {
    let model = new DepartamentoModel();
    model.nombre = this.form.controls.nombre.value;
    model.id = this.form.controls.id.value;
    model.id_facultad = parseInt(this.form.controls.facultadId.value);
    this.service.EditRecord(model).subscribe({
      next: (data: DepartamentoModel) => {
        this.router.navigate(["/parametros/listar-departamento"]);
      },
      error: (err: any) => {
      }
    });
  }

  GetRecordList() {
    this.facultadService.GetRecordList().subscribe({
      next: (data: FacultadModel[]) => {
        this.recordList = data;
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DepartamentoModel } from 'src/app/models/departamento.model';
import { FacultadModel } from 'src/app/models/facultad.model';
import { DepartamentoService } from 'src/app/services/shared/departamento.service';
import { FacultadService } from 'src/app/services/shared/facultad.service';

@Component({
  selector: 'app-crear-departamento',
  templateUrl: './crear-departamento.component.html',
  styleUrls: ['./crear-departamento.component.css']
})
export class CrearDepartamentoComponent implements OnInit {

//QUEDA FUNCIONAL SOLO FALTA DAR ESTILO A LOS HTML

  recordList: FacultadModel[] = []
  form: FormGroup = new FormGroup({})

  constructor(
    private service: DepartamentoService,
    private fb: FormBuilder,
    private facultadService: FacultadService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.GetRecordList();
    this.CrearFormulario();
  }

  CrearFormulario() {
    this.form = this.fb.group({
      facultadId: ["", [Validators.required]],
      nombre: ["", [Validators.required]]
         })
  }

  SaveRecord() {
    let model = new DepartamentoModel();
    model.nombre = this.form.controls.nombre.value;
    model.id_facultad = parseInt(this.form.controls.facultadId.value);
    this.service.SaveRecord(model).subscribe({
      next: (data: DepartamentoModel) => {
        console.log(data)
      },
      error: (err: any) => {
      }
    });
  }


  get GetForm() {
    return this.form.controls;
  }

  GetRecordList() {
    this.facultadService.GetRecordList().subscribe({
      next: (data: FacultadModel[]) => {
        this.recordList = data;
      }
    });
  }

}

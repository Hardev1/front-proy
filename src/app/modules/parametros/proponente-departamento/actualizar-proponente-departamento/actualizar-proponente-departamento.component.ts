import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartamentoProponenteModel } from 'src/app/models/parametros/proponente-departamento.model';
import { ProponenteModel } from 'src/app/models/parametros/proponente.model';
import { InfoComponent } from 'src/app/modules/shared/components/modals/info/info.component';
import { DepartamentoProponenteService } from 'src/app/services/parametros/proponente-departamento.service';
import { ProponenteService } from 'src/app/services/parametros/proponente.service';
import { SolicitudService } from 'src/app/services/parametros/solicitud.service';
import { CrearProponenteDepartamentoComponent } from '../crear-proponente-departamento/crear-proponente-departamento.component';

@Component({
  selector: 'app-actualizar-proponente-departamento',
  templateUrl: './actualizar-proponente-departamento.component.html',
  styleUrls: ['./actualizar-proponente-departamento.component.css']
})
export class ActualizarProponenteDepartamentoComponent implements OnInit {

  recordList: ProponenteModel[] = []
  form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: DepartamentoProponenteService,
    private proponenteService: ProponenteService,
    private solicitudService: SolicitudService,
    private route: ActivatedRoute,
    public dialog: MatDialog
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
      id_proponente: ["", [Validators.required]],
      id_departamento: ["", [Validators.required]]
    });
  }

  SearchRecord(){
    let id = parseInt(this.route.snapshot.params["id"]);
    this.service.SearchRecord(id).subscribe({
      next: (data: DepartamentoProponenteModel) => {
        this.form.controls.id.setValue(data.id);
        this.form.controls.id_proponente.setValue(`${data.id_proponente}`);
        this.form.controls.id_departamento.setValue(`${data.id_departamento}`);
      }
    });
  }

  SaveRecord() {
    let model = new DepartamentoProponenteModel();
    model.id = this.form.controls.id.value;
    model.id_proponente = parseInt(this.form.controls.id_proponente.value);
    model.id_departamento = parseInt(this.form.controls.id_departamento.value);
    this.service.EditRecord(model).subscribe({
      next: (data: DepartamentoProponenteModel) => {
        this.router.navigate(["/parametros/listar-proponente-departamento"]);
      },
      error: (err: any) => {
      }
    });
  }

  GetRecordList() {
    this.proponenteService.GetRecordList().subscribe({
      next: (data: ProponenteModel[]) => {
        this.recordList = data;
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
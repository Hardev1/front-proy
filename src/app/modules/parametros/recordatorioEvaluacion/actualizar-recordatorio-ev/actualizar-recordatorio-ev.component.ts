import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { RecordatorioModel } from 'src/app/models/parametros/recordatorio.model';
import { InvitacionEvaluarModel } from 'src/app/models/parametros/invitacion-evaluar.model';
import { InvitacionEvaluarService } from 'src/app/services/parametros/invitacion-evaluar.service';
import { RecordatorioService } from 'src/app/services/parametros/recordatorio.service';
import { InfoComponent } from '../../../shared/components/modals/info/info.component';
import { GeneralData } from 'src/app/config/general-data';

@Component({
  selector: 'app-actualizar-recordatorio-ev',
  templateUrl: './actualizar-recordatorio-ev.component.html',
  styleUrls: ['./actualizar-recordatorio-ev.component.css']
})
export class ActualizarRecordatorioEvComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  estadoSolList: InvitacionEvaluarModel[] = []

  formFile: FormGroup = new FormGroup({});
  url: string= GeneralData.BUSSINESS_URL;
  uploadedFilename?: string = "";
  uploadedFile: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: RecordatorioService,
    private route: ActivatedRoute,
    private estadoSolService: InvitacionEvaluarService,
    public dialog: MatDialog
  ) { } 

  ngOnInit(): void {
    this.CreateForm();
    this.GetRecordList();
    this.SearchRecord();
  }

  CreateForm() {
    this.form = this.fb.group({
      id: ["", [Validators.required]],
      fecha: ["", [Validators.required]],
      hora: ["", [Validators.required]],
      tipo_recordatorio: ["", [Validators.required]],
      descripcion: ["", [Validators.required]],
      id_invitacion_evaluar: ["", [Validators.required]],
    });
  }

  get GetForm() {
    return this.form.controls;
  }

  GetRecordList() {
    this.estadoSolService.GetRecordList().subscribe({
      next: (data: InvitacionEvaluarModel[]) => {
        this.estadoSolList = data;
      }
    });
  }

  SearchRecord(){
    let id = parseInt(this.route.snapshot.params["id"]);
    this.service.SearchRecord(id).subscribe({
      next: (data: RecordatorioModel) => {
        this.form.controls.id.setValue(data.id);
        this.form.controls.fecha.setValue(data.fecha);
        this.form.controls.tipo_recordatorio.setValue(data.tipo_recordatorio);
        this.form.controls.descripcion.setValue(data.descripcion);
        this.form.controls.id_invitacion_evaluar.setValue(`${data.id_invitacion_evaluar}`);
      }
    });
  }

  SaveRecord() {
    let model = new RecordatorioModel();
    model.id = this.form.controls.id.value;
    model.fecha = this.form.controls.fecha.value;
    model.tipo_recordatorio = this.form.controls.tipo_recordatorio.value;
    model.descripcion = this.form.controls.descripcion.value;
    model.id_invitacion_evaluar = parseInt(this.form.controls.id_invitacion_evaluar.value);
    this.service.EditRecord(model).subscribe({
      next: (data: RecordatorioModel) => {
        this.router.navigate(["/recordatorio/listar-recordatorio"]);
      },
      error: (err: any) => {
      }
    });
  }

  openDialog() {
    this.dialog.open(InfoComponent);
  }
}

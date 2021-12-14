import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { InvitacionEvaluarModel } from 'src/app/models/parametros/invitacion-evaluar.model';
import { RecordatorioModel } from 'src/app/models/parametros/recordatorio.model';
import { InfoComponent } from 'src/app/modules/shared/components/modals/info/info.component';
import { InvitacionEvaluarService } from 'src/app/services/parametros/invitacion-evaluar.service';
import { RecordatorioService } from 'src/app/services/parametros/recordatorio.service';

@Component({
  selector: 'app-correo-recordatorio-ev',
  templateUrl: './correo-recordatorio-ev.component.html',
  styleUrls: ['./correo-recordatorio-ev.component.css']
})
export class CorreoRecordatorioEvComponent implements OnInit {

  recordList: InvitacionEvaluarModel[] = []
  form: FormGroup = new FormGroup({})
  id: any;

  constructor(
    private invitacionService: InvitacionEvaluarService,
    private fb: FormBuilder,
    private recordatorioService: RecordatorioService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    //this.SearchRecord();
    this.GetRecordList();
    this.CrearFormulario();
  }

  CrearFormulario() {
    this.form = this.fb.group({
      id: ["", [Validators.required]],
      id_invitacion_evaluar: ["", [Validators.required]],
    })
  }

  /* SearchRecord() {
    this.id = parseInt(this.route.snapshot.params["id"]);
    this.recordatorioService.SearchRecord(this.id).subscribe({
      next: (data: RecordatorioModel) => {
        console.log(data)
        this.form.controls.id_invitacion_evaluar.setValue(data.id_invitacion_evaluar);
      }
    });
  } */

  SaveRecord() {
    let recModel = new RecordatorioModel();
    recModel.id_invitacion_evaluar = parseInt(this.form.controls.id_invitacion_evaluar.value);
    this.recordatorioService.TextReminder(recModel).subscribe({
      next: (data: RecordatorioModel) => {
        console.log(data)
        this.router.navigate(["/parametros/listar-recordatorio-evaluacion"])
      },
      error: (err: any) => {
      }
    });
  }


  get GetForm() {
    return this.form.controls;
  }

  GetRecordList() {
    this.id = parseInt(this.route.snapshot.params["id"]);
    this.invitacionService.Aceptadas().subscribe({
      next: (data: InvitacionEvaluarModel[]) => {
        this.recordList = data;
        console.log(data)
      }
    });
  }

  openDialog() {
    this.dialog.open(InfoComponent);
  }

}

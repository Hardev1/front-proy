import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { RecordatorioModel } from 'src/app/models/parametros/recordatorio.model';
import { InfoComponent } from 'src/app/modules/shared/components/modals/info/info.component';
import { InvitacionEvaluarService } from 'src/app/services/parametros/invitacion-evaluar.service';
import { RecordatorioService } from 'src/app/services/parametros/recordatorio.service';
import { InvitacionEvaluarModel } from 'src/app/models/parametros/invitacion-evaluar.model';

@Component({
  selector: 'app-llamada-recordatorio-ev',
  templateUrl: './llamada-recordatorio-ev.component.html',
  styleUrls: ['./llamada-recordatorio-ev.component.css']
})
export class LlamadaRecordatorioEvComponent implements OnInit {

  recordList: InvitacionEvaluarModel[] = []
  form: FormGroup = new FormGroup({})
  id: number = 0;

  constructor(
    private invitacionService: InvitacionEvaluarService,
    private fb: FormBuilder,
    private recordatorioService: RecordatorioService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.GetRecordList();
    this.CrearFormulario();
    this.SearchRecord();
  }

  CrearFormulario() {
    this.form = this.fb.group({
      descripcion: ["", []],
      id: ["", [Validators.required]],
      id_invitacion_evaluar: ["", [Validators.required]],
    })
  }

  SearchRecord() {
    this.id = parseInt(this.route.snapshot.params["id"]);
    this.recordatorioService.SearchRecord(this.id).subscribe({
      next: (data: RecordatorioModel) => {
        this.form.controls.id.setValue(data.id);
        this.form.controls.descripcion.setValue(data.descripcion); 
        this.form.controls.id_invitacion_evaluar.setValue(`${data.id_invitacion_evaluar}`); 
      }
    });
  }

  SaveRecord() {
    let model = new RecordatorioModel();
    model.id = this.id;
    model.descripcion = this.form.controls.descripcion.value;
    model.id_invitacion_evaluar = parseInt(this.form.controls.invitacionId.value);
    this.recordatorioService.CallReminder(model).subscribe({
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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ProponenteModel } from 'src/app/models/parametros/proponente.model';
import { SolicitudProponenteModel } from 'src/app/models/parametros/solicitud-proponente.model';
import { InfoComponent } from 'src/app/modules/shared/components/modals/info/info.component';
import { ProponenteService } from 'src/app/services/parametros/proponente.service';
import { SolicitudProponenteService } from 'src/app/services/parametros/solicitud-proponente.service';
import { SolicitudService } from 'src/app/services/parametros/solicitud.service';

@Component({
  selector: 'app-actualizar-solicitud-proponente',
  templateUrl: './actualizar-solicitud-proponente.component.html',
  styleUrls: ['./actualizar-solicitud-proponente.component.css']
})
export class ActualizarSolicitudProponenteComponent implements OnInit {

  recordList: ProponenteModel[] = []
  form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: SolicitudProponenteService,
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
      id_solicitud: ["", [Validators.required]]
    });
  }

  SearchRecord(){
    let id = parseInt(this.route.snapshot.params["id"]);
    this.service.SearchRecord(id).subscribe({
      next: (data: SolicitudProponenteModel) => {
        this.form.controls.id.setValue(data.id);
        this.form.controls.id_proponente.setValue(`${data.id_proponente}`);
        this.form.controls.id_solicitud.setValue(`${data.id_solicitud}`);
      }
    });
  }

  SaveRecord() {
    let model = new SolicitudProponenteModel();
    model.id = this.form.controls.id.value;
    model.id_proponente = parseInt(this.form.controls.id_proponente.value);
    model.id_solicitud = parseInt(this.form.controls.id_solicitud.value);
    this.service.EditRecord(model).subscribe({
      next: (data: SolicitudProponenteModel) => {
        this.router.navigate(["/solicitud/listar-solicitud"]);
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

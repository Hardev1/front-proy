import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InvitacionEvaluarModel } from 'src/app/models/parametros/invitacion-evaluar.model';
import { InvitacionEvaluarService } from 'src/app/services/parametros/invitacion-evaluar.service';

@Component({
  selector: 'app-responder-invitacion-ev',
  templateUrl: './responder-invitacion-ev.component.html',
  styleUrls: ['./responder-invitacion-ev.component.css']
})
export class ResponderInvitacionEvComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  observaciones: string = "";
  fechaActual = new Date().toISOString();
  respuesta: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: InvitacionEvaluarService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.CreateForm();
    this.SearchRecord()
  }

  CreateForm() {
    this.form = this.fb.group({
      id_jurado: ["", [Validators.required]],
      id_solicitud: ["", [Validators.required]],
      id: ["", [Validators.required]],
      fecha_invitacion: ["", [Validators.required]],
      fecha_respuesta: ["", [Validators.required]],
      estado_invitacion: ["", [Validators.required]],
      hash: ["", [Validators.required]],
    });
  }

  get GetForm() {
    return this.form.controls;
  }

  SearchRecord() {
    let id = parseInt(this.route.snapshot.params["id"]);
    this.service.SearchRecord(id).subscribe({
      next: (data: InvitacionEvaluarModel) => {
        this.form.controls.id.setValue(data.id);
        this.form.controls.hash.setValue(data.hash);
        this.form.controls.fecha_invitacion.setValue(data.fecha_invitacion);
        this.form.controls.fecha_respuesta.setValue(this.fechaActual);
        this.form.controls.estado_invitacion.setValue(data.estado_invitacion);
        this.form.controls.id_jurado.setValue(data.id_jurado);
        this.form.controls.id_solicitud.setValue(data.id_solicitud);
      }
    });
  }

  AcceptRecord() {
    let model = new InvitacionEvaluarModel();
    model.id_jurado = parseInt(this.form.controls.id_jurado.value);
    model.id_solicitud = parseInt(this.form.controls.id_solicitud.value);
    model.id = this.form.controls.id.value;
    model.fecha_invitacion = this.form.controls.fecha_invitacion.value;
    model.fecha_respuesta = this.form.controls.fecha_respuesta.value;
    model.estado_invitacion = this.form.controls.estado_invitacion.value;
    model.observaciones = this.observaciones;
    model.hash = this.form.controls.hash.value;
    this.service.AcceptRecord(model).subscribe({
      next: (data: InvitacionEvaluarModel) => {
        this.respuesta = true;
      },
      error: (err: any) => {
      }
    });
  }

  RejectRecord() {
    let model = new InvitacionEvaluarModel();
    model.id_jurado = parseInt(this.form.controls.id_jurado.value);
    model.id_solicitud = parseInt(this.form.controls.id_solicitud.value);
    model.id = this.form.controls.id.value;
    model.fecha_invitacion = this.form.controls.fecha_invitacion.value;
    model.fecha_respuesta = this.fechaActual;
    model.estado_invitacion = this.form.controls.estado_invitacion.value;
    model.observaciones = this.observaciones;
    model.hash = this.form.controls.hash.value;
    this.service.RejectRecord(model).subscribe({
      next: (data: InvitacionEvaluarModel) => {
        this.respuesta = true;
      },
      error: (err: any) => {
      }
    });
  }

  captureText(event: Event) {
    this.observaciones = (<HTMLTextAreaElement>event.target).value;
  }

  cerrar(){
    close();
  }

}

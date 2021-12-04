import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { InvitacionEvaluarConceptualModel } from 'src/app/models/parametros/invitacion-evaluar-conceptual.model';
import { JuradoModel } from 'src/app/models/parametros/jurado.model';
import { SolicitudModel } from 'src/app/models/parametros/solicitud.model';
import { InvitacionEvaluarService } from 'src/app/services/parametros/invitacion-evaluar.service';
import { JuradoService } from 'src/app/services/parametros/jurado.service';
import { SolicitudService } from 'src/app/services/parametros/solicitud.service';
import { InfoComponent } from '../../shared/components/modals/info/info.component';

@Component({
  selector: 'app-crear-invitacion-ev',
  templateUrl: './crear-invitacion-ev.component.html',
  styleUrls: ['./crear-invitacion-ev.component.css']
})
export class CrearInvitacionEvComponent implements OnInit {

  juradoList: JuradoModel[] = []
  juradosSelected: number[] = [];
  solicitudesSelected: number[] = [];
  solicitudList: SolicitudModel[] = []
  form: FormGroup = new FormGroup({})
  id: number = 0;
  isClose?: boolean;

  constructor(
    private fb: FormBuilder,
    private invitacionEvaluarService: InvitacionEvaluarService,
    private juradoService: JuradoService,
    private solicitudService: SolicitudService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.GetRecordList();
    this.CrearFormulario();
  }

  CrearFormulario() {
    this.form = this.fb.group({
      jurados: [[], [Validators.required]],
      solicitudes: [[], [Validators.required]],
    });
  }

  SaveRecord() {
    let model = new InvitacionEvaluarConceptualModel();
    model.jurados = this.juradosSelected;
    model.solicitudes = this.solicitudesSelected;
    console.log(model)
    this.invitacionEvaluarService.SaveRecord(model).subscribe({
      next: (data: InvitacionEvaluarConceptualModel) => {
        this.router.navigate(["/invitacion-evaluar/listar-invitacion-evaluar"])
      },
      error: (err: any) => {
      }
    });
  }


  get GetForm() {
    return this.form.controls;
  }

  GetRecordList() {
    this.juradoService.GetRecordList().subscribe({
      next: (data: JuradoModel[]) => {
        this.juradoList = data;
      }
    });
    this.solicitudService.GetRecordList().subscribe({
      next: (data: SolicitudModel[]) => {
        this.solicitudList = data;
      }
    });
  }

  openDialog() {
    this.dialog.open(InfoComponent);
  }

  juradoChange(event:any) {
    this.isClose = false;
    if(!event) {
      this.isClose = true;
      this.juradosSelected = this.arrayStringToNumber(this.form.controls.jurados.value);
    }
  }
  solicitudChange(event:any) {
    this.isClose = false;
    if(!event) {
      this.isClose = true;
      this.solicitudesSelected = this.arrayStringToNumber(this.form.controls.solicitudes.value);
    }
  }

  arrayStringToNumber(array:[]){
    return array.map(i=>Number(i))
  }
}

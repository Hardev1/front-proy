import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ProponenteModel } from 'src/app/models/parametros/proponente.model';
import { SolicitudProponenteModel } from 'src/app/models/parametros/solicitud-proponente.model';
import { SolicitudModel } from 'src/app/models/parametros/solicitud.model';
import { InfoComponent } from 'src/app/modules/shared/components/modals/info/info.component';
import { ProponenteService } from 'src/app/services/parametros/proponente.service';
import { SolicitudProponenteService } from 'src/app/services/parametros/solicitud-proponente.service';

@Component({
  selector: 'app-crear-solicitud-poponente',
  templateUrl: './crear-solicitud-proponente.component.html',
  styleUrls: ['./crear-solicitud-proponente.component.css']
})
export class CrearSolicitudProponenteComponent implements OnInit {

//QUEDA FUNCIONAL SOLO FALTA DAR ESTILO A LOS HTML

  recordList: ProponenteModel [] = []
  form: FormGroup = new FormGroup({})
  id: number = 0;

  constructor(
    private fb: FormBuilder,
    private proponenteService: ProponenteService,
    private service: SolicitudProponenteService,
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
      id_solicitud: ["", [Validators.required]],
      id_proponente: ["", [Validators.required]]
         })
  }

  SaveRecord() {
    let model = new SolicitudProponenteModel ();
    model.id_solicitud = parseInt(this.form.controls.id_solicitud.value);
    model.id_proponente = parseInt(this.form.controls.id_proponente.value);
    this.service.SaveRecord(model).subscribe({
      next: (data: SolicitudProponenteModel) => {
        console.log(data)
        this.router.navigate(["/solicitud/listar-solicitud"])   
      },
      error: (err: any) => {
      }
    });
  }


  get GetForm() {
    return this.form.controls;
  }

  GetRecordList() {
    this.proponenteService.GetRecordList().subscribe({
      next: (data: ProponenteModel[]) => {
        this.recordList = data;
      }
    });
  }

  openDialog() {
    this.dialog.open(InfoComponent);
  }


  SearchRecord(){
    let id = parseInt(this.route.snapshot.params["id_solicitud"]);
    console.log(id);
    
    this.service.SearchRecord(id).subscribe({
      next: (data: SolicitudModel) => {
        this.form.controls.id_solicitud.setValue(`${data.id}`);
      }
    });
  }

}

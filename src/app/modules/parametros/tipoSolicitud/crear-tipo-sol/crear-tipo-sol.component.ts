import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TipoSolicitudModel } from 'src/app/models/parametros/tipo-solicitud.model';
import { TipoSolicitudService } from 'src/app/services/parametros/tipo-solicitud.service';
import { InfoComponent } from 'src/app/modules/shared/components/modals/create/create.component';
import { GeneralData } from 'src/app/config/general-data';
import { UploadedFileModel } from 'src/app/models/parametros/file.model';
import { ArchivosService } from 'src/app/services/parametros/archivos.service';

@Component({
  selector: 'app-crear-tipo-sol',
  templateUrl: './crear-tipo-sol.component.html',
  styleUrls: ['./crear-tipo-sol.component.css']
})
export class CrearTipoSolComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  url: string= GeneralData.BUSSINESS_URL;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private TipoSolicitudService: TipoSolicitudService,
    public dialog: MatDialog
  ) { }

  CreateForm() {
    this.form = this.fb.group({
      nombre: ["", [Validators.required]],
    });
  }

  get GetForm() {
    return this.form.controls;
  }

  SaveRecord() {
    let model = new TipoSolicitudModel();
    model.nombre = this.form.controls.nombre.value;
    
    this.TipoSolicitudService.SaveRecord(model).subscribe({
      next: (data: TipoSolicitudModel) => {
        this.router.navigate(["parametros/listar-tipo-solicitud"]);
      },
      error: (err: any) => {
      }
    });
  }

  ngOnInit(): void {
    this.CreateForm();
  }

  openDialog() {
    this.dialog.open(InfoComponent);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LineaInvestigacionModel } from 'src/app/models/parametros/linea-investigacion.model';
import { LineaInvestigacionService } from 'src/app/services/parametros/linea-investigacion.service';
import { InfoComponent } from 'src/app/modules/shared/components/modals/info/info.component';

@Component({
  selector: 'app-crear-linea-inv',
  templateUrl: './crear-linea-inv.component.html',
  styleUrls: ['./crear-linea-inv.component.css']
})
export class CrearLineaInvComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private LineaInvestigacionService: LineaInvestigacionService,
    public dialog: MatDialog
  ) { }

  CreateForm() {
    this.form = this.fb.group({
      nombre: ["", [Validators.required]]
    });
  }

  get GetForm() {
    return this.form.controls;
  }

  SaveRecord() {
    let model = new LineaInvestigacionModel();
    model.nombre = this.form.controls.nombre.value;
    
    this.LineaInvestigacionService.SaveRecord(model).subscribe({
      next: (data: LineaInvestigacionModel) => {
        this.router.navigate(["parametros/listar-linea-investigacion"]);
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

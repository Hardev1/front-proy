import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { InfoComponent } from 'src/app/modules/shared/components/modals/info/info.component';
import { RolModel } from 'src/app/modules/shared/modelos/rol.model';
import { RolService } from 'src/app/services/shared/rol.service';

@Component({
  selector: 'app-actualizar-rol',
  templateUrl: './actualizar-rol.component.html',
  styleUrls: ['./actualizar-rol.component.css']
})
export class ActualizarRolComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: RolService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.SearchRecord();
    this.CreateForm();
  }

  CreateForm() {
    this.form = this.fb.group({
      _id: ["", [Validators.required]],
      nombre: ["", [Validators.required]],
    });
  }

  get GetForm() {
    return this.form.controls;
  }

  SearchRecord(){
    let _id = this.route.snapshot.params["_id"];
    this.service.SearchRecord(_id).subscribe({
      next: (data: RolModel) => {
        this.form.controls._id.setValue(data._id);
        this.form.controls.nombre.setValue(data.nombre);
      }
    });
  }

  SaveRecord() {
    let model = new RolModel();
    model._id = this.form.controls._id.value;
    model.nombre = this.form.controls.nombre.value;
    console.log(model);
    
    this.service.EditRecord(model).subscribe({
      next: (data: RolModel) => {
        this.router.navigate(["/seguridad/listar-rol"]);
      },
      error: (err: any) => {
      }
    });
  }

  openDialog() {
    this.dialog.open(InfoComponent);
  }

}

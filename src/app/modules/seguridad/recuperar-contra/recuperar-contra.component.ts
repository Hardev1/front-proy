import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GeneralData } from 'src/app/config/general-data';
import { InfoComponent } from '../../shared/components/modals/info/info.component';
import { UserCredentialsModel } from '../../../models/sesion/user-credentials.models';
import { MD5 } from 'crypto-js';
import { SecurityService } from 'src/app/services/shared/security.service';
import { RolModel } from '../../shared/modelos/rol.model';
import { RolService } from 'src/app/services/shared/rol.service';
import { LocalStorageService } from 'src/app/services/shared/local-storage.service';


@Component({
  selector: 'app-recuperar-contra',
  templateUrl: './recuperar-contra.component.html',
  styleUrls: ['./recuperar-contra.component.css']
})
export class RecuperarContraComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private securityService: SecurityService,
    private router: Router,
    private service: RolService,
    private localStorage: LocalStorageService
  )
  
  { }
  recordList: RolModel[] = []

  form: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.CreateForm();
  }

  CreateForm() {
    this.form = this.fb.group({
      username: [
        'humberto.1701913052@ucaldas.edu.co',
        [
          Validators.required,
          Validators.email,
          Validators.minLength(GeneralData.EMAIL_MIN_LENGHT),
        ],
      ],
    });
  }

  get GetForm() {
    return this.form.controls;
  }
  
  openDialog() {
    this.dialog.open(InfoComponent);
  }

  RecoverPassword() {
    let user = this.GetForm.username.value;
    this.securityService.RecoverPassword(user).subscribe({
      next: (data: any) => {
        this.router.navigate(['seguridad/inicio-sesion'])
      },
      error: (error: any) => {
        console.log('Error al conectar con el backend');
      }
    });
  }

}

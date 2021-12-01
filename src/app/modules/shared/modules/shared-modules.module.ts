import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModulesRoutingModule } from './shared-modules-routing.module';
import { UploadReadCsvComponent } from './upload-read-csv/upload-read-csv.component';
import { SharedModule } from '../shared.module';

@NgModule({
  declarations: [
    UploadReadCsvComponent,
  ],
  imports: [
    CommonModule,
    SharedModulesRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModulesModule { }

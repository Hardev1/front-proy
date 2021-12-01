import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { JuradoModel } from 'src/app/models/parametros/jurado.model';
import { JuradoService } from 'src/app/services/parametros/jurado.service';

@Component({
    selector: 'upload-read-csv',
    templateUrl: './upload-read-csv.component.html',
    styleUrls: ['./upload-read-csv.component.css']
})

export class UploadReadCsvComponent {
    @ViewChild('csvReader') csvReader: any;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    jsondatadisplay: any;
    public records: any[] = [];
    dataSource = new MatTableDataSource<JuradoModel>(this.records);
    displayedColumns: string[] = ['id', 'nombre', 'apellido', 'email', 'documento', 'telefono', 'fechaNacimiento', 'entidad'];
    columnas = [
        { titulo: "Id", name: "id" },
        { titulo: "Nombre", name: "nombre" },
        { titulo: "Apellido", name: "apellido" },
        { titulo: "Correo electrónico", name: "email" },
        { titulo: "Documento", name: "documento" },
        { titulo: "Celular", name: "telefono" },
        { titulo: "Entidad", name: "entidad" }
    ];

    constructor(
        private router: Router,
        private service: JuradoService,
        public dialog: MatDialog
    ) { }

    uploadListener($event: any): void {

        let text = [];
        let files = $event.srcElement.files;

        if (this.isValidCSVFile(files[0])) {

            let input = $event.target;
            let reader = new FileReader();
            reader.readAsText(input.files[0]);

            reader.onload = () => {
                let csvData = reader.result;
                let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);
                let headersRow = this.getHeaderArray(csvRecordsArray);
                this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
                this.dataSource.data = this.records;
            };

            reader.onerror = function () {
                console.log('Error ocurrido mientras se lee el archivo!');
            };

        } else {
            alert("Por favor, importa un archivo que sea formato .csv");
            this.fileReset();
        }
    };

    getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
        let csvArr = [];

        for (let i = 1; i < csvRecordsArray.length; i++) {
            let curruntRecord = (<string>csvRecordsArray[i]).split(',');
            if (curruntRecord.length == headerLength) {
                let csvRecord: JuradoModel = new JuradoModel();
                csvRecord.id = parseInt(curruntRecord[0].trim());
                csvRecord.nombre = curruntRecord[1].trim();
                csvRecord.apellido = curruntRecord[2].trim();
                csvRecord.documento = curruntRecord[3].trim();
                csvRecord.telefono = curruntRecord[4].trim();
                csvRecord.fechaNacimiento = curruntRecord[5].trim();
                csvRecord.email = curruntRecord[6].trim();
                csvRecord.entidad = curruntRecord[7].trim();
                csvArr.push(csvRecord);
            };
        };
        return csvArr;
    };

    //Verifica la extensión
    isValidCSVFile(file: any) {
        return file.name.endsWith(".csv");
    }

    getHeaderArray(csvRecordsArr: any) {
        let headers = (<string>csvRecordsArr[0]).split(',');
        let headerArray = [];
        for (let j = 0; j < headers.length; j++) {
            headerArray.push(headers[j]);
        }
        return headerArray;
    };

    fileReset() {
        this.csvReader.nativeElement.value = "";
        this.records = [];
        this.jsondatadisplay = '';
        this.dataSource.data = this.records;
    };

    getJsonData() {
        this.jsondatadisplay = JSON.stringify(this.records);
    };

    SaveRecord() {
        if (this.records.length > 0) {
            this.records.forEach(record => {
                let model = new JuradoModel();
                model.nombre = record.nombre;
                model.apellido = record.apellido;
                model.telefono = record.telefono;
                model.email = record.email;
                model.documento = record.documento;
                model.fechaNacimiento = new Date(record.fechaNacimiento).toISOString();
                model.entidad = record.entidad;
                this.service.SaveRecord(model).subscribe({
                    next: (data: JuradoModel) => {
                        this.router.navigate(["/parametros/listar-jurado"]);
                    },
                    error: (err: any) => {
                    }
                });
            });
        };
    };
}

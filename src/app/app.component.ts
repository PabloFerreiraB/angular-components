import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatSelectFilterModule } from 'mat-select-filter';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CustomSelectComponent } from './components/custom-select/custom-select.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { finalize } from 'rxjs';
import { DemoTableComponent } from './demo-table/demo-table.component';
import { TableService } from './services/table.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    FormsModule,
    MatSelectFilterModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,

    // Components
    CustomSelectComponent,
    UploadFileComponent,
    // Demos
    DemoTableComponent
  ],
  providers: [HttpClient, TableService]
})
export class AppComponent {
  // public form!: FormGroup;
  // Custom select
  // list: any = [
  //   {
  //     id: 7,
  //     description: 'A+'
  //   },
  //   {
  //     id: 8,
  //     description: 'A-'
  //   },
  //   {
  //     id: 11,
  //     description: 'AB+'
  //   },
  //   {
  //     id: 12,
  //     description: 'AB-'
  //   },
  //   {
  //     id: 9,
  //     description: 'B+'
  //   },
  //   {
  //     id: 10,
  //     description: 'B-'
  //   },
  //   {
  //     id: 5,
  //     description: 'O+'
  //   },
  //   {
  //     id: 6,
  //     description: 'O-'
  //   }
  // ];

  // Upload file
  // public filename: string = '';
  // public isUploaded: boolean = true;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    // this.initForm();
  }

  // private initForm(): void {
  //   this.form = this.formBuilder.group({
  //     mySelect: [null, Validators.required],
  //     file: [null],
  //     fileTemporarioIds: [null]
  //   });
  // }

  // addFile($event: any) {
  //   // if ($event.length > 0) {
  //   //   if ($event && $event[0]) {
  //   //     if ($event[0].size > 5242880) {
  //   //       this.dialogService.alert('Tamanho máximo permitido do arquivo de upload é 5MB.');
  //   //       return;
  //   //     }
  //   //   }
  //   //   this.isUploaded = false;
  //   //   this.common.startLoading();
  //   //   this.service
  //   //     .sendAnexo($event[0])
  //   //     .pipe(
  //   //       finalize(() => {
  //   //         this.isUploaded = true;
  //   //         this.common.stopLoading();
  //   //       })
  //   //     )
  //   //     .subscribe((response: any) => {
  //   //       this.form.controls.file.setValue(response.name);
  //   //       this.form.controls.fileTemporarioIds.setValue([response.id]);
  //   //     });
  //   // } else {
  //   //   this.common.startLoading();
  //   //   this.service.deleteFile(this.cursoId, this.idArquivo).subscribe({
  //   //     next: (response: any) => {
  //   //       this.form.controls.fileTemporarioIds.setValue(null);
  //   //       this.common.stopLoading();
  //   //     },
  //   //     error: (error) => {
  //   //       this.common.stopLoading();
  //   //     }
  //   //   });
  //   // }
  // }

  // doDownload() {
  //   // this.common.startLoading();
  //   // this.service
  //   //   .getFile(this.cursoId, this.idArquivo)
  //   //   .pipe(finalize(() => this.common.stopLoading()))
  //   //   .subscribe({
  //   //     next: (response: any) => {
  //   //       let file = new Blob([response], { type: 'application/pdf' });
  //   //       let fileURL = URL.createObjectURL(file);
  //   //       window.open(fileURL);
  //   //     },
  //   //     error: (error) => {
  //   //       this.dialogService.alert(error?.error?.message || 'Sistema indisponível no momento.');
  //   //     }
  //   //   });
  // }
}

import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-upload-file',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatTooltipModule
  ],
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent {
  @Input() title: string = 'Fazer upload de arquivo';
  @Input() accept = 'image/*, application/pdf';
  @Input() supportedFiles = [
    'pg',
    'png',
    'jpg',
    'jpeg',
    'gif',
    'tiff',
    'bpg',
    'svg',
    'psd',
    'webp',
    'raw',
    'bmp',
    'pdf'
  ];
  @Input() isVisualization!: boolean;
  @Input() isEdit!: boolean;
  @Input() showElement = true;
  @Input() files: File[] = [];
  @Input() multiple: any;
  @Input() fileName!: string;
  @Input() maxFileSize = 5242880;

  @Output() emitFile = new EventEmitter<any>();
  @Output() doDownload = new EventEmitter<any>();

  @ViewChild('fileUpload') fileUpload!: ElementRef;

  public inputFileName!: string;

  constructor(
    private sanitizer: DomSanitizer // private dialogService: DialogService
  ) {}

  public onFileSelected(event: any) {
    let files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
    for (let i = 0; i < files.length; i++) {
      let file = files[i];

      if (this.validate(file)) {
        file.objectURL = this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(files[i])
        );
        if (!this.isMultiple()) {
          this.files = [];
        }
        this.fileName = files[i]?.name;
        this.files.push(files[i]);
        this.showElement = false;
      }
    }
    this.emitFile.emit(this.files);
  }

  public onClickUploadFile() {
    if (this.isVisualization) {
      return;
    }
    if (this.fileUpload) this.fileUpload.nativeElement.click();
  }

  public validate(file: File) {
    let allImages: Array<string> = this.supportedFiles;
    const url = file.type;
    const typeFile = url.split('/').pop() || '';
    if (allImages.indexOf(typeFile) < 0) {
      // this.dialogService.alert('Tipo de arquivo não suportado.');
      this.files = [];
      return;
    }
    if (file.size > this.maxFileSize) {
      // this.dialogService.alert(
      //   `Tamanho máximo permitido do arquivo de upload é ${this.formatBytes(this.maxFileSize)}MB.`
      // );
      this.files = [];
      return;
    }
    for (const f of this.files) {
      if (
        f.name === file.name &&
        f.lastModified === file.lastModified &&
        f.size === f.size &&
        f.type === f.type
      ) {
        return false;
      }
    }
    return true;
  }

  private formatBytes(bytes: number, decimals = 2) {
    if (!+bytes) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }

  public isMultiple(): boolean {
    return this.multiple;
  }

  remove(): void {
    this.files = [];
    this.fileName = '';
    this.showElement = true;
    this.fileUpload.nativeElement.value = null;
    this.inputFileName = '';
    this.emitFile.emit(this.files);
  }

  download() {
    this.doDownload.emit();
  }
}

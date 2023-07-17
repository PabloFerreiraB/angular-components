import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatSelectFilterModule } from 'mat-select-filter';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CustomSelectComponent } from './components/custom-select/custom-select.component';

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
    // Components
    CustomSelectComponent
  ]
})
export class AppComponent {
  public form!: FormGroup;

  list: any = [
    {
      id: 7,
      description: 'A+'
    },
    {
      id: 8,
      description: 'A-'
    },
    {
      id: 11,
      description: 'AB+'
    },
    {
      id: 12,
      description: 'AB-'
    },
    {
      id: 9,
      description: 'B+'
    },
    {
      id: 10,
      description: 'B-'
    },
    {
      id: 5,
      description: 'O+'
    },
    {
      id: 6,
      description: 'O-'
    }
  ];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      mySelect: [null, Validators.required]
    });
  }
}

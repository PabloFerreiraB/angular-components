import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelect, MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatSelectFilterModule } from 'mat-select-filter';

export type disableChipFn = null | ((item: any) => boolean);

@Component({
  selector: 'app-custom-select',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatChipsModule,
    MatSelectFilterModule
  ],
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CustomSelectComponent
    }
  ]
})
export class CustomSelectComponent implements OnInit, OnChanges {
  @Input() customForm!: FormGroup;
  @Input() customFormControl!: string;
  @Input() list!: any[];
  @Input() label!: string | TemplateRef<any>;
  @Input() placeholder = '';
  @Input() multiple = false;
  @Input() propertyId = 'id';
  @Input() propertyName = 'name';
  @Input() required = false;
  @Input() showSpinner = false;
  @Input() nullDescription = 'Selecionar';
  @Input() isChipSelect = false;
  @Input() chipDescription = 'description';
  @Input() showFilterMinItems = 5;
  @Input() alwaysShowFilter = false;
  @Input() disableChipFn: disableChipFn = null;
  @Input() compareWith: (o1: any, o2: any) => boolean = this.compareByID;
  @Input() darkTheme: boolean = false;

  @Output() ngModelChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() openedChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() selectionChange: EventEmitter<MatSelectChange> = new EventEmitter<MatSelectChange>();
  @Output() chipRemove: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('select', { static: false }) select!: MatSelect;

  filteredList!: any[];
  mouseDown!: boolean;
  startX!: number;
  element!: HTMLElement;

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['list']) {
      this.filteredList = this.list;
    }
  }

  onFilterList(event: any[]) {
    this.filteredList = event;
  }

  compareByID(o1: any, o2: any) {
    if (this.isChipSelect) {
      return o1.id === o2.id;
    }

    return o1 === o2;
  }

  lookup(id: any) {
    if (this.propertyId == '@') {
      return id[this.propertyName];
    } else {
      const found = this.list?.find((item: any) => item[this.propertyId] == id);
      if (found) {
        return found[this.propertyName];
      }
    }
    return id;
  }

  isChipDisabled(id: any) {
    if (this.customForm.get(this.customFormControl)) {
      if (this.customForm.get(this.customFormControl)?.disabled) {
        return true;
      }
    }
    if (this.disableChipFn) {
      const found = this.list?.find((item: any) => item[this.propertyId] == id);
      if (found) {
        return this.disableChipFn(found);
      } else {
        return this.disableChipFn(id);
      }
    }
    return false;
  }

  removeChip(value: any) {
    this.chipRemove.emit(value);
    if (this.chipRemove.observers.length == 0) {
      const chipList = this.customForm?.get(this.customFormControl)?.value;
      if (chipList) {
        const chipIdx = chipList.indexOf(value);
        chipList.splice(chipIdx, 1);
        this.customForm?.get(this.customFormControl)?.setValue(chipList);
      }
    }
  }

  startDragging(e: any, flag: any, el: any) {
    this.mouseDown = true;
    this.startX = e.screenX;
    this.element = el._elementRef.nativeElement.querySelector('.mat-chip-list-wrapper');
    e.preventDefault();
  }

  nullOptionClick() {
    if (this.multiple) {
      this.customForm.get(this.customFormControl)?.setValue([]);
      this.select.close();
    }
  }

  @HostListener('document:mouseup', ['$event'])
  stopDragging(e: any) {
    this.mouseDown = false;
  }

  @HostListener('document:mousemove', ['$event'])
  moveEvent(e: any) {
    if (this.mouseDown) {
      const mouseX = e.screenX;
      const scroll = this.startX - mouseX;
      this.element.scrollLeft = this.element.scrollLeft + scroll;
      this.startX = mouseX;
    }
  }

  mouseWheel(e: any, el: any) {
    let element = el._elementRef.nativeElement.querySelector('.mat-chip-list-wrapper');
    element.scrollLeft = element.scrollLeft + e.deltaY;
  }
}

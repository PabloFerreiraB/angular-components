import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ActionClickEvent,
  Actions,
  ButtonPositionEnum,
  Column,
  ColumnTypeEnum,
  SipolDynamicTableModule
} from '../modules/dynamic-table';
import { HttpParams } from '@angular/common/http';
import { TableService } from '../services/table.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-demo-table',
  standalone: true,
  imports: [CommonModule, SipolDynamicTableModule, HttpClientModule],
  templateUrl: './demo-table.component.html',
  styleUrls: ['./demo-table.component.scss'],
  providers: []
})
export class DemoTableComponent implements OnInit {
  public rows!: any[];

  public pagination: any = {
    pageIndex: 0,
    pageSize: 10
  };

  public columns: Column[] = [
    {
      type: ColumnTypeEnum.DATA,
      name: 'id',
      title: 'ID',
      sortColumn: '',
      headerAttrs: {
        class: 'w-10 px-2'
      },
      columnAttrs: {
        class: 'px-2'
      }
    },
    {
      type: ColumnTypeEnum.DATA,
      name: 'name',
      title: 'Nome',
      sortColumn: '',
      headerAttrs: {
        class: 'w-50'
      },
      columnAttrs: {
        class: 'overflow-detect'
      }
    },
    {
      type: ColumnTypeEnum.DATA,
      name: 'email',
      title: 'E-mail',
      sortColumn: '',
      headerAttrs: {
        class: 'w-20'
      },
      columnAttrs: {
        class: 'overflow-detect'
      }
    },
    {
      type: ColumnTypeEnum.SLOT,
      name: 'status',
      title: 'Status',
      sortColumn: '',
      headerAttrs: {
        class: 'w-10'
      },
      columnAttrs: {
        class: 'overflow-detect'
      }
    }
  ];

  public actions: Actions[] = [
    {
      name: 'visualizar',
      tooltip: 'Visualizar',
      icon: 'remove_red_eye',
      position: ButtonPositionEnum.RIGHT
    },
    {
      name: 'editar',
      tooltip: 'Editar',
      icon: 'edit',
      position: ButtonPositionEnum.RIGHT
      // conditional: () => {
      //   return this.mode !== FormModeEnum.Visualizar;
      // }
    },
    {
      name: 'delete',
      tooltip: 'Excluir',
      icon: 'delete_forever',
      position: ButtonPositionEnum.RIGHT
      // conditional: () => {
      //   return this.mode !== FormModeEnum.Visualizar;
      // }
    },
    {
      name: 'incluir',
      tooltip: 'Cadastrar',
      icon: 'add_circle_outline',
      position: ButtonPositionEnum.BOTTOM
      // conditional: () => {
      //   return this.mode !== FormModeEnum.Visualizar;
      // }
    }
  ];

  // @AutoDestroy destroy$: Subject<void> = new Subject<void>();

  constructor(private service: TableService) {}

  ngOnInit(): void {
    this.getAll();
  }

  public runAction(event: ActionClickEvent) {
    console.log('[runAction]', event);

    // if (event.name === FormModeEnum.Incluir) {
    //   const hasPrincipal = this.rows?.some((el) => el.principal);
    //   this.dialog
    //     .open(CadastrarContatoComponent, {
    //       mode: FormModeEnum.Incluir,
    //       element: { hasPrincipal, alunoId: this.alunoId }
    //     })
    //     .afterClosed()
    //     .pipe(takeUntil(this.destroy$))
    //     .subscribe({
    //       next: (modalResponse: boolean) => {
    //         if (modalResponse) {
    //           this.sortData();
    //           this.common.showSnack('Dados salvos com sucesso');
    //         }
    //       },
    //       error: ({ error }) => {
    //         this.dialogService.alert(error.message || 'Sistema indisponível no momento.');
    //       }
    //     });
    // } else if (event.name === FormModeEnum.Editar || event.name === FormModeEnum.Visualizar) {
    //   this.dialog
    //     .open(CadastrarContatoComponent, {
    //       mode: event.name === FormModeEnum.Editar ? FormModeEnum.Editar : FormModeEnum.Visualizar,
    //       element: event.element
    //     })
    //     .afterClosed()
    //     .pipe(takeUntil(this.destroy$))
    //     .subscribe({
    //       next: (modalResponse: boolean) => {
    //         if (modalResponse) {
    //           this.sortData();
    //           this.common.showSnack('Dados salvos com sucesso');
    //         }
    //       },
    //       error: ({ error }) => {
    //         this.dialogService.alert(error.message || 'Sistema indisponível no momento.');
    //       }
    //     });
    // } else if (event.name === ActionsEnum.Deletar) {
    //   const confirmation = this.dialogService.confirmation(
    //     'A exclusão do registro é irreversível. Deseja prosseguir com a operação?'
    //   );
    //   confirmation.afterClosed().subscribe((confirmation: boolean) => {
    //     if (confirmation) {
    //       this.alunosService
    //         .deleteContato(event.element?.alunoId, event.element?.alunoContatoId)
    //         .pipe(takeUntil(this.destroy$))
    //         .subscribe({
    //           next: () => {
    //             this.sortData();
    //             this.common.showSnack('Contato removido com sucesso');
    //           },
    //           error: ({ error }) => {
    //             this.dialogService.alert(error.message || 'Sistema indisponível no momento.');
    //           }
    //         });
    //     }
    //   });
    // }
  }

  public pageData(page: any) {
    this.pagination.pageIndex = page.pageIndex;
    this.pagination.pageSize = page.pageSize;
    this.getAll();
  }

  public getAll(sort: any = null) {
    let params = new HttpParams();

    if (sort) {
      if (sort.active !== this.pagination.pageSort) {
        this.pagination.pageSort = sort.active;
        this.pagination.pageIndex = 0;
      }

      this.pagination.pageOrder = sort.direction.toUpperCase();

      params = params.append('pageSort', this.pagination.pageSort);
      if (this.pagination.pageOrder !== '') {
        params = params.append('pageOrder', this.pagination.pageOrder);
      } else {
        params = params.append('pageOrder', 'ASC');
      }
    }

    if (this.pagination) {
      params = params.append('pageSize', this.pagination.pageSize);
      params = params.append('pageStart', this.pagination.pageIndex);
    }

    // this.common.startLoading();

    this.service.getAll().subscribe({
      next: (response) => {
        console.log(response);
        this.rows = response;
      },
      error: (erro) => console.error(erro)
    });

    // this.alunosService
    //   .getListAbas(this.alunoId, 'contato', params)
    //   .pipe(
    //     takeUntil(this.destroy$),
    //     finalize(() => this.common.stopLoading())
    //   )
    //   .subscribe({
    //     next: (response) => {
    //       this.rows = this.normalizeResponse(response);
    //       this.pagination.length = response.totalRecords;
    //       this.pagination.pageSize = response.pageSize;
    //       this.pagination.pageIndex = response.currentPage;

    //       this.dataRows.emit(this.rows);
    //       this.hasPrincipalContato();
    //     },
    //     error: ({ error }) => {
    //       this.dialogService.alert(error.message || 'Sistema indisponível no momento.');
    //     }
    //   });
  }
}

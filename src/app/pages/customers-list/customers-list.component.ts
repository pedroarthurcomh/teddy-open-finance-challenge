import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { Customer } from '../../types/customer.type';
import { ApiService } from '../../services/api.service';
import { map, Observable, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { EditClienteModalComponent } from '../../modals/edit-cliente-modal/edit-cliente-modal';
import { CustomerResponse } from '../../types/customer-response.type';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-clientes',
  standalone: false,
  templateUrl: './customers-list.component.html',
  styleUrl: './customers-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomersListComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  clientes$!: Observable<Customer[]>;

  totalPages: number = 0;
  currentPage: number = 0;
  pageSize: number = 10;
  pageIndex: number = 0;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.clientes$ = this.apiService
      .getAllUsers(this.currentPage + 1, this.pageSize)
      .pipe(
        tap((response: CustomerResponse) => {
          this.totalPages = response.totalPages;
          this.currentPage = response.currentPage - 1;
        }),
        map((clientesResponse) => clientesResponse.clients)
      );
    this.clientes$.subscribe();
  }

  newUser() {
    const dialogRef = this.dialog.open(EditClienteModalComponent);

    dialogRef.afterClosed().subscribe(() => {
      location.reload();
    });
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getAllUsers();
  }
}

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
import { Router } from '@angular/router';

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

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.clientes$ = this.apiService.getAllUsers().pipe(
      tap((clientesResponse) => setTimeout(() => {}, 2000000)),
      map((clientesResponse) => clientesResponse.clients)
    );
    this.clientes$.subscribe();
  }

  newUser() {
    this.dialog.open(EditClienteModalComponent);
  }
}

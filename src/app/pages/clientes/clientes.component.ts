import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { Customer } from '../../types/customer.type';
import { ApiService } from '../../services/api.service';
import { map, Observable } from 'rxjs';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteClienteComponent } from '../../modals/delete-cliente/delete-cliente-modal';
import { EditClienteModalComponent } from '../../modals/edit-cliente-modal/edit-cliente-modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientes',
  standalone: false,
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientesComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  clientes$!: Observable<Customer[]>;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.clientes$ = this.apiService
      .getAllUsers()
      .pipe(map((clientesResponse) => clientesResponse.clients));
    this.clientes$.subscribe();
  }

  newUser() {
    this.dialog.open(EditClienteModalComponent);
  }
}

import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { Cliente } from '../../types/cliente.type';
import { ClientesService } from '../../services/clientes.service';
import { map, Observable } from 'rxjs';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteClienteComponent } from '../../modals/delete-cliente/delete-cliente-modal';
import { EditClienteModalComponent } from '../../modals/edit-cliente-modal/edit-cliente-modal';

@Component({
  selector: 'app-clientes',
  standalone: false,
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientesComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  username!: string;
  clientes$!: Observable<Cliente[]>;

  constructor(private clientesService: ClientesService) {}

  ngOnInit(): void {
    this.getAllUsers();
    this.username = this.clientesService.getUsername();
  }

  getAllUsers() {
    this.clientes$ = this.clientesService
      .getAllUsers()
      .pipe(map((clientesResponse) => clientesResponse.clients));
    this.clientes$.subscribe();
  }

  editUser(cliente: Cliente) {
    this.dialog.open(EditClienteModalComponent, {
      data: cliente,
    });
  }

  newUser() {
    this.dialog.open(EditClienteModalComponent);
  }

  deleteUser(cliente: Cliente) {
    this.dialog.open(DeleteClienteComponent, {
      data: cliente,
    });
  }
}

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cliente } from '../../types/cliente.type';
import { ClientesService } from '../../services/clientes.service';
@Component({
  selector: 'app-delete-cliente',
  standalone: false,
  templateUrl: './delete-cliente-modal.html',
  styleUrl: './delete-cliente-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteClienteComponent {
  cliente: Cliente = inject(MAT_DIALOG_DATA);

  constructor(
    private clientesService: ClientesService,
    private dialogRef: MatDialogRef<DeleteClienteComponent>
  ) {}

  deleteUser(cliente: Cliente) {
    this.clientesService.deleteUser(cliente.id).subscribe((res) => {
      console.log(res);
      this.dialogRef.close();
    });
  }
}

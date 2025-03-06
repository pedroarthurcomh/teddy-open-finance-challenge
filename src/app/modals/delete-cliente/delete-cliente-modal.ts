import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Customer } from '../../types/customer.type';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { EMPTY } from 'rxjs';
@Component({
  selector: 'app-delete-cliente',
  standalone: false,
  templateUrl: './delete-cliente-modal.html',
  styleUrl: './delete-cliente-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteClienteComponent {
  cliente: Customer = inject(MAT_DIALOG_DATA);

  constructor(
    private apiService: ApiService,
    private dialogRef: MatDialogRef<DeleteClienteComponent>,
    private toastr: ToastrService
  ) {}

  deleteUser(customer: Customer) {
    this.apiService.deleteUser(customer.id).subscribe(
      (res) => {
        this.toastr.success('Usuário excluído com sucesso', 'Sucesso');
        this.dialogRef.close();
      },
      (error) => {
        this.toastr.error(error.message, 'Erro');
        return EMPTY;
      }
    );
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Customer } from '../../types/customer.type';
import { ApiService } from '../../services/api.service';
import { NewUser } from '../../types/new-user.type';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-edit-cliente-modal',
  standalone: false,
  templateUrl: './edit-cliente-modal.html',
  styleUrl: './edit-cliente-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditClienteModalComponent implements OnInit {
  cliente?: Customer = inject(MAT_DIALOG_DATA);
  form: FormGroup;

  constructor(
    private apiService: ApiService,
    private dialogRef: MatDialogRef<EditClienteModalComponent>,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      name: new FormControl<string | null>(null, {
        validators: Validators.required,
      }),
      salary: new FormControl<number | null>(null, {
        validators: Validators.required,
      }),
      companyValuation: new FormControl<number | null>(null, {
        validators: Validators.required,
      }),
    });
  }

  ngOnInit(): void {
    if (!!this.cliente)
      this.apiService
        .getById(this.cliente.id)
        .subscribe((cliente) => this.form.patchValue({ ...cliente }));
  }

  submit() {
    if (this.form.invalid) {
      this.toastr.warning('Preencha os campos obrigatórios', '', {
        timeOut: 1000,
      });
      return;
    }

    const body: NewUser = this.form.value;
    if (!!this.cliente) {
      this.apiService.editUser(this.cliente.id, body).subscribe(
        (res) => {
          this.toastr.success('Usuário atualizado com sucesso', 'Sucesso');
          this.dialogRef.close();
        },
        (error) => {
          this.toastr.error(error.message, 'Erro');
          return EMPTY;
        }
      );
    } else {
      this.apiService.newUser(body).subscribe(
        (res) => {
          this.toastr.success('Usuário criado com sucesso', 'Sucesso');
          this.dialogRef.close();
        },
        (error) => {
          this.toastr.error(error.message, 'Erro');
          return EMPTY;
        }
      );
    }
  }
}

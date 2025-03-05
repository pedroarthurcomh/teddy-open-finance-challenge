import { Component, inject, Input } from '@angular/core';
import { Customer } from '../../types/customer.type';
import { MatDialog } from '@angular/material/dialog';
import { EditClienteModalComponent } from '../../modals/edit-cliente-modal/edit-cliente-modal';
import { DeleteClienteComponent } from '../../modals/delete-cliente/delete-cliente-modal';

@Component({
  selector: 'app-customer-card',
  standalone: false,
  templateUrl: './customer-card.component.html',
  styleUrl: './customer-card.component.scss'
})
export class CustomerCardComponent {
  readonly dialog = inject(MatDialog);

  @Input() customer!: Customer;
  @Input() selected!: boolean;

  constructor( ) {}

    editUser(customer: Customer) {
      this.dialog.open(EditClienteModalComponent, {
        data: customer,
      });
    }

    deleteUser(customer: Customer) {
      this.dialog.open(DeleteClienteComponent, {
        data: customer,
      });
    }
}

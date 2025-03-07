import { Component, inject, Input } from '@angular/core';
import { Customer } from '../../types/customer.type';
import { MatDialog } from '@angular/material/dialog';
import { EditClienteModalComponent } from '../../modals/edit-cliente-modal/edit-cliente-modal';
import { DeleteClienteComponent } from '../../modals/delete-cliente/delete-cliente-modal';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-customer-card',
  standalone: false,
  templateUrl: './customer-card.component.html',
  styleUrl: './customer-card.component.scss',
})
export class CustomerCardComponent {
  readonly dialog = inject(MatDialog);
  isCardSelected: boolean = false;

  @Input() customer!: Customer;
  @Input() selected!: boolean;

  constructor(private toastr: ToastrService, private apiService: ApiService) {}

  editUser(customer: Customer) {
    const dialogRef = this.dialog.open(EditClienteModalComponent, {
      data: customer,
    });

    dialogRef.afterClosed().subscribe(() => {
      location.reload();
    });
  }

  deleteUser(customer: Customer) {
    const dialogRef = this.dialog.open(DeleteClienteComponent, {
      data: customer,
    });

    dialogRef.afterClosed().subscribe(() => {
      location.reload();
    });
  }

  getSelectedCustomers() {
    const selectedCustomers = localStorage.getItem('selectedCustomers');
    if (!selectedCustomers) return [];
    return JSON.parse(selectedCustomers);
  }

  setSelectedCustomers(value: any) {
    let newValue = JSON.stringify(value);
    localStorage.setItem('selectedCustomers', newValue);
    this.getSelectedCustomers();
  }

  select(customerId: number) {
    this.selected = true;

    let alredyHas = this.getSelectedCustomers();

    if (alredyHas.includes(customerId)) return;

    alredyHas.push(customerId);
    this.setSelectedCustomers(alredyHas);
    this.toastr.info('Cliente selecionado!', '', {
      timeOut: 1000,
    });
  }

  removeSelection(id: number) {
    this.selected = false;

    let alredyHas = this.getSelectedCustomers();
    if (alredyHas.includes(id)) {
      alredyHas = alredyHas.filter((customer: number) => customer !== id);
      this.setSelectedCustomers(alredyHas);
      this.apiService.updateCustomers$.emit();
    }
  }
}

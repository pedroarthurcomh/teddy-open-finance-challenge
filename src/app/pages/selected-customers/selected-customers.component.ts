import { AfterViewInit, Component, OnChanges } from '@angular/core';
import { Customer } from '../../types/customer.type';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-selected-customers',
  standalone: false,
  templateUrl: './selected-customers.component.html',
  styleUrl: './selected-customers.component.scss',
})
export class SelectedCustomersComponent implements AfterViewInit {
  selectedCustomers: Customer[] = [];

  constructor(private apiService: ApiService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getSelectedCustomers();
  }

  ngAfterViewInit(): void {
    this.apiService.updateCustomers$.subscribe(() => {
      this.getSelectedCustomers();
    });
  }

  getSelectedCustomers() {
    this.selectedCustomers = [];

    const selectedCustomers = localStorage.getItem('selectedCustomers');
    if (!!selectedCustomers) {
      let customerData = JSON.parse(selectedCustomers);
      for (let id of customerData) {
        this.apiService.getById(id).subscribe(
          (customer) => {
            this.selectedCustomers.push(customer);
          },
          (error) => {
            this.toastr.error(error.message, 'Erro');
          }
        );
      }
    }
  }

  clearSelectedCustomers() {
    localStorage.removeItem('selectedCustomers');
    this.selectedCustomers = [];
    this.toastr.warning('Nenhum cliente selecionado!', '', {
      timeOut: 1000,
    });
  }
}

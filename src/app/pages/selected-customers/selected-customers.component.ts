import { Component } from '@angular/core';
import { Customer } from '../../types/customer.type';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-selected-customers',
  standalone: false,
  templateUrl: './selected-customers.component.html',
  styleUrl: './selected-customers.component.scss'
})
export class SelectedCustomersComponent {
  selectedCustomers: Customer[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      let customersId = params['selected']
      console.log(customersId)
    })
  }

  clearSelectedCustomers(){
    this.selectedCustomers = [];
  }
}

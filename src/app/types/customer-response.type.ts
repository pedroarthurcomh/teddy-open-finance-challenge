import { Customer } from './customer.type';

export type CustomerResponse = {
  clients: Customer[];
  totalPages: number;
  currentPage: number;
};

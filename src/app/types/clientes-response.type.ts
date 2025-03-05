import { Cliente } from './cliente.type';

export type ClientesResponse = {
  clients: Cliente[];
  totalPages: number;
  currentPage: number;
};

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersListComponent } from './pages/customers-list/customers-list.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { SelectedCustomersComponent } from './pages/selected-customers/selected-customers.component';
import { HeaderComponent } from './components/header/header.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'public',
  },
  {
    path: 'public',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'welcome',
      },
      {
        path: 'welcome',
        component: WelcomeComponent,
      },
    ],
  },
  {
    path: 'private',
    component: HeaderComponent,
    children: [
      {
        path: 'customers',
        component: CustomersListComponent,
      },
      {
        path: 'selected-customers',
        component: SelectedCustomersComponent,
      },
      {
        path: 'home',
        component: CustomersListComponent,
      },
      {
        path: 'products',
        component: CustomersListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

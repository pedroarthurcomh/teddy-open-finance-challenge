import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomersListComponent } from './pages/customers-list/customers-list.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { DeleteClienteComponent } from './modals/delete-cliente/delete-cliente-modal';
import { EditClienteModalComponent } from './modals/edit-cliente-modal/edit-cliente-modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { SelectedCustomersComponent } from './pages/selected-customers/selected-customers.component';
import { HeaderComponent } from './components/header/header.component';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import {
  provideNgxMask,
  NgxMaskConfig,
  provideEnvironmentNgxMask,
} from 'ngx-mask';
import { CustomerCardComponent } from './components/customer-card/customer-card.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

registerLocaleData(localePt);

const maskConfig: Partial<NgxMaskConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    CustomersListComponent,
    DeleteClienteComponent,
    EditClienteModalComponent,
    SelectedCustomersComponent,
    HeaderComponent,
    CustomerCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    RouterModule.forRoot([]),
    ReactiveFormsModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    BrowserAnimationsModule,
    MatTooltipModule,
    ToastrModule.forRoot(),
    NgxSkeletonLoaderModule,
  ],
  providers: [
    provideHttpClient(),
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    provideNgxMask(maskConfig),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

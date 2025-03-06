import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteClienteComponent } from './delete-cliente-modal';
import { provideHttpClient } from '@angular/common/http';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

describe('DeleteClienteComponent', () => {
  let component: DeleteClienteComponent;
  let fixture: ComponentFixture<DeleteClienteComponent>;
  let dialogRefMock: { close: jest.Mock };

  beforeEach(async () => {
    dialogRefMock = {
      close: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [DeleteClienteComponent],
      imports: [ReactiveFormsModule, ToastrModule.forRoot(), MatDialogModule],
      providers: [
        provideHttpClient(),
        { provide: MatDialogRef, useValue: dialogRefMock },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            id: 1,
            name: 'Pedro',
            salary: 5000,
            companyValuation: 100000,
            createdAt: '03/03/2025',
            updatedAt: '03/03/2025',
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display customer name', () => {
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const customerName = compiled.querySelector('strong#name');
    expect(customerName).toBeTruthy();
    expect(customerName?.innerHTML).toContain('Pedro');
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditClienteModalComponent } from './edit-cliente-modal';
import { provideHttpClient } from '@angular/common/http';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

describe('EditClienteModalComponent', () => {
  let component: EditClienteModalComponent;
  let fixture: ComponentFixture<EditClienteModalComponent>;
  let dialogRefMock: { close: jest.Mock };

  beforeEach(async () => {
    dialogRefMock = {
      close: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [EditClienteModalComponent],
      imports: [
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        MatDialogModule
      ],
      providers: [
        provideHttpClient(),
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: undefined },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditClienteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display create new user when customer not provided', () => {
    component.cliente = undefined;
    component.ngOnInit();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const modalTitle = compiled.querySelector('h6');
    expect(modalTitle).toBeTruthy();
    expect(modalTitle?.innerHTML).toContain('Criar cliente');
    
    const modalButton = compiled.querySelector('button#submit');
    expect(modalButton).toBeTruthy();
    expect(modalButton?.innerHTML).toContain('Criar cliente');
  });

  it('should block submit form if user doesnt insert required fields', () => {
    component.form.patchValue({
      name: null,
      salary: null,
      companyValuation: null,
    });
    component.submit();
    expect(component.form.invalid).toBeTruthy();
  });
});

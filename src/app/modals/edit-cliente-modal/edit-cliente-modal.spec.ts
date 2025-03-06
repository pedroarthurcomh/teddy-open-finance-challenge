import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditClienteModalComponent } from './edit-cliente-modal';

describe('EditClienteModalComponent', () => {
  let component: EditClienteModalComponent;
  let fixture: ComponentFixture<EditClienteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditClienteModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditClienteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

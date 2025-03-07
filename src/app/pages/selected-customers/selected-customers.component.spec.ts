import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedCustomersComponent } from './selected-customers.component';
import { provideHttpClient } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

describe('SelectedCustomersComponent', () => {
  let component: SelectedCustomersComponent;
  let fixture: ComponentFixture<SelectedCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectedCustomersComponent],
      imports: [ToastrModule.forRoot()],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectedCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clear the selected customers list by removing stored data when user clicks on the button', () => {
    localStorage.setItem('selectedCustomers', JSON.stringify([1, 2, 3]));
    const clearBtn = fixture.nativeElement.querySelector('button.btn-clear');
    clearBtn.click();
    fixture.detectChanges();
    expect(localStorage.getItem('selectedCustomers')).toBeNull();
  });
});

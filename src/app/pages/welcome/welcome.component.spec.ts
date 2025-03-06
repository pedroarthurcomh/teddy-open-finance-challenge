import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeComponent } from './welcome.component';
import { provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WelcomeComponent],
      providers: [provideHttpClient()],
      imports: [ReactiveFormsModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();

    localStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid when form is empty', () => {
    component.form.patchValue({ username: null });
    expect(component.form.valid).toBeFalsy();
  });

  it('should store the username in localStorage', () => {
    component.form.patchValue({ username: 'Pedro' });
    component.signIn();
    expect(localStorage.getItem('username')).toEqual('Pedro');
  });

  it('should redirect user to the customers list page when submitting the form', () => {
    jest.spyOn(router, 'navigate');
    component.form.patchValue({ username: 'Teste' });
    component.signIn();
    expect(router.navigate).toHaveBeenCalledWith(['/private/customers']);
  });
});

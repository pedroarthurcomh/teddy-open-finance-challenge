import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { provideHttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';

describe('HeaderComponent', () => {
  let apiService: ApiService;
  let router: Router;
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        RouterModule.forRoot([]),
        MatButtonModule,
        MatSidenavModule,
        MatToolbarModule,
      ],
      providers: [provideHttpClient(), ApiService],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();

    apiService = TestBed.inject(ApiService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display username', () => {
    localStorage.setItem('username', 'Pedro');
    component.ngOnInit();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const usernameElement = compiled.querySelector('strong#username');
    expect(usernameElement).toBeTruthy();
    expect(usernameElement?.textContent).toContain('Pedro');
  });

  it('should clear username data when user quit', () => {
    fixture.detectChanges();
    jest.spyOn(router, 'navigate');
    const logoutButton = fixture.nativeElement.querySelector('a#logout')
    logoutButton.click();
    expect(localStorage.getItem('username')).toBeNull();
    expect(router.navigate).toHaveBeenCalledWith(['public/welcome'])
  });
});

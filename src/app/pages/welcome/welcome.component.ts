import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-welcome',
  standalone: false,
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
})
export class WelcomeComponent {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService
  ) {
    this.form = this.fb.group({
      username: new FormControl<string | null>(null, {
        validators: Validators.required,
      }),
    });
  }

  signIn() {
    if (this.form.invalid) return;

    localStorage.setItem('username', this.form.get('username')?.value);
    this.router.navigate(['/private/customers']);
  }
}

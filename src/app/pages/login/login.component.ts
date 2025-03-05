import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientesService } from '../../services/clientes.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private clientesService: ClientesService) {
    this.form = this.fb.group({
      username: new FormControl<string>('')
    })
  }

  ngOnInit(): void {
    
  }

  signIn() {
    this.clientesService.username$.next(this.form.get('username')?.value)
    this.router.navigate(['clientes'])
  }
}

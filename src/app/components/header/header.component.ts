import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  username!: string | null;

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit(): void {
    this.username = this.apiService.getUsername();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['public/welcome']);
  }
}

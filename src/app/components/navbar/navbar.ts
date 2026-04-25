  import { Component } from '@angular/core';
  import { Router, RouterLink, RouterLinkActive } from '@angular/router';

  import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth';

  @Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [RouterLink, RouterLinkActive, NgIf],
    templateUrl: './navbar.html',
    styleUrl: './navbar.css'
  })
  export class Navbar {
    menuOpen = false;

    constructor(public authService: AuthService, private router: Router) {}

    toggleMenu() { this.menuOpen = !this.menuOpen; }

    getInitial(): string {
      const email = this.authService.getLoggedInName();
      return email ? email[0].toUpperCase() : 'U';
    }

    logout() {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }
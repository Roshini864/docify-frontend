import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  name: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private router: Router, private authService: AuthService){};

  register(){
    if(!this.name || !this.email || !this.password){
      this.errorMessage = 'Please fill in all fields';
      return;
    }
    this.authService.register(this.name, this.email, this.password).subscribe({
      next: (response) => {
        console.log('Register success:', response.status);
        this.successMessage = 'Account created! Redirecting to login....';
        this.errorMessage = '';
        setTimeout(() => this.router.navigate(['/login']), 800);
      },
      error: (err) => {
        this.errorMessage = 'Registration failed. Email may already be in use.';
      }
    });
  }
}

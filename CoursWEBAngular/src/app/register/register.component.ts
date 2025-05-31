import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AuthService } from '../shared/auth.service';
import { SnackbarService } from '../shared/snackbar.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
    MatSnackBarModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username = '';
  password = '';
  confirmPassword = '';
  role = 'user'; // Default to user
  error = '';
  success = '';

  constructor(
    private auth: AuthService, 
    private router: Router,
    private snackbarService: SnackbarService
  ) {}

  onSubmit() {
    // Validation
    if (!this.username || !this.password || !this.confirmPassword) {
      this.error = 'Veuillez remplir tous les champs.';
      this.snackbarService.showError('Veuillez remplir tous les champs');
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.error = 'Les mots de passe ne correspondent pas.';
      this.snackbarService.showError('Les mots de passe ne correspondent pas');
      return;
    }



    this.auth.register(this.username, this.password).subscribe({
      next: (response) => {
        this.success = 'Compte créé avec succès ! Redirection vers la connexion...';
        this.error = '';
        this.snackbarService.showSuccess('Compte créé avec succès');
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: err => {
        this.error = err.error?.message || err.error?.error || 'Erreur lors de la création du compte.';
        this.success = '';
        this.snackbarService.showError('Erreur lors de la création du compte');
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
} 
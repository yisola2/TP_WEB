import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AuthService } from '../shared/auth.service';
import { SnackbarService } from '../shared/snackbar.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}

  onSubmit() {
    this.error = ''; // Clear any previous errors
    
    if (!this.username || !this.password) {
      this.error = 'Veuillez remplir tous les champs.';
      this.snackbarService.showError('Veuillez remplir tous les champs.');
      return;
    }
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        if (this.authService.getToken()) {
          this.snackbarService.showSuccess('Connexion réussie');
          setTimeout(() => this.router.navigate(['/']), 1000);
        } else {
          this.error = 'Échec de la connexion. Réponse inattendue.';
          this.snackbarService.showError('Échec de la connexion. Réponse inattendue.');
        }
      },
      error: (httpErrorResponse) => {
        const errorMessage = httpErrorResponse.error?.error ||
                             httpErrorResponse.error?.message ||
                             'Nom d\'utilisateur ou mot de passe incorrect.';
        this.error = errorMessage;
        this.snackbarService.showError(errorMessage);
      }
    });
  }
}
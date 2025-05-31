import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { AssignmentsComponent } from "./assignments/assignments.component";
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule} from '@angular/material/icon';
import { MatSidenavModule} from '@angular/material/sidenav';
import { FormsModule } from '@angular/forms';
import { MatListItem } from '@angular/material/list';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from './shared/auth.service';
import { Router} from '@angular/router';
import { AssignmentsService } from './shared/assignments.service';
import { SnackbarService } from './shared/snackbar.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatButtonModule, MatDividerModule, MatToolbarModule, MatIconModule, MatSidenavModule, FormsModule, MatListItem, MatListModule,
    RouterModule, RouterLink, MatSlideToggleModule, MatSnackBarModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //title = 'Assignment App with Angular';
  opened = false;

  constructor(
    public authService: AuthService,
    private router: Router,
    private assignmentsService: AssignmentsService,
    private snackbarService: SnackbarService
  ) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  onPopulateData() {
    this.snackbarService.showWarning('Repopulation en cours... Anciennes données supprimées', 3000);
    this.assignmentsService.populateData().subscribe({
      next: (response) => {
        console.log('Données repopulées avec succès:', response);
        this.snackbarService.showSuccess(`✅ ${response.count} devoirs ajoutés avec succès !`);
        // Recharger la page pour voir les nouvelles données
        setTimeout(() => window.location.reload(), 1500);
      },
      error: (error) => {
        console.error('Erreur lors de la repopulation:', error);
        this.snackbarService.showError('❌ Erreur lors de la repopulation des données');
      }
    });
  }
}

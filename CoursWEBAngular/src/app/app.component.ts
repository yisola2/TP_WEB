import { Component } from '@angular/core';
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
import { AuthService } from './shared/auth.service';
import { Router} from '@angular/router';
import { AssignmentsService } from './shared/assignments.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule, MatDividerModule, MatToolbarModule, MatIconModule, MatSidenavModule, FormsModule, MatListItem, MatListModule,
    RouterModule, RouterLink, MatSlideToggleModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Application de gestion des devoirs à rendre (Assignments)';
  opened = false;

  constructor(private authService: AuthService, private router: Router, private assignmentsService:AssignmentsService) {}

  /*peuplerBD() {
    this.assignmentsService.peuplerBD();
  }*/
}

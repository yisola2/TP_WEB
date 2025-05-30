import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubmittedDirective } from  '../../shared/submitted.directive';
import { Assignment } from '../assignment.model';

import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AssignmentDetailComponent } from '../assignment-detail/assignment-detail.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatNativeDateModule } from '@angular/material/core';

import { MatListModule } from '@angular/material/list';
import { MatListItem } from '@angular/material/list';

import { Router, RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';

import { AssignmentsService } from '../../shared/assignments.service';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-add-assignment',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatInputModule, MatDatepickerModule, 
    MatFormFieldModule, MatInputModule, MatDividerModule, MatDatepickerModule, MatNativeDateModule
    , MatListModule, RouterModule, MatSelectModule, MatOptionModule],
  providers: [],
  templateUrl: './add-assignment.component.html',
  styleUrl: './add-assignment.component.css'
})
export class AddAssignmentComponent {
  constructor (private assignmentsService: AssignmentsService, private router: Router){}
  
  assignmentName = "";
  assignmentDate: Date = new Date();
  auteurNom = "";
  auteurPhoto = "";
  matiereNom = "";
  note: number | null = null;
  remarques = "";

  // Pour la liste des matières (exemple)
  matieres = [
    { nom: 'Base de données', image: 'assets/bdd.png', prof: { nom: 'Mme Dupont', photo: 'assets/dupont.png' } },
    { nom: 'Technologies Web', image: 'assets/web.png', prof: { nom: 'M. Martin', photo: 'assets/martin.png' } },
    { nom: 'Grails', image: 'assets/grails.png', prof: { nom: 'Mme Leroy', photo: 'assets/leroy.png' } }
  ];

  selectedAssignment!:Assignment;

  get matiereSelectionnee() {
    return this.matieres.find(m => m.nom === this.matiereNom);
  }

  onSubmit(){
    const generatedId = Math.floor(Math.random() * 1000000);
    const newAssignment = new Assignment();
    newAssignment.id = generatedId;
    newAssignment.name = this.assignmentName; 
    newAssignment.dueDate = this.assignmentDate; 
    newAssignment.postedOn = new Date();
    newAssignment.submitted = false;
    newAssignment.auteur = { nom: this.auteurNom, photo: this.auteurPhoto };
    const matiereObj = this.matiereSelectionnee;
    newAssignment.matiere = matiereObj ? {
      nom: matiereObj.nom,
      image: matiereObj.image,
      prof: matiereObj.prof
    } : { nom: this.matiereNom };
    
    this.assignmentsService.addAssignment(newAssignment)
      .subscribe({
        next: (message) => {
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Error adding assignment:', error);
        }
      });
  }

  assignmentClique(assignment: Assignment){
    this.selectedAssignment = assignment;
  }
}
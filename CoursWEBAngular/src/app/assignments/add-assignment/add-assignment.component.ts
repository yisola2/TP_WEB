import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubmittedDirective } from  '../../shared/submitted.directive';
import { Assignment } from '../assignment.model';

import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
import { MatStepperModule } from '@angular/material/stepper';

@Component({
  selector: 'app-add-assignment',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatButtonModule, 
    MatInputModule, 
    MatDatepickerModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatDividerModule, 
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule, 
    RouterModule, 
    MatSelectModule, 
    MatOptionModule,
    MatStepperModule
  ],
  providers: [],
  templateUrl: './add-assignment.component.html',
  styleUrl: './add-assignment.component.css'
})
export class AddAssignmentComponent {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  
  // Pour la liste des matières (exemple simple)
  matieres = ['Maths', 'Physique', 'Anglais', 'Base de données', 'Technologies Web', 'Grails'];

  constructor(
    private assignmentsService: AssignmentsService, 
    private router: Router,
    private _formBuilder: FormBuilder
  ) {
    this.firstFormGroup = this._formBuilder.group({
      nom: ['', Validators.required],
      dateDeRendu: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      matiere: ['', Validators.required]
    });
  }

  onSubmit(){
    if (this.firstFormGroup.invalid || this.secondFormGroup.invalid) {
      return; // Empêche la soumission si les formulaires ne sont pas valides
    }

    const generatedId = Math.floor(Math.random() * 1000000);
    const newAssignment = new Assignment();
    newAssignment.id = generatedId;
    newAssignment.name = this.firstFormGroup.value.nom; 
    newAssignment.dueDate = this.firstFormGroup.value.dateDeRendu; 
    newAssignment.postedOn = new Date();
    newAssignment.submitted = false;
    
    // Pour la matière, on prend la valeur simple du select
    newAssignment.matiere = { nom: this.secondFormGroup.value.matiere }; 
    
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
}
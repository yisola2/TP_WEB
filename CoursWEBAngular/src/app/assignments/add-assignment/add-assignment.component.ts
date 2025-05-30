import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { AssignmentsService } from '../../shared/assignments.service';
import { Assignment } from '../assignment.model';


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
    MatNativeDateModule,
    MatSelectModule,
    MatOptionModule,
    MatStepperModule,
    MatCardModule,
    MatIconModule
  ],
  providers: [],
  templateUrl: './add-assignment.component.html',
  styleUrl: './add-assignment.component.css'
})
export class AddAssignmentComponent {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

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
      return;
    }

    const generatedId = Math.floor(Math.random() * 1000000);
    const newAssignment = new Assignment();
    newAssignment.id = generatedId;
    newAssignment.name = this.firstFormGroup.value.nom;
    newAssignment.dueDate = this.firstFormGroup.value.dateDeRendu;
    newAssignment.postedOn = new Date();
    newAssignment.submitted = false;

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
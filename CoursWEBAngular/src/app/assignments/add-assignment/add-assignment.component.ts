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
import { MatiereService, Matiere } from '../../shared/matiere.service';
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
  firstFormGroup: FormGroup;   // Informations de base
  secondFormGroup: FormGroup;  // Matière

  // Récupération des matières depuis le service
  matieres: Matiere[] = this.matiereService.getMatieres();

  constructor(
    private assignmentsService: AssignmentsService,
    private router: Router,
    private _formBuilder: FormBuilder,
    private matiereService: MatiereService
  ) {
    // Étape 1 : Informations de base
    this.firstFormGroup = this._formBuilder.group({
      nom: ['', Validators.required],
      dateDeRendu: ['', Validators.required]
    });

    // Étape 2 : Matière
    this.secondFormGroup = this._formBuilder.group({
      matiereNom: ['', Validators.required]
    });
  }

  // Getter pour la matière sélectionnée
  get matiereSelectionnee(): Matiere | undefined {
    const matiereNom = this.secondFormGroup.get('matiereNom')?.value;
    return this.matiereService.getMatiereByNom(matiereNom);
  }

  onSubmit() {
    if (this.firstFormGroup.invalid || this.secondFormGroup.invalid) {
      return;
    }

    const generatedId = Math.floor(Math.random() * 1000000);
    const newAssignment = new Assignment();
    
    // Informations de base
    newAssignment.id = generatedId;
    newAssignment.name = this.firstFormGroup.value.nom;
    newAssignment.dueDate = this.firstFormGroup.value.dateDeRendu;
    newAssignment.postedOn = new Date();
    newAssignment.submitted = false; // Par défaut, aucun élève n'a encore rendu

    // Matière avec données enrichies du service
    const matiereObj = this.matiereSelectionnee;
    newAssignment.matiere = matiereObj ? {
      nom: matiereObj.nom,
      image: matiereObj.image,
      prof: matiereObj.prof
    } : { nom: this.secondFormGroup.value.matiereNom };

    // Les champs suivants restent vides car ils seront remplis plus tard :
    // - auteur : sera défini quand un élève spécifique rend le devoir
    // - note : sera définie par le prof après correction  
    // - remarques : seront définies par le prof après correction
    // - submitted : sera true quand l'élève rendra le devoir

    this.assignmentsService.addAssignment(newAssignment)
      .subscribe({
        next: (message) => {
          console.log('Devoir créé avec succès');
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Error adding assignment:', error);
        }
      });
  }
}
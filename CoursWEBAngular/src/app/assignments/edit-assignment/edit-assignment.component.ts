import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter, MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card'; // Ajouté
import { MatIconModule } from '@angular/material/icon'; // Ajouté

import { AssignmentsService } from '../../shared/assignments.service';
import { MatiereService, Matiere } from '../../shared/matiere.service';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-edit-assignment',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    MatCardModule,    // Ajouté
    MatIconModule     // Ajouté
  ],
  templateUrl: './edit-assignment.component.html',
  styleUrl: './edit-assignment.component.css',
})
export class EditAssignmentComponent implements OnInit{
  assignment: Assignment | undefined;
  assignmentName = '';
  assignmentDueDate?: Date = undefined;
  matiereNom = '';
  note: number | null = null;
  remarques = '';

  // Récupération de la liste des matières depuis le service
  matieres: Matiere[] = this.matiereService.getMatieres();

  constructor(
    private assignmentsServises: AssignmentsService,
    private route:ActivatedRoute,
    private router:Router,
    private matiereService: MatiereService
  ) {}

  get matiereSelectionnee(): Matiere | undefined {
    return this.matiereService.getMatiereByNom(this.matiereNom);
  }

  ngOnInit(){
    const id = this.route.snapshot.params['id'];
    this.assignmentsServises.getAssignment(id).subscribe(assignment => {
      this.assignment = assignment;
      if (assignment) {
        this.assignmentName = assignment.name;
        this.assignmentDueDate = assignment.dueDate;
        this.matiereNom = assignment.matiere?.nom || '';
        this.note = assignment.note;
        this.remarques = assignment.remarques || '';
        if (this.assignment) {
          this.assignment.submitted = assignment.submitted === true || String(assignment.submitted) === 'true';
        }
      }
    });
  }

  onSaveAssignment() {
    if (!this.assignment) return;
    if (this.assignmentName == '' || this.assignmentDueDate === undefined) return;
    
    this.assignment.name = this.assignmentName;
    this.assignment.dueDate = this.assignmentDueDate;
    
    // Utilisation du service pour récupérer la matière complète
    const matiereObj = this.matiereSelectionnee;
    this.assignment.matiere = matiereObj ? {
      nom: matiereObj.nom,
      image: matiereObj.image,
      prof: matiereObj.prof
    } : { nom: this.matiereNom };
    
    this.assignment.note = this.note ?? 0;
    this.assignment.remarques = this.remarques;
    
    this.assignmentsServises
      .updateAssignment(this.assignment)
      .subscribe((reponse) => {
        this.router.navigate(['/home']);
      });
  }
}
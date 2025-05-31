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
    
    // Validation de la note
    if (this.note !== null && this.note !== undefined) {
      if (this.note < 0 || this.note > 20) {
        console.error('La note doit être entre 0 et 20');
        this.router.navigate(['/assignment', this.assignment._id]);
        return;
      }
    }
    
    // Créer un objet avec seulement les champs autorisés
    const updateData: any = {
      _id: this.assignment._id,
      name: this.assignmentName,
      dueDate: this.assignmentDueDate,
      submitted: this.assignment.submitted,
      postedOn: this.assignment.postedOn
    };
    
    // Utilisation du service pour récupérer la matière complète
    const matiereObj = this.matiereSelectionnee;
    updateData.matiere = matiereObj ? {
      nom: matiereObj.nom,
      image: matiereObj.image,
      prof: matiereObj.prof
    } : { nom: this.matiereNom };
    
    // N'ajouter note et remarques QUE si l'assignment est submitted
    if (this.assignment.submitted) {
      updateData.note = this.note ?? 0;
      updateData.remarques = this.remarques;
    }
    
    // Conserver auteur si existant
    if (this.assignment.auteur) {
      updateData.auteur = this.assignment.auteur;
    }
    
    this.assignmentsServises
      .updateAssignment(updateData)
      .subscribe((reponse) => {
        this.router.navigate(['/assignment', this.assignment!._id]);
      });
  }
}
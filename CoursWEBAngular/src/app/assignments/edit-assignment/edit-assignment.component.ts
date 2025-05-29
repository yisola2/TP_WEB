import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';
import { AssignmentsService } from '../../shared/assignments.service';
import { Assignment } from '../assignment.model';
import { ActivatedRoute } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';

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
 ],
 templateUrl: './edit-assignment.component.html',
 styleUrl: './edit-assignment.component.css',
})
export class EditAssignmentComponent implements OnInit{
  assignment: Assignment | undefined;
  // Champs de formulaire
  assignmentName = '';
  assignmentDueDate?: Date = undefined;
  auteurNom = '';
  auteurPhoto = '';
  matiereNom = '';
  note: number | null = null;
  remarques = '';

  matieres = [
    { nom: 'Base de données', image: 'assets/bdd.png', prof: { nom: 'Mme Dupont', photo: 'assets/dupont.png' } },
    { nom: 'Technologies Web', image: 'assets/web.png', prof: { nom: 'M. Martin', photo: 'assets/martin.png' } },
    { nom: 'Grails', image: 'assets/grails.png', prof: { nom: 'Mme Leroy', photo: 'assets/leroy.png' } }
  ];

  constructor(private assignmentsServises: AssignmentsService, 
    private route:ActivatedRoute,
    private router:Router) {}

  get matiereSelectionnee() {
    return this.matieres.find(m => m.nom === this.matiereNom);
  }

  ngOnInit(){
    const id = this.route.snapshot.params['id'];
    this.assignmentsServises.getAssignment(id).subscribe(assignment => {
      this.assignment = assignment;
      if (assignment) {
        this.assignmentName = assignment.name;
        this.assignmentDueDate = assignment.dueDate;
        this.auteurNom = assignment.auteur?.nom || '';
        this.auteurPhoto = assignment.auteur?.photo || '';
        this.matiereNom = assignment.matiere?.nom || '';
        this.note = assignment.note;
        this.remarques = assignment.remarques || '';
        if (this.assignment) {
          this.assignment.submitted = assignment.submitted === true || String(assignment.submitted) === 'true';
        }
      }
    });

    console.log("Query Params :");
    console.log(this.route.snapshot.queryParams);
    console.log("Fragments :");
    console.log(this.route.snapshot.fragment);
  }

  onSaveAssignment() {
    if (!this.assignment) return;
    if (this.assignmentName == '' || this.assignmentDueDate === undefined) return;
    this.assignment.name = this.assignmentName;
    this.assignment.dueDate = this.assignmentDueDate;
    this.assignment.auteur = { nom: this.auteurNom, photo: this.auteurPhoto };
    const matiereObj = this.matiereSelectionnee;
    this.assignment.matiere = matiereObj ? {
      nom: matiereObj.nom,
      image: matiereObj.image,
      prof: matiereObj.prof
    } : { nom: this.matiereNom };
    this.assignment.note = this.note ?? 0;
    this.assignment.remarques = this.remarques;
    this.assignment.submitted = this.assignment.submitted === true || String(this.assignment.submitted) === 'true';
    this.assignmentsServises
      .updateAssignment(this.assignment)
      .subscribe((reponse) => {
        console.log(reponse.message);
        this.router.navigate(['/home']);
      });
  }
}
 
 
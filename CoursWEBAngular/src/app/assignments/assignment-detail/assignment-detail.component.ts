import { Component, OnInit, signal } from '@angular/core';
import { Assignment } from '../assignment.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AssignmentsService } from '../../shared/assignments.service';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-assignment-detail',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatCheckboxModule, 
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule
  ],
  templateUrl: './assignment-detail.component.html',
  styleUrl: './assignment-detail.component.css'
})
export class AssignmentDetailComponent implements OnInit {
  // Using a signal instead of an input
  assignmentTransmis = signal<Assignment | null>(null);

  constructor(private assignmentsServises: AssignmentsService, 
              private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    this.getAssignment();
  }
  
  private getAssignment() {
    const id = this.route.snapshot.params['id'];
    this.assignmentsServises.getAssignment(id).subscribe(assignment => {
      
      this.assignmentTransmis.set(assignment ?? null);
    });
  }

  onClickEdit(){
    if (this.assignmentTransmis()) {
      this.router.navigate(["assignment", this.assignmentTransmis()!._id, 'edit'],
      {queryParams:{name:this.assignmentTransmis()!.name},fragment:'edition'});
    }
  }

  onAssignmentRendu(){
    if (this.assignmentTransmis()) {
      // Using update to modify the signal value
      this.assignmentTransmis.update(assignment => {
        if (assignment) {
          return {...assignment, submitted: true};
        }
        return assignment;
      });
      
    this.assignmentsServises.updateAssignment(this.assignmentTransmis()!)
      .subscribe({
        next: (response) => {
          console.log('Assignment marked as submitted:', response);
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Error updating assignment:', error);
        }
      });
    }
  }

  onDelete(){
    if (this.assignmentTransmis()) {
      this.assignmentsServises.deleteAssignment(this.assignmentTransmis()!).subscribe((reponse) => {
        console.log(reponse.message); 
        this.router.navigate(["/home"]);
      });
      this.assignmentTransmis.set(null);
    }
  }

  confirmDelete() {
    if (confirm('Voulez-vous vraiment supprimer cet assignment ?')) {
      this.onDelete();
    }
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  onSaveCorrection() {
    if (this.assignmentTransmis()) {
      this.assignmentsServises.updateAssignment(this.assignmentTransmis()!)
        .subscribe({
          next: (response) => {
            console.log('Correction enregistrée:', response);
            // Optionnel : afficher une notification ou recharger les données
          },
          error: (error) => {
            console.error('Erreur lors de la sauvegarde de la correction:', error);
          }
        });
    }
  }
}
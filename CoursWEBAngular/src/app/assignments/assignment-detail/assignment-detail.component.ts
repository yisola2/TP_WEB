import { Component, OnInit, signal } from '@angular/core';
import { Assignment } from '../assignment.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';

import { AssignmentsService } from '../../shared/assignments.service';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-assignment-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatDividerModule
  ],
  templateUrl: './assignment-detail.component.html',
  styleUrl: './assignment-detail.component.css'
})
export class AssignmentDetailComponent implements OnInit {
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
      this.assignmentTransmis.update(assignment => {
        if (assignment) {
          return {...assignment, submitted: true};
        }
        return assignment;
      });

    this.assignmentsServises.updateAssignment(this.assignmentTransmis()!)
      .subscribe({
        next: (response) => {
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
          },
          error: (error) => {
            console.error('Erreur lors de la sauvegarde de la correction:', error);
          }
        });
    }
  }
}
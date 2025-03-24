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

@Component({
  selector: 'app-add-assignment',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatInputModule, MatDatepickerModule, 
    MatFormFieldModule, MatInputModule, MatDividerModule, MatDatepickerModule, MatNativeDateModule
    , MatListModule, RouterModule],
  providers: [],
  templateUrl: './add-assignment.component.html',
  styleUrl: './add-assignment.component.css'
})
export class AddAssignmentComponent {
  constructor (private assignmentsService: AssignmentsService, private router: Router){}
  
  assignmentName = "";
  assignmentDate: Date = new Date();
  selectedAssignment!:Assignment;

  onSubmit(){
    const newAssignment = new Assignment();
    newAssignment.id = Math.floor(Math.random()*1000);
    newAssignment.name = this.assignmentName; 
    newAssignment.assignmentDueDate = this.assignmentDate; 
    newAssignment.postedOn = new Date();
    newAssignment.submitted = false;
    
    console.log('Adding assignment:', newAssignment); // Add this for debugging
    
    this.assignmentsService.addAssignment(newAssignment)
      .subscribe({
        next: (message) => {
          console.log('Assignment added successfully:', message);
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
import { Component, output } from '@angular/core';
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
  //@Output() nouvelAssignment= new EventEmitter<Assignment>();
  constructor (private assignmentsService: AssignmentsService, private router: Router){}
  assignmentName = "";
  assignmentDate: Date = new Date();
  selectedAssignment!:Assignment;
  assignmentdueDate: any;
  assignments = [
    { name: 'Devoir 1', submitted: true, assignmentdueDate: new Date('2025-02-01') },
    { name: 'Devoir 2', submitted: false, assignmentdueDate: new Date('2025-02-15') },
    { name: 'Devoir 3', submitted: true, assignmentdueDate: new Date('2025-02-20') }
  ];

  onSubmit(nameAssignment: any){
    const newAssignment = new Assignment();
    newAssignment.id = Math.floor(Math.random()*1000)
    newAssignment.name = this.assignmentName;
    newAssignment.assignmentDueDate = this.assignmentdueDate;
    newAssignment.submitted = false;
    //this.assignments.push(newAssignment);
    //this.nouvelAssignment.emit(newAssignment);
    this.assignmentsService.addAssignment(newAssignment).subscribe(message => console.log(message));
    this.router.navigate(['/home']);
  }

  assignmentClique(assignment: Assignment){
    this.selectedAssignment = assignment;
  }
}
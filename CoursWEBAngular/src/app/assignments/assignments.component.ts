import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubmittedDirective } from '../shared/submitted.directive';
import { Assignment } from './assignment.model';
import { AssignmentsService } from '../shared/assignments.service';

import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AssignmentDetailComponent } from './assignment-detail/assignment-detail.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatNativeDateModule } from '@angular/material/core';

import { MatListModule } from '@angular/material/list';
import { MatListItem } from '@angular/material/list';

import { RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { MatPaginatorModule } from '@angular/material/paginator';


@Component({
  selector: 'app-assignments',
  standalone: true,
  imports: [
    CommonModule,
    SubmittedDirective,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatListItem,
    RouterModule,
    RouterLink,
    MatSlideToggleModule,
    MatPaginatorModule,
    AssignmentDetailComponent
],
  providers: [],
  templateUrl: './assignments.component.html',
  styleUrl: './assignments.component.css'
})
export class AssignmentsComponent implements OnInit {

  formVisible = false;
  titre = 'Assignments List';
  ajoutActive = true;
  assignmentName = "";
  postedOn = new Date();
  SelectedAssignment?: Assignment;
  assignments: Assignment[] = [];

  constructor (private assignmentsService:AssignmentsService) {}

  assignmentDueDate: any;

  
  getAssignment(){
    this.assignmentsService.getAssignments().subscribe(assignments => this.assignments = assignments);
  }
  
  ngOnInit(): void {
    this.getAssignment();
    }

  onSubmit(){
    const newAssignment = new Assignment();
    newAssignment.id = Math.floor(Math.random()*1000);

    newAssignment.name= this.assignmentName;
    newAssignment.assignmentDueDate = this.assignmentDueDate;
    newAssignment.submitted = false;
    
    newAssignment.postedOn = this.postedOn;
    this.assignments.push(newAssignment);
  }
  
  assignmentClick(assignment: Assignment){
    this.SelectedAssignment = {...assignment};
  }
  
  /*onAddAssignmentBtnClick() {
    //this.formVisible = true;
  }
    
  onNouvelAssignment(event:Assignment){
    //this.assignments.push(event);
    this.assignmentsService.addAssignment(event).subscribe(message => console.log(message));

    this.formVisible = false;
  }
    */
  
}
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
    RenduDirective, 
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
    MatPaginatorModule
  ],
  providers: [],
  templateUrl: './assignments.component.html',
  styleUrl: './assignments.component.css'
})
export class AssignmentsComponent implements OnInit {

  //Pour gérer la pagination
  page:number =1;
  limit:number =10;
  totaleDocs!:number;
  totalePages!:number;
  nextPage!:number;
  prevPage!:number;
  hasPrevPage!:boolean;
  hasNextPage!:boolean;

  //formVisible = false;
  titre = 'Assignments List';
  ajoutActive = true;
  assignmentName = "";
  AssignmentDueDate: Date = new Date();
  //assignmentSelectionne!:Assignment;
  assignments: Assignment[] = [];

  constructor (private assignmentsService:AssignmentsService) {}

  assignmentDueDate: any;

  premierePage() {
    this.page = 1;
    this.ngOnInit();
  }
  
  dernierePage() {
    this.page = this.totalePages;
    this.ngOnInit();
  }
  
  pagePrecedente() {
    if (this.hasPrevPage) {
      this.page -= 1;
      this.ngOnInit();
    }
  }
  
  pageSuivante() {
    if (this.hasNextPage) {
      this.page += 1;
      this.ngOnInit();
    }
  }

  ngOnInit(): void {
    //this.getAssignment();

    this.assignmentsService.getAssignmentsPagine(this.page, this.limit).subscribe(data => {
        this.assignments = data.docs;
        this.page = data.page;
        this.limit = data.limit;
        this.totaleDocs = data.totalDocs;
        this.totalePages = data.totalPages;
        this.nextPage = data.nextPage;
        this.prevPage = data.prevPage;
        this.hasPrevPage = data.hasPrevPage;
        this.hasNextPage = data.hasNextPage;
      });
    }

  getAssignment(){
    this.assignmentsService.getAssignments().subscribe(assignments => this.assignments = assignments);
  }


  onSubmit(nomAssignment: any){
    const newAssignment = new Assignment();
    newAssignment.name= this.assignmentName;
    newAssignment.assignmentDueDate = this.assignmentDueDate;
    newAssignment.submitted = false;
    this.assignments.push(newAssignment);
  }
  /*
  assignmentClique(assignment: Assignment){
    this.assignmentSelectionne = assignment;
  }
  */
  /*onAddAssignmentBtnClick() {
    //this.formVisible = true;
  }
    
  onNouvelAssignment(event:Assignment){
    //this.assignments.push(event);
    this.assignmentsService.addAssignment(event).subscribe(message => console.log(message));

    this.formVisible = false;
  }
    */

  pageChange(event: any) {
    this.page = event.pageIndex + 1; // Angular Material utilise un index 0-based
    this.limit = event.pageSize;
    this.ngOnInit();
  }
  
}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubmittedDirective } from '../shared/submitted.directive';
import { Assignment } from './assignment.model';
import { AssignmentsService } from '../shared/assignments.service';
import { MatiereService, Matiere } from '../shared/matiere.service';
import { AuthService } from '../shared/auth.service';

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

import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { NotSubmittedDirective } from '../shared/not-submitted.directive';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-assignments',
  standalone: true,
  imports: [
    CommonModule,
    SubmittedDirective,
    NotSubmittedDirective,
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
    RouterModule,
    RouterLink,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule
    //AssignmentDetailComponent
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

  totalAssignments = 0;
  pageSize = 10;
  currentPage = 0;

  constructor (
    private assignmentsService:AssignmentsService, 
    private authService: AuthService,
    private matiereService: MatiereService
  ) {}

  assignmentDueDate: any;

  displayedColumns: string[] = ['name', 'auteur', 'photoEleve', 'matiere', 'note', 'prof', 'remarques', 'date', 'postedOn', 'statut', 'actions'];

  ngOnInit(): void {
    this.getAssignments(1);
  }
  
  // Méthode pour enrichir les assignments avec les données des matières
  private enrichAssignmentsWithMatiereData(assignments: Assignment[]): Assignment[] {
    return assignments.map(assignment => {
      if (assignment.matiere?.nom) {
        const matiereDetails = this.matiereService.getMatiereByNom(assignment.matiere.nom);
        if (matiereDetails) {
          // Enrichir avec les données du service (priorité sur les données backend)
          assignment.matiere = {
            ...assignment.matiere,
            image: matiereDetails.image,
            prof: {
              nom: matiereDetails.prof.nom,
              photo: matiereDetails.prof.photo
            }
          };
        }
      }
      return assignment;
    });
  }
  
  getAssignments(page: number = 1) {
    this.assignmentsService.getAssignmentsWithPagination(page, this.pageSize)
      .subscribe(result => {
        console.log('Pagination result:', result);
        const rawAssignments = result.assignments || [];
        // Enrichir les assignments avec les données des matières
        this.assignments = this.enrichAssignmentsWithMatiereData(rawAssignments);
        this.totalAssignments = result.paginator?.totalAssignments || 0;
      });
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getAssignments(event.pageIndex + 1);
  }
  
  
  

  /*onSubmit(){
    const newAssignment = new Assignment();

    const randomId = Math.floor(Math.random() * 1000000);
    newAssignment.id = randomId;

    newAssignment.name= this.assignmentName;
    newAssignment.assignmentDueDate = this.assignmentDueDate;
    newAssignment.submitted = false;

    newAssignment.postedOn = this.postedOn;
    this.assignments.push(newAssignment);
  }*/
  
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
  
  isAdmin(): boolean {
    return this.authService.isAdmin();
  }
}
import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Observable, of, throwError } from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  // Static assignment data
  private assignments: Assignment[] = [];

  constructor(private loggingService: LoggingService) { }

  getAssignment(id: number): Observable<Assignment | undefined> {
    const assignment = this.assignments.find(a => a.id === id);
    return of(assignment);
  }

  getAssignments(): Observable<Assignment[]> {
    return of(this.assignments);
  }

  addAssignment(assignment: Assignment): Observable<any> {
    // Assign a new id (max id + 1)
    assignment.id = Math.max(...this.assignments.map(a => a.id)) + 1;
    this.assignments.push(assignment);
    this.loggingService.log(assignment.name, "ajouté");
    return of({message: 'Assignment ajouté'});
  }

  updateAssignment(assignment: Assignment): Observable<any> {
    const index = this.assignments.findIndex(a => a.id === assignment.id);
    if (index !== -1) {
      this.assignments[index] = assignment;
    }
    return of({message: 'Assignment modifié'});
  }

  deleteAssignment(assignment: Assignment): Observable<any> {
    const index = this.assignments.findIndex(a => a.id === assignment.id);
    if (index !== -1) {
      this.assignments.splice(index, 1);
    }
    return of({message: 'Assignment supprimé'});
  }
  }

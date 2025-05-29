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
  backendURL="https://assignment-api-xftj.onrender.com/api/assignments";
  // Static assignment data
  private assignments: Assignment[] = [];

  constructor(private loggingService: LoggingService, private http: HttpClient) { }

  getAssignment(id: string): Observable<Assignment | undefined> {
    return this.http.get<Assignment>(`${this.backendURL}/${id}`);
  }

  getAssignments(): Observable<Assignment[]> {
    return this.http.get<any>(this.backendURL);
  }

  addAssignment(assignment: Assignment): Observable<any> {
    if (!Number.isFinite(assignment.id)) {
      assignment.id = this.assignments.length > 0
        ? Math.max(...this.assignments.map(a => a.id)) + 1
        : 1; // fallback safe
    }
    this.assignments.push(assignment);
    this.loggingService.log(assignment.name, "ajouté");
    return of({message: 'Assignment ajouté'});
}

  updateAssignment(assignment: Assignment): Observable<any> {
    console.log('Updating assignment with ID:', assignment.id);
    
    // Find the assignment to update
    const index = this.assignments.findIndex(a => a.id === assignment.id);
    
    if (index !== -1) {
      // Create a NEW object to avoid reference issues
      this.assignments[index] = {...assignment};
      console.log('Assignment updated locally:', this.assignments[index]);
    } else {
      console.warn('Assignment not found with ID:', assignment.id);
    }
    
    return of({message: 'Assignment modifié'});
  }

  deleteAssignment(assignment: Assignment): Observable<any> {
    return this.http.delete(`${this.backendURL}/${assignment._id}`);
  }
  }

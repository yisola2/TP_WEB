import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Observable, of, throwError } from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  backendURL="https://assignment-api-xftj.onrender.com/api/assignments";
  // Static assignment data
  private assignments: Assignment[] = [];

  constructor(private loggingService: LoggingService, private http: HttpClient) { }

  getAssignment(id: string): Observable<Assignment | undefined> {
    return this.http.get<Assignment>(`${this.backendURL}/${id}`).pipe(
      map(assignment => {
        console.log('Raw assignment from backend:', assignment);
        if (assignment && assignment.dueDate && typeof assignment.dueDate === 'string') {
          assignment.dueDate = new Date(assignment.dueDate);
          console.log('Converted dueDate:', assignment.dueDate);
        }
        if (assignment && assignment.postedOn && typeof assignment.postedOn === 'string') {
          assignment.postedOn = new Date(assignment.postedOn);
        }
        console.log('Final assignment after conversion:', assignment);
        return assignment;
      })
    );
  }

  getAssignments(): Observable<Assignment[]> {
    return this.http.get<any>(this.backendURL).pipe(
      map(result => {
        let assignments = result.assignments || result.docs || result;
        return assignments.map((a: Assignment) => {
          if (a.dueDate && typeof a.dueDate === 'string') {
            a.dueDate = new Date(a.dueDate);
          }
          if (a.postedOn && typeof a.postedOn === 'string') {
            a.postedOn = new Date(a.postedOn);
          }
          return a;
        });
      })
    );
  }

  addAssignment(assignment: Assignment): Observable<any> {
    this.loggingService.log(assignment.name, "ajouté");
    // Ensure dates are properly formatted for backend
    const assignmentToSend = { ...assignment };
    if (assignmentToSend.dueDate instanceof Date) {
      assignmentToSend.dueDate = assignmentToSend.dueDate as any; // Keep as Date object
    }
    // Ensure postedOn is a Date or ISO string
    if (assignmentToSend.postedOn instanceof Date) {
      assignmentToSend.postedOn = assignmentToSend.postedOn.toISOString();
    }
    return this.http.post<Assignment>(this.backendURL, assignmentToSend);
}

  updateAssignment(assignment: Assignment): Observable<any> {
    const assignmentToSend = { ...assignment };
    if (assignmentToSend.dueDate instanceof Date) {
      assignmentToSend.dueDate = assignmentToSend.dueDate as any;
    }
    // Ensure postedOn is a Date or ISO string
    if (assignmentToSend.postedOn instanceof Date) {
      assignmentToSend.postedOn = assignmentToSend.postedOn.toISOString();
    }
  
    return this.http.put<Assignment>(`${this.backendURL}/${assignment._id}`, assignmentToSend);
  }
  

  deleteAssignment(assignment: Assignment): Observable<any> {
    return this.http.delete(`${this.backendURL}/${assignment._id}`);
  }
  
  getAssignmentsWithPagination(page: number = 1, limit: number = 10): Observable<any> {
    return this.http.get<any>(`${this.backendURL}?page=${page}&limit=${limit}`).pipe(
      map(result => {
        if (result.assignments) {
          result.assignments = result.assignments.map((assignment: Assignment) => {
            if (assignment.dueDate && typeof assignment.dueDate === 'string') {
              assignment.dueDate = new Date(assignment.dueDate);
            }
            if (assignment.postedOn && typeof assignment.postedOn === 'string') {
              assignment.postedOn = new Date(assignment.postedOn);
    }
            return assignment;
          });
        }
        return result;
      })
    );
  }

  populateData(): Observable<any> {
    const populateURL = "https://assignment-api-xftj.onrender.com/api/populate";
    return this.http.post<any>(populateURL, {}).pipe(
      catchError(error => {
        console.error('Erreur populate:', error);
        return throwError(() => error);
      })
    );
  }
  }

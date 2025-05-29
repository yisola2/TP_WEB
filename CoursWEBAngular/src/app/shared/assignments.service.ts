import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Observable, of, throwError } from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    return this.http.get<Assignment[]>(this.backendURL).pipe(
      map(assignments => {
        console.log('Raw assignments from backend:', assignments);
        const convertedAssignments = assignments.map(assignment => {
          if (assignment.dueDate && typeof assignment.dueDate === 'string') {
            assignment.dueDate = new Date(assignment.dueDate);
          }
          if (assignment.postedOn && typeof assignment.postedOn === 'string') {
            assignment.postedOn = new Date(assignment.postedOn);
          }
          return assignment;
        });
        console.log('Final assignments after conversion:', convertedAssignments);
        return convertedAssignments;
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
    return this.http.post<Assignment>(this.backendURL, assignmentToSend);
  }

  updateAssignment(assignment: Assignment): Observable<any> {
    const assignmentToSend = { ...assignment };
    if (assignmentToSend.dueDate instanceof Date) {
      assignmentToSend.dueDate = assignmentToSend.dueDate as any;
    }
  
    return this.http.put<Assignment>(`${this.backendURL}/${assignment._id}`, assignmentToSend);
  }
  

  deleteAssignment(assignment: Assignment): Observable<any> {
    return this.http.delete(`${this.backendURL}/${assignment._id}`);
  }
  
}

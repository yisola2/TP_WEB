import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Observable, of, throwError } from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient } from '@angular/common/http';
import { bdInitialAssignments } from './data';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

  assignments: Assignment[] = [];

  constructor( private loggingService:LoggingService, private http:HttpClient) { }
  //url = "http://localhost:8010/api/assignments";
  url = "https://apicoursangularm1miage2024-2025-1-ypys.onrender.com/api/assignments"

  getAssignment(id:number): Observable<Assignment|undefined> {
    /*const a:Assignment|undefined = this.assignments.find(ass => (ass.id == id));
    return of(a);*/
    return this.http.get<Assignment>(this.url + "/" + id);
  }
  getAssignments(): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(this.url);
    //return of(this.assignments);
  }

  getNewId():number{
    return this.assignments.length+1;
  }

  addAssignment (assignment: Assignment): Observable<any> {
    //this.assignments.push(assignment);
    //this.loggingService.log(assignment.nom,"ajouté");
    //return of('Assignment ajouté');
    return this.http.post<Assignment>(this.url, assignment);
  }
  updateAssignment( assignment: Assignment): Observable<any>{
    //....
    return this.http.put<Assignment>(this.url, assignment);
  }
  deleteAssignment(assignment: Assignment): Observable<any> {
    return this.http.delete<Assignment>(`${this.url}/${assignment._id}`).pipe(
        catchError((error) => {
            console.error("Erreur lors de la suppression de l'assignement:", error);
            alert(`Une erreur est survenue lors de la suppression de l'assignement: ${error.message}`);
            return throwError(() => new Error(`Erreur lors de la suppression de l'assignement: ${error.message}`));
        })
    );
  }


  peuplerBD() {
    console.log('Début du peuplement de la base de données...');
    let total = bdInitialAssignments.length;
    let traites = 0;
  
    bdInitialAssignments.forEach(a => {
      let newAssignment = new Assignment();
      newAssignment.name = a.name;
      newAssignment.id = a.id;
      newAssignment.assignmentDueDate = new Date(a.assignmentDueDate);
      newAssignment.submitted = a.submitted;
  
      this.addAssignment(newAssignment).subscribe({
        next: () => {
          traites++;
          console.log(`Insertion réussie (${traites}/${total})`);
          if (traites === total) {
            console.log('Peuplement terminé avec succès.');
          }
        },
        error: (err) => {
          console.error('Erreur lors de l\'insertion :', err);
        }
      });
    });
  }
  getAssignmentsPagine(page:Number, limit:number):Observable<any>{
    return this.http.get<any>(this.url+ '?page=' +page + '&limit=' + limit);
  }
  
}

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';
import { AssignmentsService } from '../../shared/assignments.service';
import { Assignment } from '../assignment.model';
import { ActivatedRoute } from '@angular/router';


@Component({
 selector: 'app-edit-assignment',
 standalone: true,
 providers: [provideNativeDateAdapter()],
 imports: [
   FormsModule,
   MatInputModule,
   MatFormFieldModule,
   MatDatepickerModule,
   MatButtonModule,
 ],
 templateUrl: './edit-assignment.component.html',
 styleUrl: './edit-assignment.component.css',
})
export class EditAssignmentComponent implements OnInit{
  assignment: Assignment | undefined;
  // Pour les champs de formulaire
  assignmentName = '';
  assignmentDueDate?: Date = undefined;
 
  constructor(private assignmentsServises: AssignmentsService, 
    private route:ActivatedRoute,
    private router:Router) {}

  
    ngOnInit(){
      const id = +this.route.snapshot.params['id'];
      this.assignmentsServises.getAssignment(id).subscribe(assignment => this.assignment= assignment);

      console.log("Query Params :");
      console.log(this.route.snapshot.queryParams);
      console.log("Fragments :");
      console.log(this.route.snapshot.fragment);
    }
 
  onSaveAssignment() {
    if (!this.assignment) return;
    if (this.assignmentName == '' || this.assignmentDueDate === undefined) return;
 
    // on récupère les valeurs dans le formulaire
    this.assignment.name = this.assignmentName;
    this.assignment.assignmentDueDate = this.assignmentDueDate;
    this.assignmentsServises
      .updateAssignment(this.assignment)
      .subscribe((reponse) => {
        console.log(reponse.message);
 
        // navigation vers la home page
        this.router.navigate(['/home']);
      });
  }
}
 
 
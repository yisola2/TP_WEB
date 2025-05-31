import { Component, OnInit, signal } from '@angular/core';
import { Assignment } from '../assignment.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';

import { AssignmentsService } from '../../shared/assignments.service';
import { MatiereService } from '../../shared/matiere.service';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-assignment-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatDividerModule,
    MatInputModule
  ],
  templateUrl: './assignment-detail.component.html',
  styleUrl: './assignment-detail.component.css'
})
export class AssignmentDetailComponent implements OnInit {
  assignmentTransmis = signal<Assignment | null>(null);

  constructor(
    private assignmentsServises: AssignmentsService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private matiereService: MatiereService
  ) {}

  ngOnInit() {
    this.getAssignment();
  }

  private getAssignment() {
    const id = this.route.snapshot.params['id'];
    this.assignmentsServises.getAssignment(id).subscribe(assignment => {
      if (assignment) {
        // Enrichir l'assignment avec les données des matières du service
        const enrichedAssignment = this.enrichAssignmentWithMatiereData(assignment);
        this.assignmentTransmis.set(enrichedAssignment);
      } else {
        this.assignmentTransmis.set(null);
      }
    });
  }

  // Méthode pour enrichir un assignment avec les données des matières
  private enrichAssignmentWithMatiereData(assignment: Assignment): Assignment {
    if (assignment.matiere?.nom) {
      const matiereDetails = this.matiereService.getMatiereByNom(assignment.matiere.nom);
      if (matiereDetails) {
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
  }

  onClickEdit(){
    if (this.assignmentTransmis()) {
      this.router.navigate(["assignment", this.assignmentTransmis()!._id, 'edit'],
      {queryParams:{name:this.assignmentTransmis()!.name},fragment:'edition'});
    }
  }

  onAssignmentRendu(){
    if (this.assignmentTransmis()) {
      const currentUser = this.authService.getCurrentUser();
      console.log('Current user:', currentUser);
      
      const avatarUrl = this.generateUserAvatar(currentUser?.username || 'anonymous');
      console.log('Generated avatar URL:', avatarUrl);
      
      let updatedAssignment: Assignment | null = null;
      
      this.assignmentTransmis.update(assignment => {
        if (assignment) {
          updatedAssignment = {
            ...assignment, 
            submitted: true,
            auteur: {
              nom: currentUser?.username || 'Utilisateur inconnu',
              photo: avatarUrl
            }
          };
          console.log('Updated assignment:', updatedAssignment);
          return updatedAssignment;
        }
        return assignment;
      });

      if (updatedAssignment) {
        console.log('Sending to backend:', updatedAssignment);
        this.assignmentsServises.updateAssignment(updatedAssignment)
          .subscribe({
            next: (response) => {
              console.log('Devoir marqué comme rendu avec succès', response);
              this.router.navigate(['/home']);
            },
            error: (error) => {
              console.error('Error updating assignment:', error);
            }
          });
      }
    }
  }

  // Génère un avatar basé sur le username (stable - même avatar pour même user)
  private generateUserAvatar(username: string): string {
    // Utilise le username pour générer un hash stable
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
      hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
    const avatarId = Math.abs(hash % 1000) + 1; // 1-1000
    return `https://robohash.org/${avatarId}.png?size=150x150&set=set1`;
  }

  onDelete(){
    if (this.assignmentTransmis()) {
      this.assignmentsServises.deleteAssignment(this.assignmentTransmis()!).subscribe((reponse) => {
        this.router.navigate(["/home"]);
      });
      this.assignmentTransmis.set(null);
    }
  }

  confirmDelete() {
    if (confirm('Voulez-vous vraiment supprimer cet assignment ?')) {
      this.onDelete();
    }
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  onSaveCorrection() {
    if (this.assignmentTransmis()) {
      this.assignmentsServises.updateAssignment(this.assignmentTransmis()!)
        .subscribe({
          next: (response) => {
            console.log('Correction sauvegardée avec succès');
            this.router.navigate(['/home']);
          },
          error: (error) => {
            console.error('Erreur lors de la sauvegarde de la correction:', error);
          }
        });
    }
  }
}
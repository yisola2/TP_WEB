import { Routes } from '@angular/router';
import { AssignmentsComponent } from './assignments/assignments.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { AuthGuard } from './shared/auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminGuard } from './shared/admin.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: AssignmentsComponent },
    { path: 'add', component: AddAssignmentComponent, canActivate: [AdminGuard] },
    { path: 'assignment/:id', component:AssignmentDetailComponent, canActivate: [AuthGuard]},
    { path: 'assignment/:id/edit', component:EditAssignmentComponent, canActivate: [AdminGuard]},
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
];
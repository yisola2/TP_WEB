# Assignment Management Application

A simple web application built with Angular for managing academic assignments. This app allows users to create, view, edit, and delete assignments with role-based access control.

## Features

- **Assignment Management**: Create, view, edit, and delete assignments
- **Due Date Tracking**: Keep track of assignment deadlines with a visual calendar
- **Status Monitoring**: Visual indicators for submitted and non-submitted assignments
- **User Authentication**: Role-based access (admin/user) with different permissions
- **Responsive Design**: Material Design interface that works on all devices

## Prerequisites

- Node.js
- npm 
- Angular CLI

## Installation

1. Clone the repository:
   ```bash
   git clone <repo_link>
   cd CoursWEBAngular
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   ng serve
   ```

4. Open your browser and navigate to `http://localhost:4200`

## Project Structure

```
src/
├── app/
│   ├── assignments/                # Assignment components
│   │   ├── add-assignment/         # Add new assignments
│   │   ├── assignment-detail/      # View assignment details
│   │   ├── edit-assignment/        # Edit existing assignments
│   │   ├── assignment.model.ts     # Assignment data model
│   │   └── assignments.component.* # Main assignments list
│   ├── login/                      # Authentication components
│   ├── shared/                     # Shared services and directives
│   │   ├── auth.service.ts         # Authentication logic
│   │   ├── auth.guard.ts           # Route protection
│   │   ├── assignments.service.ts  # Assignment data management
│   │   ├── logging.service.ts      # Logging functionality
│   │   ├── submitted.directive.ts  # Visual styling for submitted
│   │   └── not-submitted.directive.ts # Visual styling for not submitted
│   ├── app.component.*             # App root component
│   ├── app.routes.ts               # App routing configuration
│   └── app.config.ts               # App configuration
└── ...
```

## Usage

### Login Credentials

The application comes with two predefined users:
- **Admin**: login: `admin`, password: `azerty`
- **Regular User**: login: `user`, password: `azerty`

### Main Functionality

1. **View Assignments**: The home page displays all assignments with their submission status
2. **Add Assignment**: Click "Add Assignment" to create a new assignment
3. **View Details**: Click on an assignment to see its details
4. **Edit Assignment**: Admin users can edit assignments by clicking the "Edit" button
5. **Delete Assignment**: Admin users can delete assignments by clicking the "Delete" button
6. **Mark as Submitted**: Users can mark assignments as submitted

## Role-Based Access

- **Admin Users**: Have full access to create, read, update, and delete assignments
- **Regular Users**: Can view assignments and mark them as submitted, but cannot edit or delete them

### Key Components

- **AssignmentsComponent**: Displays the list of all assignments
- **AddAssignmentComponent**: Provides a form to create new assignments
- **AssignmentDetailComponent**: Shows detailed information for a specific assignment
- **EditAssignmentComponent**: Allows editing existing assignments
- **LoginComponent**: Handles user authentication

### Key Services

- **AssignmentsService**: Manages assignment data operations
- **AuthService**: Handles authentication and authorization
- **LoggingService**: Provides logging functionality

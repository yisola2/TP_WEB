import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private users = [
    { login: 'admin', password: 'admin123', role: 'admin' },
    { login: 'user', password: 'user123', role: 'user' }
  ];

  private currentUser: any = null;

  loggedIn= false;

  logIn(login: string, password: string) {
    const user = this.users.find(u => u.login === login && u.password === password);
    if (user) {
      this.currentUser = user;
      return true;
    }
    return false;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  logOut() {
    this.currentUser = null;
  }

  isLogged(): boolean {
    return this.currentUser !== null;
  }
  
  isAdmin(): boolean {
    return this.currentUser?.role === 'admin';
  }
}

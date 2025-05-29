import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://assignment-api-xftj.onrender.com/api';
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  private userRole = new BehaviorSubject<string | null>(this.getRole());

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.user.role);
        this.loggedIn.next(true);
        this.userRole.next(res.user.role);
      })
    );
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, { username, password });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.loggedIn.next(false);
    this.userRole.next(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  isAdmin(): boolean {
    return this.getRole() === 'admin';
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }
}

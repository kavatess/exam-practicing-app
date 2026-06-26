import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { User, UserRoles, UserStatus } from '@libs/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Use BehaviorSubject to hold the authentication state.
  // Initially, the user is not authenticated.
  private _isAuthenticated = new BehaviorSubject<boolean>(false);

  private _currentUser = new BehaviorSubject<User | null>({
    id: 'admin-1',
    username: 'admin',
    firstName: 'Admin',
    lastName: 'User',
    schoolName: '',
    city: '',
    yob: 2000,
    phone: '',
    email: 'admin@example.com',
    role: UserRoles.Admin,
    status: UserStatus.Active,
  });

  /**
   * Observable to check if the user is authenticated.
   * Components can subscribe to this to show/hide content.
   */
  public isAuthenticated$: Observable<boolean> = this._isAuthenticated.asObservable();

  public currentUser$: Observable<User | null> = this._currentUser.asObservable();

  constructor() { }

  /**
   * Checks if the user is currently authenticated.
   * For the guard, this can be a simple check of the subject's value.
   */
  isLoggedIn(): boolean {
    return this._isAuthenticated.getValue();
  }

  getCurrentUser(): User | null {
    return this._currentUser.getValue();
  }

  /**
   * Simulates a login process.
   * @returns An observable that completes after "logging in".
   */
  login(): Observable<boolean> {
    // In a real app, this would involve an API call.
    // Here, we just set the authentication state to true.
    return of(true).pipe(
      tap(() => this._isAuthenticated.next(true))
    );
  }

  /**
   * Simulates a logout process.
   */
  logout(): void {
    // Set the authentication state to false.
    this._isAuthenticated.next(false);
  }
}

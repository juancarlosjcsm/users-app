import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { User } from '../models/users.model';

@Injectable({ providedIn: 'root' })
export class UserService {

  private apiUrl = 'https://reqres.in/api/users';
  _users = signal<User[]>([]);
  _http = inject(HttpClient);
  _page = signal<number>(1);
  _numPages = signal<number>(1);
  _totalNumUsers = signal<number>(12);

  constructor() {
    this.setUsers();
  }

  getUsers(): Observable<User[]> {
    return this._http
      .get<any>(this.apiUrl, { params: { page: this._page() } })
      .pipe(map((response: any) => {
        this._numPages.set(response.total_pages);
        this._totalNumUsers.set(response.total)
        return response.data}));
  }

  setUsers(isPagination: boolean = false, page?: number) {
    if(page)
      this._page.set(page);
    if(this._totalNumUsers() != this._users().length)
      this.getUsers()
        .pipe(
          tap((users: User[]) => {
            if (isPagination) {
              this._users.set(users);
            } else {
              this._users.update((currentUsers) => [...currentUsers, ...users]);
            }
          })
        )
        .subscribe();

    this._page.set(this._page() + 1);
  }

  sortUsers(order: string) {
    const sortedUsers = [...this._users()].sort((a, b) => {
      return order === 'asc'
        ? a.email.localeCompare(b.email)
        : b.email.localeCompare(a.email);
    });
    this._users.set(sortedUsers);
  }


  resetUsers() {
    this._page.set(1);
    this._users.set([]);
    this.setUsers(true);
  }

  getUser(id: number): Observable<User> {
    return this._http.get<any>(`${this.apiUrl}/${id}`).pipe(map((response: any) => response.data));
  }

  createUser(user: User): Observable<any> {
    return this._http.post(this.apiUrl, user);
  }

  updateUser(id: number, user: User): Observable<any> {
    return this._http.put(`${this.apiUrl}/${id}`, user);
  }
}

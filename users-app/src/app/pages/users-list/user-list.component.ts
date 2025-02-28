import { Component, HostListener, inject } from '@angular/core';
import { UserService } from '../../services/users.service';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { catchError, EMPTY, tap } from 'rxjs';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [UserCardComponent,ReactiveFormsModule, PaginatorModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export default class UserListComponent {
  private readonly _userService = inject(UserService);
  users = this._userService._users;
  numPages = this._userService._numPages;
  page = this._userService._page;
  userForm: FormGroup;
  order: string = 'asc';

  private readonly _fb = inject(FormBuilder);

   constructor() {
      this.userForm = this._fb.group({
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
      });
    }

    changePage(event: PaginatorState){
      if(event.page != undefined){
        this._userService.setUsers(true, event.page + 1);
      }
    }

    createUser() {
      this._userService.createUser(this.userForm.value).pipe(
        tap(() => {
          this._userService.resetUsers();
        }),
        catchError((error) => {
          console.error('Error al actualizar el usuario:', error);
          return EMPTY;
        })
      ).subscribe();
    }

    sort(order: string) {
      this.order = order;
      this._userService.sortUsers(order);
    }

    @HostListener('window:scroll', [])
    onScroll() {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollPosition === documentHeight) {
        this._userService.setUsers();
      }
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: Event) {
      this._userService.resetUsers();
    }
}



import { Component, inject } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { User } from '../../models/users.model';
import { UserService } from '../../services/users.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { catchError, EMPTY, tap } from 'rxjs';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export default class UserDetailsComponent {
  user: User | undefined;
  userForm: FormGroup;

  private _userId!: number;
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _userService = inject(UserService);
  private readonly _fb = inject(FormBuilder);

  constructor() {
    this.userForm = this._fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(){
    this._activatedRoute.params.subscribe((params: Params) => {
      this._userId = params['id'];
      this.getUser();
    });
  }

  getUser(){
    this._userService.getUser(this._userId).subscribe((user) => {
      this.user = user;
      if(user)
        this.userForm.patchValue({
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          avatar: user.avatar,
        });
    });
  }

  updateUser() {
    this._userService.updateUser(this._userId, this.userForm.value).pipe(
      tap(() => {
        this.getUser();
      }),
      catchError((error) => {
        console.error('Error al actualizar el usuario:', error);
        return EMPTY;
      })
    ).subscribe();
  }
}

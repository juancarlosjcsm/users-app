import { CurrencyPipe, SlicePipe } from '@angular/common';
import {ChangeDetectionStrategy, Component, input,} from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '../../models/users.model';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCardComponent {

  currentUser = input.required<User>({alias: 'user'});

}

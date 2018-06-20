import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { User } from '@firebase/auth-types';

@Component({
  selector: 'mono-user-dropdown',
  templateUrl: './user-dropdown.component.html',
  styleUrls: ['./user-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDropdownComponent {
  @Input() user: User;
  @Output() logout: EventEmitter<void> = new EventEmitter();

  constructor() { }

}

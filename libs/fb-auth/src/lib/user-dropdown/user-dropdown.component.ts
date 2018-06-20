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
  // No assets allowed in libs
  noAvatar = 'data:image/gif;base64,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';

}

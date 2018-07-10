import { MatSnackBarConfig } from '@angular/material/snack-bar';

export interface ISnackBar {
  id?: string;
  index?: number;
  message: string;
  action?: string;
  config?: MatSnackBarConfig;
}

export class SnackBar implements ISnackBar {
  id = `_${Math.random()
    .toString(36)
    .substr(2, 9)}`;

  constructor(
    public message: string,
    public action: string = null,
    public config: MatSnackBarConfig = null,
    public index: number = 99
  ) {}
}

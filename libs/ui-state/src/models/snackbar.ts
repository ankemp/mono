import { MatSnackBarConfig } from '@angular/material/snack-bar';

export interface ISnackBar {
  id?: string;
  timestamp?: number;
  priority?: number;
  message: string;
  action?: string;
  config?: MatSnackBarConfig;
}

export class SnackBar implements ISnackBar {
  id = `_${Math.random()
    .toString(36)
    .substr(2, 9)}`;
  timestamp = new Date().getTime();

  constructor(
    public message: string,
    public action: string = null,
    public config: MatSnackBarConfig = null,
    public priority: number = 99
  ) {}
}

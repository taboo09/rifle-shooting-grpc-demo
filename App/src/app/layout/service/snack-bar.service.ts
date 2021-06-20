import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBarConfig} from '@angular/material/snack-bar'

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide6000: number = 6000;
  autoHide9000: number = 9000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  addExtraClass: boolean = false;

  constructor(public snackBar: MatSnackBar) { }

  snackBarMessage(message: string, actionButtonLabel: string, typeClass: string){
    let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? typeClass === 'error' ?
      this.autoHide9000 : this.autoHide6000 : 0;
    config.panelClass = typeClass === "confirm" ? ['snackbar-confirm'] : 
      typeClass === "error" ? ['snackbar-error']: ['snackbar-message'];
    this.snackBar.open(message, actionButtonLabel, config);
  }
}

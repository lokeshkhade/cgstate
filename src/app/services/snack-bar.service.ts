import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) { }

  error(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000, // 3 seconds
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['error'],
    });
  }
  success(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000, // 3 seconds
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['success'],
    });
  }
}

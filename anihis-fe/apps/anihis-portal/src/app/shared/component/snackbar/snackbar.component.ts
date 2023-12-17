import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';

@Component({
  selector: 'anihis-ui-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
})
export class SnackbarComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any, //MAT_SNACK_BAR_DATA is not deprecated by Angular Material's documentation
    public snackBarRef: MatSnackBarRef<SnackbarComponent>
  ) {}

  onActionClick(type: string) {
    switch (type.toLowerCase()) {
      case 'close':
      case 'x': {
        this.snackBarRef.dismiss();
        break;
      }

      case 'retry': {
        window.location.reload();
        this.snackBarRef.dismissWithAction();
        break;
      }
    }
  }
}

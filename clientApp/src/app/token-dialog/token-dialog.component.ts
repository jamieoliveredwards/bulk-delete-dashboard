import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-token-dialog',
  templateUrl: './token-dialog.component.html',
  styleUrls: ['./token-dialog.component.scss']
})
export class TokenDialogComponent {

  public data = {
    token: '',
    query: '',
    urlBase: 'http:localhost:8080/emails'
  };

  constructor(
    private dialogRef: MatDialogRef<TokenDialogComponent, any>
  ) { }

  close(data?: any) {
    this.dialogRef.close(data);
  }

}

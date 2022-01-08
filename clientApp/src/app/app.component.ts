import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { concat, EMPTY } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { TokenDialogComponent } from './token-dialog/token-dialog.component';

const apiBase = 'http://localhost:8080/emails';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public token = '';
  public query = '';
  public dataSource = this.getEmails();
  public displayedColumns = ['selection', 'name', 'id'];

  constructor(
    private http: HttpClient,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.openTokenDialog();
  }

  toggleSelect(data: any[]) {
    if (data.every(item => item.selected)) {
      return data.forEach(item => item.selected = false);
    }
    return data.forEach(item => item.selected = true);
  }

  deleteEntries(data: any[]) {
    const selection = data.filter(item => item.selected);
    const requests = selection.map(item => this.http.delete(`${apiBase}/${item.id}`, {
      headers: {
        Authorization: this.token
      }
    }));
    return concat(...requests).pipe(
      finalize(() => this.dataSource = this.getEmails())
    ).subscribe(res => console.log(res));
  }

  openTokenDialog() {
    this.matDialog.open(TokenDialogComponent, {
      width: '600px'
    }).afterClosed().subscribe(({ token, query }) => {
      this.token = token;
      this.query = query;
      if (token) {
        this.dataSource = this.getEmails();
      }
    });
  }

  private getEmails() {
    if (this.token) {
      return this.http.get<any[]>(`${apiBase}?${this.query}`, {
        headers: {
          Authorization: this.token
        }
      });
    }
    return EMPTY;
  }

}

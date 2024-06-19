import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';

export interface PeriodicElement {
  nome: string;
  email: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { nome: 'Elemento 1', email: "ricardoasc@live.com" },
  { nome: 'Elemento 2', email: "ricardoasc@live.com" },
  { nome: 'Elemento 3', email: "ricardoasc@live.com" }
];

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule
  ],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss'
})
export class UserTableComponent {

  displayedColumns: string[] = ['nome', 'email', 'acoes'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(public dialog: MatDialog) {}

  addRow() {
    const newRow = { nome: `Elemento ${this.dataSource.data.length + 1}`, email: 'test' };
    this.dataSource.data = [...this.dataSource.data, newRow];
  }
  
  deleteRow(element: PeriodicElement) {
    this.dataSource.data = this.dataSource.data.filter(e => e !== element);
  }

  openDialog(element?: PeriodicElement): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '500px',
      data: {
        isEdit: !!element,
        user: element || { nome: '', email: '' }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (element) {
          element.nome = result.nome;
          element.email = result.email;
        } else {
          this.dataSource.data = [...this.dataSource.data, result];
        }
      }
    });
  }

}

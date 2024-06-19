import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { UserModel } from '../../models/UserModel';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule
  ],
  providers: [UserService],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss'
})
export class UserTableComponent implements OnInit {

  ELEMENT_DATA: UserModel[] = [];
  displayedColumns: string[] = ['nome', 'email', 'acoes'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  constructor(public dialog: MatDialog, private userService: UserService) { }

  ngOnInit(): void {

  }

  private loadUsers() {
    this.userService.getUsers().subscribe(
      (users: UserModel[]) => {
        this.dataSource.data = users;
      },
      error => {
        console.error('Error in load users:', error);
      }
    );
  }

  openDialog(user?: UserModel): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '500px',
      height: '400px',
      data: {
        isEdit: !!user,
        user: user || { id: 0, name: '', email: '' }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id) {
          this.userService.updateUser(result.id, result).subscribe(
            () => {
              this.loadUsers();
            },
            error => {
              console.error('Error when update user:', error);
            }
          );
        } else {

          this.userService.addUser(result).subscribe(
            () => {
              this.loadUsers();
            },
            error => {
              console.error('Error when add user:', error);
            }
          );
        }
      }
    });
  }

  deleteRow(user: UserModel): void {
    if (confirm(`Tem certeza que deseja excluir "${user.name}"?`)) {
      this.userService.deleteUser(user.id).subscribe(
        () => {
          this.loadUsers();
        },
        error => {
          console.error('Erro when delete user:', error);
        }
      );
    }
  }

}

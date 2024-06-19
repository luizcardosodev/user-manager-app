import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { UserModel } from '../../models/UserModel';
import { UserService } from '../../services/user.service';
import { DepartmentService } from '../../services/department.service';
import { DepartmentModel } from '../../models/DepartmentModel';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  providers: [
    UserService,
    DepartmentService
  ],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss'
})
export class UserTableComponent implements OnInit {

  departments: DepartmentModel[] = [];
  ELEMENT_DATA: UserModel[] = [];
  displayedColumns: string[] = ['nome', 'email', 'department', 'acoes'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  constructor(
    public dialog: MatDialog,
    private _departmentService: DepartmentService,
    private _userService: UserService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadUsers();
    this.loadDepartments();
  }

  private loadUsers() {
    this._userService.getUsers().subscribe(
      (users: UserModel[]) => {
        this.dataSource.data = users;
      },
      error => {
        console.error('Error in load users:', error);
      }
    );
  }

  private loadDepartments(): void {
    this._departmentService.getDepartments().subscribe(
      (departments) => {
        this.departments = departments;
      },
      (error) => {
        console.error('Erro when get departments:', error);
      }
    );
  }

  openDialog(user?: UserModel): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '500px',
      height: '400px',
      data: {
        isEdit: !!user,
        departments: this.departments,
        user: user || { id: 0, name: '', email: '' }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      if (result.id) {
        this._userService.updateUser(result.id, result).subscribe(
          () => {
            this.loadUsers();
            this._snackBar.open("User updated successfully", 'OK', { duration: 2000 });
          },
          error => {
            console.error('Error when update user:', error);
          }
        );
      } else {

        this._userService.addUser(result).subscribe(
          () => {
            this.loadUsers();
            this._snackBar.open("User added successfully", 'OK', { duration: 2000 });
          },
          error => {
            console.error('Error when add user:', error);
          }
        );
      }
    });
  }

  deleteRow(user: UserModel): void {
    if (confirm(`Tem certeza que deseja excluir "${user.name}"?`)) {
      this._userService.deleteUser(user.id).subscribe(
        () => {
          this.loadUsers();
        },
        error => {
          this._snackBar.open("User deleted successfully", 'OK', { duration: 2000 });
          console.error('Erro when delete user:', error);
        }
      );
    }
  }

}

import { Component, Inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { DepartmentModel } from '../../models/DepartmentModel';
import { MatSelectModule } from '@angular/material/select';

export interface UserDialogData {
  isEdit: boolean;
  departments: DepartmentModel[];
  user: { 
    id: number;
    name: string; 
    email: string, 
    department: DepartmentModel,
  };
}

@Component({
  selector: 'app-user-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule, 
    MatDialogModule, 
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule
  ],
  templateUrl: './user-dialog.component.html',
  styleUrl: './user-dialog.component.scss'
})
export class UserDialogComponent {

  userForm: FormGroup;
  departments: DepartmentModel[];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserDialogData
  ) {
    this.departments = this.data.departments;
    this.userForm = this.fb.group({
      id: [this.data.user.id || null],
      name: [this.data.user?.name || '', Validators.required],
      email: [this.data.user?.email || '', [Validators.required, Validators.email]],
      departmentId: [this.data.user?.department?.id || null, Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.userForm.valid) {
      this.dialogRef.close(this.userForm.value);
    }
  }
}

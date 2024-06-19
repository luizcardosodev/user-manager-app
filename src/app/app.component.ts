import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserTableComponent } from './components/user-table/user-table.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UserTableComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'user-manager-app';
}

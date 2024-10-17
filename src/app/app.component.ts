import { Component } from '@angular/core';
import { AuthGaurd } from './core/services/auth.guard';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  providers: [AuthGaurd],
  imports: [RouterModule],
})
export class AppComponent {
  title = 'image-project';
}
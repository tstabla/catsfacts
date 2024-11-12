import { Component, inject, OnInit, effect, OnChanges, SimpleChanges } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth/auth.service';
import { CatsComponent } from './components/cats/cats.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    LoginComponent, 
    CatsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private authService = inject(AuthService);
 
  isLoggedIn = this.authService.getAuthStatus();
}

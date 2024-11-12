import { Injectable, Signal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../../models/user.interface';
import { firstValueFrom, of } from 'rxjs';
import { LoginResponse } from '../../models/login.api.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users = signal<IUser[]>([]);
  private isAuthenticated = signal<boolean>(false);

  constructor(private http: HttpClient) {}

  async login(username: string, password: string): Promise<boolean> {
    try {
      const response = await firstValueFrom(
        this.http.post<LoginResponse>('/api/validate-login', {
          username,
          password
        })
      );
      this.isAuthenticated.set(response.status === 'success');
      return this.isAuthenticated();
    } catch (error) {
      this.isAuthenticated.set(false);
      return this.isAuthenticated();
    }
  }

  getAuthStatus(): Signal<boolean> {
    return this.isAuthenticated;
  }
} 
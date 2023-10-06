import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { AuthService as AS} from '../auth.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  template: `
    <ul *ngIf="auth.user$ | async as user">
      <li>Username: {{ user.name }}</li>
      <li>Email-Id: {{ user.email }}</li>
    </ul>`
})
export class UserProfileComponent {
  constructor(public auth: AuthService, private http: HttpClient, private authService :AS) {}

}
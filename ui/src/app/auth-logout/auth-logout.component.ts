import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { AuthService as As } from '../auth.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-auth-logout',
  template: `
    <ng-container *ngIf="auth.isAuthenticated$ | async; else loggedOut">
      <a (click)="logout()">
        AuthLogout
      </a>
    </ng-container>

    <ng-template #loggedOut>
      <a (click)="auth.loginWithRedirect()">AuthLogin</a>
    </ng-template>
  `,
  styles: [],
})
export class AuthLogoutComponent {
  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService, private authService :As) {}

  username:any;
  password:any;

  ngOnInit(): void {
      this.auth.user$.subscribe((user) => {
        if (user) {
          this.username =  user.name;
          this.password = user.name;
          console.log(this.username + "" + this.password);
          console.log("User Details");
          this.authService.login(this.username, this.password).subscribe();
        }
      });  
    }

    logout(){
      this.authService.logout();
      this.auth.logout({ logoutParams: { returnTo: document.location.origin } })
    }
}
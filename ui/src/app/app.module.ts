import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LoginFormComponent } from './login-form/login-form.component';
import { HttpInterceptorService } from './HttpInterceptorService ';
import { AuthModule } from '@auth0/auth0-angular';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { AuthLogoutComponent } from './auth-logout/auth-logout.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HomeComponent } from './home/home.component';
import { PlaylistsComponent } from './playlists/playlists.component';
import { PlaylistSongsComponent } from './playlist-songs/playlist-songs.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { AllCategoriesComponent } from './all-categories/all-categories.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    AuthLoginComponent,
    AuthLogoutComponent,
    UserProfileComponent,
    AllCategoriesComponent,
    HomeComponent,
    PlaylistsComponent,
    PlaylistSongsComponent,
    SearchResultsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AuthModule.forRoot({
      domain: 'dev-rtyj1tmziwnt1lqj.us.auth0.com',
      clientId: '9x5WSpamm77OvuLNSMWKWqgRNyDqnDWb',
      cacheLocation:'localstorage',
      authorizationParams: {
        redirect_uri: window.location.origin 
      }
    }),
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { AuthLogoutComponent } from './auth-logout/auth-logout.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HomeComponent } from './home/home.component';
import { PlaylistsComponent } from './playlists/playlists.component';
import { PlaylistSongsComponent } from './playlist-songs/playlist-songs.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { AllCategoriesComponent } from './all-categories/all-categories.component';

const routes: Routes = [{ path: 'all-categories', component: AllCategoriesComponent },
  { path: 'search-results', component: SearchResultsComponent }, 
  { path: 'playlist-songs/:id', component: PlaylistSongsComponent }, 
  { path: 'playlists', component: PlaylistsComponent }, 
  { path: 'home', component: HomeComponent },
  { path: 'login-form', component: LoginFormComponent }, 
  { path: 'auth-login', component: AuthLoginComponent },
    { path: 'auth-logout', component: AuthLogoutComponent }, 
    { path: 'user-profile', component: UserProfileComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

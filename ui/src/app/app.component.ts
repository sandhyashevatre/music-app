import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { MusicService } from './Service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  cycles: any;
  showAddPlaylistForm: boolean = false; 
  newPlaylistTitle: string = '';
  searchTerm: any;
  searchResults: any;
  showSearchResults: boolean | undefined;
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  totalUniqueCartItems: number = 0; 

  constructor(private authService: AuthService , private router: Router, private musicService: MusicService) {}


  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/'])
  }

  toggleAddPlaylistForm(): void {
    this.showAddPlaylistForm = !this.showAddPlaylistForm; 
    this.newPlaylistTitle = ''; 
  }

  createPlaylist(): void {
    if (this.newPlaylistTitle.trim() !== '') {
      this.musicService.createPlaylist(this.newPlaylistTitle).subscribe((response: any) => {
        this.showAddPlaylistForm = false;
      });
      window.location.reload();
    }
  }
}

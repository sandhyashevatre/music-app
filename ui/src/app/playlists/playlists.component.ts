import { Component, OnInit } from '@angular/core';
import { MusicService } from '../Service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent implements OnInit {
  playlists: any;
  playlistSongs: any;
  deletePlaylistId: number | undefined; // Rename to deletePlaylistId

  constructor(private musicService: MusicService, private router: Router) {}

  ngOnInit() {
    this.getAllPlaylists();
  }

  getAllPlaylists() {
    this.musicService.getAllPlaylists().subscribe((data: any) => {
      this.playlists = data;
    });
  }

  seePlaylistSongs(playlistId: number): void {
    if (playlistId) {
      this.router.navigate(['/playlist-songs', playlistId]);
    }
  }

  deletePlaylist(playlistId: number): void {
    if (playlistId) {
      this.musicService.removePlaylist(playlistId).subscribe((response: any) => {
        if (response && response === 'Playlist removed successfully') {
          this.playlists = this.playlists.filter((playlist: any) => playlist.id !== playlistId);
        }
      });

      this.ngOnInit();
    }
  }
  
}

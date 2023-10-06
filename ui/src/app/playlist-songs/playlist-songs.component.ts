import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { MusicService } from '../Service';

@Component({
  selector: 'app-playlist-songs',
  templateUrl: './playlist-songs.component.html',
  styleUrls: ['./playlist-songs.component.css']
})
export class PlaylistSongsComponent implements OnInit {
  playlistSongs: any[] = [];
  playlistId: any;
  selectedSong: any;
  isPlaying: boolean | undefined;
  currentlyPlaying: any;
  songs: any;

  constructor(
    private musicService: MusicService,
    private route: ActivatedRoute 
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.playlistId = +params['id']; 
      this.getPlaylistSongs();
    });
  }

  getPlaylistSongs() {
    this.musicService.getPlaylistSongs(this.playlistId).subscribe((response: any) => {
      this.playlistSongs = response;
    });
  }

  selectSong(song:any):void{
    this.selectedSong = song;
  }

  togglePlayback(): void {
    this.isPlaying = !this.isPlaying;
    if (this.isPlaying) {
      this.currentlyPlaying = this.songs[0]; 
    } else {

    }
  }

  deleteSongFromPlaylist(playlistId: number, songId: number): void {
    if (confirm('Are you sure you want to delete this song from the playlist?')) {
      this.musicService.removeFromPlaylist(playlistId, songId).subscribe(
        (response: any) => {
          this.getPlaylistSongs(); 
        },
        (error: any) => {
          console.error('Error deleting song from playlist', error);
        }
      );
      window.location.reload();

    }
  }
}

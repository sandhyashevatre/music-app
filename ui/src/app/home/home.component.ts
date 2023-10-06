import { Component, OnInit } from '@angular/core';
import { MusicService } from '../Service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  songs: any;
  selectedSong: any;
  currentlyPlaying: any;
  isPlaying: any;
  playlistId: any;
  playlists: any;
  listOfPlaylists: any;

  constructor(private musicService: MusicService) { }

  ngOnInit() {
    this.getAllSongs();
  }

  getAllSongs() {
    this.musicService.getAllSongs().subscribe(data => {
      this.songs = data;
    });
  }

  getAllPlaylists() {
    this.musicService.getAllPlaylists().subscribe(data => {
      this.playlists = data;
    });
  }

  selectSong(song:any):void{
    this.selectedSong = song;
  }

  addToPlaylist(): void {
    this.musicService.getAllPlaylists().subscribe(data => {
      this.playlists = data;
      this.listOfPlaylists = true; 
    });
  }

  addSongToSelectedPlaylist(playlistId: number): void {
    if (this.selectedSong && playlistId) {
      this.musicService.addToPlaylist(playlistId, this.selectedSong.songId).subscribe(response => {
        console.log('Song added to playlist:', response);
      }, error => {
        console.error('Error adding song to playlist:', error);
      });
    } else {
      console.error('Selected song or playlist ID is not set.');
    }
  }
  
  

  togglePlayback(): void {
    this.isPlaying = !this.isPlaying;
    if (this.isPlaying) {
      this.currentlyPlaying = this.songs[0]; 
    } 
  }

}

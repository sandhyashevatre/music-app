import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicService } from '../Service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent{
  searchTerm: string = '';
  searchResults: any[] = [];
  isPlaying: any;
  currentlyPlaying: any;
  songs: any;
  selectedSong: any;
  listOfPlaylists: boolean | undefined;
  playlists: any;
  selectedAttribute: string = 'all';

  constructor(private route: ActivatedRoute, private musicService: MusicService) { }

  searchSongs(): void {
    if (this.searchTerm.trim() !== '') {
      this.musicService.searchSongs(this.searchTerm).subscribe((response: any) => {
        this.searchResults = response;
      });
    } else {
      this.searchResults = [];
    }
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

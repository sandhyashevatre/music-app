import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  private apiUrl = 'http://localhost:8080/music';
  constructor(private httpClient: HttpClient) { }

  getAllSongs(): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/allSongs`);
  }

  getAllPlaylists(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}/allPlaylists`);
  }

  getPlaylistSongs(playlistId: number): Observable<any> {
    const requestBody = {
      playlistId: playlistId
    };
    return this.httpClient.post(`${this.apiUrl}/playlistSongs`, requestBody);
  }

  createPlaylist(title: string): Observable<any> {
    const requestBody = {
      title: title
    };
    return this.httpClient.post(`${this.apiUrl}/createPlaylist`, requestBody);
  }
  

  addToPlaylist(playlistId: number, songId: number): Observable<any> {
    const requestBody = {
      playlistId: playlistId,
      songId: songId
    };
    return this.httpClient.post(`${this.apiUrl}/addToPlaylist`, requestBody);
  }

  removeFromPlaylist(playlistId: number, songId: number): Observable<any> {
    const requestBody = {
      playlistId: playlistId,
      songId: songId
    };
    return this.httpClient.post(`${this.apiUrl}/removeFromPlaylist`, requestBody);
  }

  searchSongs(searchTerm: string): Observable<any> {
    const requestBody = {
      searchTerm: searchTerm
    };
    return this.httpClient.post(`${this.apiUrl}/searchAllSongs`, requestBody);
  }

  removePlaylist(playlistId: number): Observable<any>{
    const requestBody = {
      playlistId:playlistId
    };
    return this.httpClient.post(`${this.apiUrl}/removePlaylist`, requestBody);
  }
  
  
}



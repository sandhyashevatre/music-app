package com.music.app.Controller;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.music.app.Entity.AllSongs;
import com.music.app.Entity.PlaylistSongs;
import com.music.app.Entity.Playlists;
import com.music.app.Repository.AllSongsRepo;
import com.music.app.Repository.PlaylistRepo;
import com.music.app.Repository.PlaylistSongsRepo;

@RestController
@RequestMapping("/music")
@CrossOrigin
public class MusicController {

    @Autowired
    private AllSongsRepo songRepository;

    @Autowired
    private PlaylistSongsRepo playlistSongsRepository;

    @Autowired
    private PlaylistRepo playlistRepository;

    // @Autowired
    // private CategoryRepo categoryRepository;

    @GetMapping("allSongs")
    public ResponseEntity<List<AllSongs>> listAllSongs() {
        List<AllSongs> songs = songRepository.findAll();
        return ResponseEntity.ok(songs);
    }

    @PostMapping("playlistSongs")
    public ResponseEntity<List<PlaylistSongs>> playlistSongs(@RequestBody Map<String, Long> requestBody) {
        Long playlistId = requestBody.get("playlistId");
        List<PlaylistSongs> playlistSongs = playlistSongsRepository.findByPlaylistId(playlistId);
        return ResponseEntity.ok(playlistSongs);
    }
    

    @GetMapping("allPlaylists")
    public ResponseEntity<List<Playlists>> allPlaylists() {
        List<Playlists> playlists = playlistRepository.findAll();
        return ResponseEntity.ok(playlists);
    }

    @PostMapping("searchAllSongs")
    public ResponseEntity<List<AllSongs>> searchAllSongs(@RequestBody(required = false) Map<String, String> requestBody) {
        String searchTerm = requestBody.get("searchTerm");
    
        if (searchTerm != null && !searchTerm.isEmpty()) {
            List<AllSongs> searchedSongs = songRepository.searchSongs(searchTerm.toLowerCase()); // Use toLowerCase() to ensure it's a string
    
            if (searchedSongs.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.emptyList());
            }
    
            return ResponseEntity.ok(searchedSongs);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Collections.emptyList());
        }
    }
    

    @PostMapping("searchPlaylistSongs")
    public ResponseEntity<List<PlaylistSongs>> searchPlaylistSongs(
            @RequestBody(required = false) Map<String, String> requestBody) {
        String searchTerm = requestBody.get("searchTerm");
        Long playlistId = Long.parseLong(requestBody.get("playlistId"));

        List<PlaylistSongs> searchedSongs = playlistSongsRepository.searchSongsInPlaylist(playlistId, searchTerm);

        if (searchedSongs.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.emptyList());
        }

        return ResponseEntity.ok(searchedSongs);
    }

    // @PostMapping("categorySongs")
    // public ResponseEntity<List<AllSongs>> categorySongs(@RequestBody Map<String, String> requestBody) {
    //     String categoryName = requestBody.get("categoryName");
    
    //     Category category = categoryRepository.findByCategoryName(categoryName);
    
    //     if (category == null) {
    //         return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.emptyList());
    //     }
    
    //     List<AllSongs> songs = songRepository.findByCategory(category);
    
    //     if (songs.isEmpty()) {
    //         return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.emptyList());
    //     }
    
    //     return ResponseEntity.ok(songs);
    // }

    @PostMapping("createPlaylist")
    public ResponseEntity<Playlists> createPlaylist(@RequestBody Playlists title) {
        Playlists createdPlaylist = playlistRepository.save(title);
        return ResponseEntity.ok(createdPlaylist);
    }

    @PostMapping("removePlaylist")
    public ResponseEntity<?> removePlaylist(@RequestBody Map<String, Long> requestBody) {
        Long playlistId = requestBody.get("playlistId");
    
        Playlists playlist = playlistRepository.findById(playlistId).orElse(null);
    
        if (playlist == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Playlist not found");
        }
    
        try {
            playlistRepository.delete(playlist);
    
            return ResponseEntity.ok("Playlist removed successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error removing the playlist");
        }
    }
    



    @PostMapping("addToPlaylist")
    public ResponseEntity<?> addToPlaylist(@RequestBody Map<String, Long> requestBody) {

        Long playlistId = requestBody.get("playlistId");
        Long songId = requestBody.get("songId");

        System.out.println(playlistId + " " + songId);

        Playlists playlist = playlistRepository.findById(playlistId).orElse(null);
        AllSongs song = songRepository.findById(songId).orElse(null);

        if (playlist == null || song == null) {
            return ResponseEntity.status(HttpStatus.OK).body("No songs Available");
        }

        boolean songAlreadyInPlaylist = playlistSongsRepository.existsByPlaylistAndSong(playlist, song);

        if (songAlreadyInPlaylist) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Song is already in the playlist");
        }

        PlaylistSongs playlistSong = new PlaylistSongs();
        playlistSong.setPlaylist(playlist);
        playlistSong.setSong(song);

        PlaylistSongs savedPlaylistSong = playlistSongsRepository.save(playlistSong);
        return ResponseEntity.ok(savedPlaylistSong);
    }

    @PostMapping("removeFromPlaylist")
    public ResponseEntity<?> removeFromPlaylist(@RequestBody Map<String, Long> requestBody) {

        Long playlistId = requestBody.get("playlistId");
        Long songId = requestBody.get("songId");

        Playlists playlist = playlistRepository.findById(playlistId).orElse(null);
        AllSongs song = songRepository.findById(songId).orElse(null);

        if (playlist == null || song == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Playlist or song not found");
        }

        try {
            List<PlaylistSongs> playlistSongs = playlistSongsRepository.findByPlaylistAndSong(playlist, song);

            if (!playlistSongs.isEmpty()) {
                playlistSongsRepository.deleteAll(playlistSongs);
                return ResponseEntity.ok("All matching songs removed from the playlist");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Song is not in the playlist");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error removing songs from the playlist");
        }
    }

}

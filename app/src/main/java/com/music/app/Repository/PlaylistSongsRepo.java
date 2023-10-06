package com.music.app.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.music.app.Entity.AllSongs;
import com.music.app.Entity.PlaylistSongs;
import com.music.app.Entity.Playlists;

public interface PlaylistSongsRepo extends JpaRepository<PlaylistSongs, Long> {

    List<PlaylistSongs> findByPlaylistAndSong(Playlists playlist, AllSongs songs);

    List<PlaylistSongs> findByPlaylistId(Long id);

    boolean existsByPlaylistAndSong(Playlists playlist, AllSongs song);

    @Query("SELECT ps FROM PlaylistSongs ps " +
           "INNER JOIN ps.song s " +
           "WHERE ps.playlist.id = :playlistId AND " +
           "(LOWER(s.songName) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(s.singer) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(s.composer) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(s.category) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(s.album) LIKE LOWER(CONCAT('%', :searchTerm, '%')))")
    List<PlaylistSongs> searchSongsInPlaylist(@Param("playlistId") Long playlistId, @Param("searchTerm") String searchTerm);
    
}


package com.music.app.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.music.app.Entity.AllSongs;

public interface AllSongsRepo extends JpaRepository<AllSongs, Long>{

    @Query("SELECT s FROM AllSongs s WHERE " +
           "LOWER(s.songName) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(s.singer) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(s.composer) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(s.category) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(s.album) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<AllSongs> searchSongs(@Param("searchTerm") String searchTerm);
    
}

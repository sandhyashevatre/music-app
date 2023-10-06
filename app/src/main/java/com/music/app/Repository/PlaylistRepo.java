package com.music.app.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.music.app.Entity.Playlists;

public interface PlaylistRepo extends JpaRepository<Playlists, Long>{

    void deleteByTitle(String title);
    
}

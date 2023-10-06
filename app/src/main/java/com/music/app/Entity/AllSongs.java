package com.music.app.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class AllSongs {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long songId;

    private String songName;

    private String singer;

    private String composer;

    private String album;

    private String category;
}

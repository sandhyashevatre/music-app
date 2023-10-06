package com.music.app.Repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.music.app.Entity.User;

public interface UserRepository extends CrudRepository<User, Long>{
    public Optional<User> findByName(String name);
}

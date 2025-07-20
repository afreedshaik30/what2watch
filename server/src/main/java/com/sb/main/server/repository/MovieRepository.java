package com.sb.main.server.repository;

import com.sb.main.server.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MovieRepository extends JpaRepository<Movie, Long> {
    List<Movie> findByUserId(Long userId);
}
package com.sb.main.server.repository;

import com.sb.main.server.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MovieRepository extends JpaRepository<Movie, Long> {
    List<Movie> findByUserId(Long userId);
    List<Movie> findByUserIdAndNameContainingIgnoreCase(Long userId, String name);
    List<Movie> findByUserIdAndGenreIgnoreCase(Long userId, String genre);
    List<Movie> findByUserIdAndNameContainingIgnoreCaseAndGenreIgnoreCase(Long userId, String name, String genre);

}
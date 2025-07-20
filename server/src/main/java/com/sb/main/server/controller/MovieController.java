package com.sb.main.server.controller;

import com.sb.main.server.dto.ApiResponse;
import com.sb.main.server.dto.MovieDTO;
import com.sb.main.server.entity.Movie;
import com.sb.main.server.service.MovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/movies")
@RequiredArgsConstructor
public class MovieController {

    private final MovieService movieService;

    @PostMapping
    public ResponseEntity<ApiResponse<MovieDTO>> addMovie(@RequestBody Movie movie, Authentication auth) {
        MovieDTO saved = movieService.addMovie(auth.getName(), movie);
        return ResponseEntity.ok(new ApiResponse<>(true, "Movie added", saved));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<MovieDTO>> getMovieById(@PathVariable Long id, Authentication auth) {
        MovieDTO movie = movieService.getMovieById(id, auth.getName());
        return ResponseEntity.ok(new ApiResponse<>(true, "Movie found", movie));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<MovieDTO>>> getUserMovies(Authentication auth) {
        List<MovieDTO> movies = movieService.getUserMovies(auth.getName());
        return ResponseEntity.ok(new ApiResponse<>(true, "User's watchlist", movies));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<MovieDTO>> updateMovie(@PathVariable Long id, @RequestBody Movie movie, Authentication auth) {
        MovieDTO updated = movieService.updateMovie(id, auth.getName(), movie);
        return ResponseEntity.ok(new ApiResponse<>(true, "Movie updated", updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteMovie(@PathVariable Long id, Authentication auth) {
        movieService.deleteMovie(id, auth.getName());
        return ResponseEntity.ok(new ApiResponse<>(true, "Movie deleted", null));
    }
}
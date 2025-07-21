package com.sb.main.server.controller;

import com.sb.main.server.dto.ApiResponse;
import com.sb.main.server.dto.MovieDTO;

import com.sb.main.server.service.MovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/movies")
@RequiredArgsConstructor
public class MovieController {

    private final MovieService movieService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<MovieDTO>> addMovie(
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam(value = "link", required = false) String link,
            @RequestParam(value = "genre", required = false) String genre,
            @RequestParam(value = "poster", required = false) MultipartFile poster,
            Authentication auth
    ) throws IOException {
        MovieDTO saved = movieService.addMovie(auth.getName(), name, description, link, genre, poster);
        return ResponseEntity.ok(new ApiResponse<>(true, "Movie added", saved));
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<MovieDTO>> updateMovie(
            @PathVariable Long id,
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam(value = "link", required = false) String link,
            @RequestParam(value = "genre", required = false) String genre,
            @RequestParam(value = "poster", required = false) MultipartFile poster,
            Authentication auth
    ) throws IOException {
        MovieDTO updated = movieService.updateMovie(id, auth.getName(), name, description, link, genre, poster);
        return ResponseEntity.ok(new ApiResponse<>(true, "Movie updated", updated));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<MovieDTO>>> getUserMovies(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String genre,
            Authentication auth
    ) {
        List<MovieDTO> movies = movieService.getUserMovies(auth.getName(), name, genre);
        return ResponseEntity.ok(new ApiResponse<>(true, "User's watchlist", movies));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<MovieDTO>> getMovieById(@PathVariable Long id, Authentication auth) {
        MovieDTO movie = movieService.getMovieById(id, auth.getName());
        return ResponseEntity.ok(new ApiResponse<>(true, "Movie found", movie));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteMovie(@PathVariable Long id, Authentication auth) {
        movieService.deleteMovie(id, auth.getName());
        return ResponseEntity.ok(new ApiResponse<>(true, "Movie deleted", null));
    }
}

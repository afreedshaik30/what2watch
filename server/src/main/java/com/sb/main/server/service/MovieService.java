package com.sb.main.server.service;

import com.sb.main.server.dto.MovieDTO;
import com.sb.main.server.entity.Movie;
import com.sb.main.server.entity.User;
import com.sb.main.server.repository.MovieRepository;
import com.sb.main.server.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MovieService {
    private final MovieRepository movieRepository;
    private final UserRepository userRepository;

    public List<MovieDTO> getUserMovies(String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        return movieRepository.findByUserId(user.getId())
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public MovieDTO addMovie(String email, Movie movie) {
        User user = userRepository.findByEmail(email).orElseThrow();
        movie.setUser(user);
        return mapToDTO(movieRepository.save(movie));
    }

    public MovieDTO updateMovie(Long movieId, String email, Movie updatedMovie) {
        Movie movie = movieRepository.findById(movieId).orElseThrow();
        if (!movie.getUser().getEmail().equals(email)) {
            throw new RuntimeException("Unauthorized");
        }
        movie.setName(updatedMovie.getName());
        movie.setDescription(updatedMovie.getDescription());
        movie.setLink(updatedMovie.getLink());
        return mapToDTO(movieRepository.save(movie));
    }

    public void deleteMovie(Long movieId, String email) {
        Movie movie = movieRepository.findById(movieId).orElseThrow();
        if (!movie.getUser().getEmail().equals(email)) {
            throw new RuntimeException("Unauthorized");
        }
        movieRepository.delete(movie);
    }

    private MovieDTO mapToDTO(Movie movie) {
        return new MovieDTO(
                movie.getId(),
                movie.getName(),
                movie.getDescription(),
                movie.getLink()
        );
    }
}
package com.sb.main.server.service;

import com.sb.main.server.dto.MovieDTO;
import com.sb.main.server.entity.Movie;
import com.sb.main.server.entity.User;
import com.sb.main.server.repository.MovieRepository;
import com.sb.main.server.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MovieService {
    private final MovieRepository movieRepository;
    private final UserRepository userRepository;
    private final ImgBBService imgBBService;

    public MovieDTO addMovie(String email, String name, String description, String link, String genre, MultipartFile poster) throws IOException {
        User user = userRepository.findByEmail(email).orElseThrow();
        Movie movie = new Movie();
        movie.setName(name);
        movie.setDescription(description);
        movie.setLink(link);
        movie.setGenre(genre);
        movie.setUser(user);

        if (poster != null && !poster.isEmpty()) {
            movie.setPosterUrl(imgBBService.uploadImage(poster));
        }

        return MovieDTO.from(movieRepository.save(movie));
    }

    public MovieDTO updateMovie(Long id, String email, String name, String description, String link, String genre, MultipartFile poster) throws IOException {
        Movie movie = movieRepository.findById(id).orElseThrow();
        if (!movie.getUser().getEmail().equals(email)) {
            throw new RuntimeException("Unauthorized");
        }

        movie.setName(name);
        movie.setDescription(description);
        movie.setLink(link);
        movie.setGenre(genre);

        if (poster != null && !poster.isEmpty()) {
            movie.setPosterUrl(imgBBService.uploadImage(poster));
        }

        return MovieDTO.from(movieRepository.save(movie));
    }

    public List<MovieDTO> getUserMovies(String email, String name, String genre) {
        User user = userRepository.findByEmail(email).orElseThrow();
        List<Movie> movies;

        if (name != null && genre != null) {
            movies = movieRepository.findByUserIdAndNameContainingIgnoreCaseAndGenreIgnoreCase(user.getId(), name, genre);
        } else if (name != null) {
            movies = movieRepository.findByUserIdAndNameContainingIgnoreCase(user.getId(), name);
        } else if (genre != null) {
            movies = movieRepository.findByUserIdAndGenreIgnoreCase(user.getId(), genre);
        } else {
            movies = movieRepository.findByUserId(user.getId());
        }

        return movies.stream().map(MovieDTO::from).collect(Collectors.toList());
    }

    public MovieDTO getMovieById(Long id, String email) {
        Movie movie = movieRepository.findById(id).orElseThrow();
        if (!movie.getUser().getEmail().equals(email)) throw new AccessDeniedException("Unauthorized");
        return MovieDTO.from(movie);
    }

    public void deleteMovie(Long id, String email) {
        Movie movie = movieRepository.findById(id).orElseThrow();
        if (!movie.getUser().getEmail().equals(email)) throw new RuntimeException("Unauthorized");
        movieRepository.delete(movie);
    }
}

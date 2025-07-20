package com.sb.main.server.dto;

import com.sb.main.server.entity.Movie;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MovieDTO {
    private Long id;
    private String name;
    private String description;
    private String link;

    public static MovieDTO from(Movie movie) {
        return new MovieDTO(
                movie.getId(),
                movie.getName(),
                movie.getDescription(),
                movie.getLink()
        );
    }
}

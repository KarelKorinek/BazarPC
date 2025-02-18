package server.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Entity(name = "component")
@Getter
@Setter
public class ComponentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String category;

    private BigDecimal price;

    private String description;

    private LocalDate publishedDate;

    private Long userId;

    private List<String> imageNames;
}

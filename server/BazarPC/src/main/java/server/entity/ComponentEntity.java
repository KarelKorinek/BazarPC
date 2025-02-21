package server.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
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

    @NotNull
    private String name;

    @NotNull
    private String category;
    @Enumerated(EnumType.STRING)
    private ComponentCategory category;

    @NotNull
    @Positive
    private BigDecimal price;

    private String description;

    private LocalDate publishedDate;

    @NotNull
    private Long userId;

    @NotNull
    private List<String> imageNames;
}

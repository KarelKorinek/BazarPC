package server.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;
import server.constant.ComponentCategory;

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

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private ComponentCategory category;

    @Column(nullable = false)
    @Positive
    private BigDecimal price;

    private String description;

    private LocalDate publishedDate;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    private List<String> imageNames;
}

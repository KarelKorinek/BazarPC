package server.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data // @Data bundles @ToString, @Getter, @Setter and more...
public class ComponentDTO {

    private Long id;

    private String name;

    private String category;

    private BigDecimal price;

    private String description;

    private LocalDate publishedDate;

    private Long publisherId;

}

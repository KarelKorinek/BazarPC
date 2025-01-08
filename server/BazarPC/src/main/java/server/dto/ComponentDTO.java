package server.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data // @Data bundles @ToString, @Getter, @Setter and more...
@AllArgsConstructor
@NoArgsConstructor
public class ComponentDTO {

    private Long id;

    private String name;

    private String category;

    private BigDecimal price;

    private String description;

    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate publishedDate;

    private Long publisherId;

    private String imageName;
}

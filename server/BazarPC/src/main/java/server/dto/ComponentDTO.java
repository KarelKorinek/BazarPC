package server.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import server.constant.ComponentCategory;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data // @Data bundles @ToString, @Getter, @Setter and more...
@AllArgsConstructor
@NoArgsConstructor
public class ComponentDTO {

    private Long id;

    @NotNull
    private String name;

    @NotNull
    private ComponentCategory category;

    @NotNull
    @Positive
    private BigDecimal price;

    private String description;

    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate publishedDate;

    @NotNull
    private Long userId;

    private UserDTO userDetail;

    private List<String> imageNames;

    @NotNull
    private List<byte[]> imageFiles;

}

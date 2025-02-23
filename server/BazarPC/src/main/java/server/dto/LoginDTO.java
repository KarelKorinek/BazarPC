package server.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginDTO {

    @NotNull
    @Email
    private String email;

    @NotBlank(message = "Insert user password")
    @Size( min = 8, message= "The password has contain 8 characters at least")
    private String password;
}

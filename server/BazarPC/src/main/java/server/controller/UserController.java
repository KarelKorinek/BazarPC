package server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import server.dto.UserDTO;
import server.service.UserService;

@RestController
@RequestMapping("/bazar")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/user/{id}")
    public UserDTO getUser(@PathVariable Long id) {
        return userService.getUser(id);
    }

    @PostMapping("/user")
    public UserDTO addUser(@RequestBody UserDTO userDTO) {
        return userService.addUser(userDTO);
    }

    @PutMapping("/user/{id}")
    public UserDTO updateUser(  @PathVariable Long id,
                                @RequestBody UserDTO updatedUserDTO) {
        return userService.updateUser(id, updatedUserDTO);
    }

    @DeleteMapping("/user/{id}")
    public void removeUser(@PathVariable Long id) {
        userService.removeUser(id);
    }
}

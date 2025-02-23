package server.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;
import server.dto.LoginDTO;
import server.dto.UserDTO;
import server.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    UserService userService;

    /**
     *  Get complete a user information
     *
     * @param id        a user id
     * @return          a user information
     */
    @GetMapping("/{id}")
    public UserDTO getUser(@PathVariable Long id) {
        return userService.getUser(id);
    }

    /**
     *  Add a new user to database
     *
     * @param userDTO   a user information to save to database
     * @return          saved a user information
     */
    @PostMapping("/")
    public UserDTO addUser(@RequestBody @Valid UserDTO userDTO) {
        return userService.addUser(userDTO);
    }

    /**
     *
     *  Get a list of existing users from database
     *
     * @return      the list of users
     */
    @Secured("ROLE_USER")
    @GetMapping("/")
    public List<UserDTO> getAllUsers() {
        return  userService.getAllUsers();
    }

    /**
     *  Update a user information in database
     *
     * @param id                    a user id
     * @param updatedUserDTO        the updated user information
     * @return                      the saved updated user information
     */
    @Secured("ROLE_USER")
    @PutMapping("/{id}")
    public UserDTO updateUser(  @PathVariable Long id,
                                @RequestBody UserDTO updatedUserDTO) {
        return userService.updateUser(id, updatedUserDTO);
    }

    /**
     *  Remove a user from database
     *
     * @param id        a user id
     */
    @Secured("ROLE_USER")
    @DeleteMapping("/{id}")
    public void removeUser(@PathVariable Long id) {
        userService.removeUser(id);
    }

    /**
     *  Login a user to account
     *
     * @param loginDTO              the user information (username and password)
     * @param httpServletRequest    an object which performs login process
     * @return                      the logged user information
     */
    @PostMapping("/account")
    public UserDTO login(@RequestBody @Valid LoginDTO loginDTO,
                         HttpServletRequest httpServletRequest)  {
        return userService.loginUser(loginDTO, httpServletRequest);
    }

    /**
     *  Logout a user from his account
     *
     * @param httpServletRequest    an object which performs the user logout
     * @return                      a message about successful logout
     */
    @Secured("ROLE_USER")
    @DeleteMapping("/account")
    public String logout(HttpServletRequest httpServletRequest) {
        return userService.logoutUser(httpServletRequest);
    }

    /**
     *  A logged user information
     *
     * @return          the user information
     */
    @GetMapping("/account")
    public UserDTO loggedUserInfo() {
        return userService.loggedUserInfo();
    }
}
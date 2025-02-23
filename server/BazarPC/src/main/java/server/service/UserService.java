package server.service;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.core.userdetails.UserDetailsService;
import server.dto.LoginDTO;
import server.dto.UserDTO;

import java.util.List;


public interface UserService extends UserDetailsService {

    /**
     *  Add new user to database
     *
     * @param userDTO       data to be added to database
     * @return              added data to database
     */
    UserDTO addUser(UserDTO userDTO);

    List<UserDTO> getAllUsers();

    /**
     *  Read out existing user according his id from database
     *
     * @param id            user id
     * @return              read out user from database
     */
    UserDTO getUser(Long id);

    /**
     *  Update existing user data in database
     *
     * @param id            user id
     * @param userDTO       updated user data
     * @return              updated user data
     */
    UserDTO updateUser(Long id, UserDTO userDTO);

    /**
     *  Remove existing user from database
     *
     * @param id            user id
     */
    void removeUser(Long id);

    /**
     *  A user log in service
     *
     * @param loginDTO               the information about user to sign in (username, password)
     * @param httpServletRequest    the object which maintains user session, the object performs a user login
     * @return                      the login user information
     */
    UserDTO loginUser(LoginDTO loginDTO, HttpServletRequest httpServletRequest);

    /**
     *  A user log out service
     *
     * @param httpServletRequest    the object which maintains user session, the object performs a user logout
     * @return                      the message about successful log out
     */
    String logoutUser(HttpServletRequest httpServletRequest);

    /**
     *  The service returns information about actual logged user information
     *
     * @return                      a logged user information
     */
    UserDTO loggedUserInfo();
}

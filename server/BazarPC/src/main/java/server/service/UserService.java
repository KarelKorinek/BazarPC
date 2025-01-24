package server.service;
import server.dto.UserDTO;


public interface UserService {

    /**
     *  Add new user to database
     *
     * @param userDTO       data to be added to database
     * @return              added data to database
     */
    UserDTO addUser(UserDTO userDTO);

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
}

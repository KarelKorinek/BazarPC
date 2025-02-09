package server.service;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import server.dto.UserDTO;
import server.dto.mapper.UserMapper;
import server.entity.UserEntity;
import server.entity.repository.ComponentRepository;
import server.entity.repository.UserRepository;
import server.service.exceptions.EmailAlreadyExistsException;
import server.service.exceptions.NotFoundException;
import server.service.exceptions.AuthenticationException;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    UserMapper userMapper;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ComponentRepository componentRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private UserEntity findUserInDb(Long id) {

        UserEntity userEntity;

        try {
            userEntity = userRepository.findById(id).orElseThrow( () -> new NotFoundException("User was not found in database"));
        } catch (NotFoundException e) {
            System.err.println("Error message: " + e.getMessage());
            throw e;
        }

        return userEntity;
    }

    /**
     * Add new user to database
     *
     * @param userDTO data to be added to database
     * @return added data to database
     */
    @Override
    public UserDTO addUser(UserDTO userDTO) {

        try {
            // convert user DTO to user entity without password
            UserEntity userEntity = userMapper.toEntityNoPassword(userDTO);

            // password encoding
            userEntity.setPassword(passwordEncoder.encode(userDTO.getPassword()));

            // save user to database, it can throw error Data integrity violation
            userEntity = userRepository.save(userEntity);

            // convert entity to DTO without password hash
            return userMapper.toDTONoPassword(userEntity);

        } catch (DataIntegrityViolationException e) {
            throw new EmailAlreadyExistsException("User with this e-mail already exists");
        }
    }

    /**
     *  The service method reads all existing users from the database and return the list of them
     *
     * @return          the list of users
     */
    @Override
    public List<UserDTO> getAllUsers() {
            // read out all users from database
            List<UserEntity> userEntities = userRepository.findAll();

            // create empty list of user DTOs
            List<UserDTO> userDTOList = new ArrayList<>();

            // go through use entities and convert them to DTOs and store in a list
            for( UserEntity userEntity : userEntities) {
                UserDTO userDTO = userMapper.toDTONoPassword(userEntity);
                userDTOList.add(userDTO);
            }
        return userDTOList;
    }

    /**
     * Read out existing user according his id from database
     *
     * @param id user id
     * @return read out user from database
     */
    @Override
    public UserDTO getUser(Long id) {
        // find user in Db and return DTO
        return userMapper.toDTONoPassword(findUserInDb(id));
    }

    /**
     * Update existing user data in database
     *
     * @param id      user id
     * @param userDTO updated user data
     * @return updated user data
     */
    @Override
    public UserDTO updateUser(Long id, UserDTO userDTO) {

        // find the user according id in database
        UserEntity userEntity = findUserInDb(id);

        // set user id in DTO
        userDTO.setId(userEntity.getId());

        // update user entity
        userMapper.updateEntity(userDTO, userEntity);

        // save changes to database and return DTO
        return userMapper.toDTONoPassword(userRepository.save(userEntity));
    }

    /**
     * Remove existing user from database and his adverts
     *
     * @param id user id
     */
    @Override
    public void removeUser(Long id) {

        // find user in database, if not exists throw error
        UserEntity userEntity = findUserInDb(id);

        // remove all PC components from database according user id
        componentRepository.deleteAllByUserId(id);

        // remove user from database
        userRepository.deleteById(id);
    }

    /**
     *  Load user according his username (according his email)
     *
     * @param username                      the username is the user email
     * @return                              the user details
     * @throws UsernameNotFoundException    the user was not found error
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User name " + username + "was not found."));
    }

    /**
     *  A user log in service
     *
     * @param userDTO               the information about user to sign in (username, password)
     * @param httpServletRequest    the object which maintains user session, the object performs a user login
     * @return                      the login user information
     */
    @Override
    public UserDTO loginUser(UserDTO userDTO, HttpServletRequest httpServletRequest){

        try {
            // the httpServletRequest object performs user log in
            httpServletRequest.login(userDTO.getEmail(), userDTO.getPassword());
        } catch (ServletException e) {
            throw new AuthenticationException("Authentication error while log in");
        }
        // get actual logged-in user information
        UserEntity user = (UserEntity) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        // return actual logged-in user information without password hash
        return userMapper.toDTONoPassword(user);
    }

    /**
     *  A user log out service
     *
     * @param httpServletRequest    the object which maintains user session, the object performs a user logout
     * @return                      the message about successful log out
     */
    @Override
    public String logoutUser(HttpServletRequest httpServletRequest) {

        try {
            // the httpServletRequest object performs user log out
            httpServletRequest.logout();
            return "User has been logout";
        } catch(ServletException e) {
            throw new AuthenticationException("Authentication error while log out");
        }
    }

    /**
     *  The service returns information about actual logged user information
     *
     * @return                      a logged user information
     */
    public UserDTO loggedUserInfo() {
        try {
            // get actual logged-in user information
            UserEntity userEntity = (UserEntity) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

            // return actual logged-in user information without password hash
            return userMapper.toDTONoPassword(userEntity);
        } catch (ClassCastException e) {
            // casting error
            throw new AuthenticationException("Authentication error while getting logged user information");
        }
    }
}

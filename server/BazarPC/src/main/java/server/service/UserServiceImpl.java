package server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import server.dto.UserDTO;
import server.dto.mapper.UserMapper;
import server.entity.UserEntity;
import server.entity.repository.ComponentRepository;
import server.entity.repository.UserRepository;
import server.service.exceptions.NotFoundException;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    UserMapper userMapper;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ComponentRepository componentRepository;

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

        // convert user DTO to user entity
        UserEntity userEntity = userMapper.toEntity(userDTO);

        // save user entity to database and then convert to DTO
        return userMapper.toDTO(userRepository.save(userEntity));
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
        return userMapper.toDTO(findUserInDb(id));
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
        return userMapper.toDTO(userRepository.save(userEntity));
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
}

package server.service;

import org.springframework.web.multipart.MultipartFile;
import server.dto.ComponentDTO;

import java.util.List;

public interface ComponentService {

    /**
     *  Add new PC component to database
     *
     * @param componentDTO  data to be added to database
     * @param image01       image 01 to be stored
     * @param image02       image 02 to be stored
     * @param image03       image 03 to be stored
     * @return              added data to database
     */
    ComponentDTO addComponent( ComponentDTO componentDTO,
                               MultipartFile image01,
                               MultipartFile image02,
                               MultipartFile image03);

    /**
     *
     * Get a list of existing PC components from database
     *
     * @return              list of PC components
     */
    List<ComponentDTO> getAllComponents();

    /**
     *
     *  Read specific PC component from the database according its Id
     *
     * @param Id            PC component Id
     * @return              specific PC component read out from database
     */
    ComponentDTO getComponent(Long Id);

    /**
     *
     *  Read PC component list associated with a specific user
     *
     * @param userId        User ID for which the component list should be found
     * @return              the PC component list that belongs to user
     */
    List<ComponentDTO> getUserComponents(Long userId);

    /**
     *
     *  Update specific PC component in database
     *  PC component will be search according its Id in database and updated
     *
     * @param Id            PC component Id
     * @param componentDTO  updated PC component data
     * @return              edited PC component data
     */
    ComponentDTO updateComponent(Long Id, ComponentDTO componentDTO);

    /**
     *
     *  Remove specific PC component in database
     *
     * @param Id            PC component Id
     */
    void removeComponent(Long Id);
}

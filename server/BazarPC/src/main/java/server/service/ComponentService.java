package server.service;

import server.dto.ComponentDTO;

import java.util.List;

public interface ComponentService {

    /**
     *  Add new PC component to database
     *
     * @param componentDTO  data to be added to database
     * @return              added data to database
     */
    ComponentDTO addComponent(ComponentDTO componentDTO);

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

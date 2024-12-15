package server.service;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import server.dto.ComponentDTO;
import server.dto.mapper.ComponentMapper;
import server.entity.ComponentEntity;
import server.entity.repository.ComponentRepository;
import server.service.exceptions.NotFoundException;

import java.util.ArrayList;
import java.util.List;

@Service
public class ComponentServiceImpl implements ComponentService{

    @Autowired
    ComponentMapper componentMapper;

    @Autowired
    ComponentRepository componentRepository;

    /**
     *
     *  The method find PC component in database according its Id
     *
     * @param Id        PC component Id
     * @return          found PC component entity
     */
    private ComponentEntity getComponentFromDb(Long Id) {

        ComponentEntity componentEntity;

        try{
            // read out PC component from database according its Id
            componentEntity = componentRepository.findById(Id).orElseThrow(() -> new NotFoundException("PC component was not found in database"));

        } catch (NotFoundException e) {
            System.err.println("Error: " + e.getMessage());
            throw e;
        }

        return  componentEntity;
    }
    /**
     *
     *  The service method add a new PC component to database
     *
     * @param componentDTO  PC component data to be added to database
     * @return              PC component data which has been added to database
     */
    @Override
    public ComponentDTO addComponent(ComponentDTO componentDTO) {

        // prepare data for saving to database, convert DTO to entity
        ComponentEntity componentEntity = componentMapper.toEntity(componentDTO);

        // save data to database and return value
        return componentMapper.toDTO(componentRepository.save(componentEntity));
    }

    /**
     *
     *  The service method reads all existing PC components from the database and return the list of them
     *
     * @return          the list of PC components
     */
    @Override
    public List<ComponentDTO> getAllComponents() {

        // get all PC components from database
        List<ComponentEntity> componentEntities = componentRepository.findAll();

        // Prepare a list for component DTOs
        List<ComponentDTO> componentDTOs = new ArrayList<>();

        // convert entities to DTOs
        for(ComponentEntity entity : componentEntities) {
            componentDTOs.add(componentMapper.toDTO(entity));
        }

        // return the list of component DTOs
        return componentDTOs;
    }

    /**
     *
     *  The service method reads out PC component according its Id
     *
     * @param Id        PC component Id according the component will be found in the database
     * @return          PC component DTO
     */
    @Override
    public ComponentDTO getComponent(Long Id) {

        // convert PC component to DTO and return
        return componentMapper.toDTO(getComponentFromDb(Id));
    }

    @Override
    public ComponentDTO updateComponent(Long Id, ComponentDTO componentDTO) {


        // search PC component in database if exists
        ComponentEntity componentEntity = getComponentFromDb(Id);

        // set Id to PC component DTO
        componentDTO.setId(Id);

        // prepare entity for saving to database, update entity by data from DTO
        componentMapper.updateEntity(componentDTO, componentEntity);

        // save entity to repository
        componentRepository.save(componentEntity);


        // return updated PC component saved to database
        return componentMapper.toDTO(componentRepository.getReferenceById(Id));
    }

    @Override
    public void removeComponent(Long Id) {
        // remove PC component in database
        componentRepository.delete( getComponentFromDb(Id));
    }
}

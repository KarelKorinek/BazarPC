package server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import server.dto.ComponentDTO;
import server.dto.mapper.ComponentMapper;
import server.entity.ComponentEntity;
import server.entity.repository.ComponentRepository;

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

        // read out PC component from database according its Id
        ComponentEntity componentEntity = componentRepository.getReferenceById(Id);

        // convert PC component to DTO and return
        return componentMapper.toDTO(componentEntity);
    }
}

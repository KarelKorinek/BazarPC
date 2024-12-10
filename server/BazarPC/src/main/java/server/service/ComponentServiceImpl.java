package server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import server.dto.ComponentDTO;
import server.dto.mapper.ComponentMapper;
import server.entity.ComponentEntity;
import server.entity.repository.ComponentRepository;

@Service
public class ComponentServiceImpl implements ComponentService{

    @Autowired
    ComponentMapper componentMapper;

    @Autowired
    ComponentRepository componentRepository;

    @Override
    public ComponentDTO addComponent(ComponentDTO componentDTO) {

        // prepare data for saving to database, convert DTO to entity
        ComponentEntity componentEntity = componentMapper.toEntity(componentDTO);

        // save data to database and return value
        return componentMapper.toDTO(componentRepository.save(componentEntity));
    }
}

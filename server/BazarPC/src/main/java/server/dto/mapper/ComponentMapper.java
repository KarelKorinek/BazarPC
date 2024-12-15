package server.dto.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import server.dto.ComponentDTO;
import server.entity.ComponentEntity;

@Mapper(componentModel = "spring")
public interface ComponentMapper {

    ComponentEntity toEntity(ComponentDTO source);

    ComponentDTO toDTO(ComponentEntity source);

    void updateEntity(ComponentDTO source, @MappingTarget ComponentEntity target);
}

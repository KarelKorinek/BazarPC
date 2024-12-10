package server.dto.mapper;

import org.mapstruct.Mapper;
import server.dto.ComponentDTO;
import server.entity.ComponentEntity;

@Mapper(componentModel = "spring")
public interface ComponentMapper {

    ComponentEntity toEntity(ComponentDTO source);

    ComponentDTO toDTO(ComponentEntity source);
}

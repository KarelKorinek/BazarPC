package server.dto.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import server.dto.ComponentDTO;
import server.entity.ComponentEntity;

@Mapper(componentModel = "spring")
public interface ComponentMapper {

    ComponentEntity toEntity(ComponentDTO source);

    @Mapping(target = "userDetail", ignore = true)
    @Mapping(target = "imageFiles", ignore = true)
    ComponentDTO toDTO(ComponentEntity source);

    void updateEntity(ComponentDTO source, @MappingTarget ComponentEntity target);
}

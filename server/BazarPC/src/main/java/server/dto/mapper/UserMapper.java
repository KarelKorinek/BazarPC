package server.dto.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import server.dto.UserDTO;
import server.entity.UserEntity;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "password", ignore = true)
    UserDTO toDTONoPassword(UserEntity source);

    // password is not included, it has to be encoded first
    @Mapping(target = "password", ignore = true)
    UserEntity toEntityNoPassword(UserDTO source);

    void updateEntity(UserDTO source, @MappingTarget UserEntity target);
}

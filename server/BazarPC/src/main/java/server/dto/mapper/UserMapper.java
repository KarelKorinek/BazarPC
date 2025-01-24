package server.dto.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import server.dto.UserDTO;
import server.entity.UserEntity;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDTO toDTO(UserEntity source);

    UserEntity toEntity(UserDTO source);

    void updateEntity(UserDTO source, @MappingTarget UserEntity target);
}

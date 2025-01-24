package server.entity.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import server.entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

}

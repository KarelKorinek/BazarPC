package server.entity.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import server.entity.UserEntity;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    Optional<UserEntity> findByEmail(String username);
}

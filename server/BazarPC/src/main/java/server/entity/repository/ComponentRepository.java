package server.entity.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import server.entity.ComponentEntity;

public interface ComponentRepository extends JpaRepository<ComponentEntity, Long> {

}

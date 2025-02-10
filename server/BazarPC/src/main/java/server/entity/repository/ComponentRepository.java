package server.entity.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import server.entity.ComponentEntity;

import java.util.List;

public interface ComponentRepository extends JpaRepository<ComponentEntity, Long> {

    void deleteAllByUserId(Long Id);

    // find PC components associated with a specific user
    List<ComponentEntity> findByUserId(Long userId);
}

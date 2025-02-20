package server.entity.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import server.entity.ComponentEntity;

import java.util.List;

public interface ComponentRepository extends JpaRepository<ComponentEntity, Long> {

    void deleteAllByUserId(Long Id);

    // find PC components associated with a specific user
    Page<ComponentEntity> findByUserId(Long userId, Pageable pageable);

    // Pagination of PC components
    Page<ComponentEntity> findAll(Pageable pageable);
}

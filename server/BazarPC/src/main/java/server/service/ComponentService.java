package server.service;

import server.dto.ComponentDTO;

public interface ComponentService {

    /**
     *
     * @param componentDTO  data to be added to database
     * @return              added data to database
     */
    ComponentDTO addComponent(ComponentDTO componentDTO);


}

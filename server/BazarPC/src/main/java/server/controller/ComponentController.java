package server.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import server.dto.ComponentDTO;
import server.service.ComponentService;

import java.util.List;

@RestController
@RequestMapping("/bazar")
public class ComponentController {

    @Autowired
    ComponentService componentService;

    /**
     *
     *  Add new PC component to database
     *
     * @param componentDTO  data to save to database
     * @return              saved data to database
     */
    @PostMapping("/component")
    public ComponentDTO addComponent(@RequestBody ComponentDTO componentDTO) {
        return componentService.addComponent(componentDTO);
    }

    /**
     *
     *  Get a list of PC components from database
     *
     * @return              a list of PC components from database
     */
    @GetMapping("/component")
    public List<ComponentDTO> getAllComponents() {
        return componentService.getAllComponents();
    }
}

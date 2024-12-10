package server.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import server.dto.ComponentDTO;
import server.service.ComponentService;

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
}

package server.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
     * @param newComponentDTO  data to save to database
     * @return              saved data to database
     */
    @PostMapping("/component")
    public ComponentDTO addComponent(@RequestBody ComponentDTO newComponentDTO) {
        return componentService.addComponent(newComponentDTO);
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

    /**
     *
     *  Get specific PC component according its Id
     *
     * @param Id            PC component Id according it will be found in the database
     * @return              PC component DTO
     */
    @GetMapping("/component/{Id}")
    public ComponentDTO getComponent(@PathVariable Long Id) {
        return componentService.getComponent(Id);
    }

    /**
     *
     *  Update existing PC component in database
     *
     * @param Id                    Id of PC compoment to be updated
     * @param updatedComponentDTO   PC component data that update existing PC component in database
     * @return                      updated PC component from database
     */
    @PutMapping("/component/{Id}")
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ComponentDTO updateComponent(@PathVariable Long Id, @RequestBody ComponentDTO updatedComponentDTO) {
        return componentService.updateComponent(Id, updatedComponentDTO);
    }

    /**
     *
     *  Remove PC component in database
     *
     * @param Id                    PC component Id
     */
    @DeleteMapping("/component/{Id}")
    public void removeComponent(@PathVariable Long Id) {
        // remove PC component in database
        componentService.removeComponent(Id);
    }
}

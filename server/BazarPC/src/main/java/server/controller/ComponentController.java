package server.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
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
     *  Add new PC component to database.
     *  This action is allowed just to logged users.
     *
     * @param newComponentDTO  data to save to database
     * @param image01          image 01 to be stored
     * @param image02          image 02 to be stored
     * @param image03          image 03 to be stored
     *
     * @return                 saved data to database
     */
    @Secured("ROLE_USER")
    @PostMapping(value = "/component", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ComponentDTO addComponent( @RequestPart("image01") MultipartFile image01,
                                      @RequestPart("image02") MultipartFile image02,
                                      @RequestPart("image03") MultipartFile image03,
                                      @RequestPart("data") ComponentDTO newComponentDTO) {

        return componentService.addComponent(newComponentDTO, image01, image02, image03);
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
     *  Update existing PC component in database.
     *  This action is allowed just logged users.
     *
     * @param Id                    Id of PC compoment to be updated
     * @param updatedComponentDTO   PC component data that update existing PC component in database
     * @return                      updated PC component from database
     */
    @Secured("ROLE_USER")
    @PutMapping("/component/{Id}")
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ComponentDTO updateComponent(@PathVariable Long Id, @RequestBody ComponentDTO updatedComponentDTO) {
        return componentService.updateComponent(Id, updatedComponentDTO);
    }

    /**
     *
     *  Remove PC component in database.
     *  This action is allowed just to logged users.
     *
     * @param Id                    PC component Id
     */
    @Secured("ROLE_USER")
    @DeleteMapping("/component/{Id}")
    public void removeComponent(@PathVariable Long Id) {
        // remove PC component in database
        componentService.removeComponent(Id);
    }
}

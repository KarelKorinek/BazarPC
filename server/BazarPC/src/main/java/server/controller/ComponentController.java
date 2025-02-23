package server.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import server.dto.ComponentDTO;
import server.service.ComponentService;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ComponentController {

    @Autowired
    ComponentService componentService;

    /**
     *
     *  Add new PC component to database.
     *  This action is allowed just to logged users.
     *
     * @param newComponentDTO  data to save to database
     * @param images           a list of advertisement images to be stored on server
     *
     * @return                 saved data to database
     */
    @Secured("ROLE_USER")
    @PostMapping(value = "/component", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ComponentDTO addComponent( @RequestPart("images") List<MultipartFile> images,
                                      @RequestPart("data") ComponentDTO newComponentDTO) {

        return componentService.addComponent(newComponentDTO, images);
    }

    /**
     *
     *  Get a list of PC components from database
     *
     * @return              a list of PC components from database
     */
    @GetMapping("/components")
    public Page<ComponentDTO> getAllComponents(@RequestParam(defaultValue = "0") int pageNumber,
                                               @RequestParam(defaultValue = "10") int pageSize ) {
        return componentService.getAllComponents(   pageNumber, pageSize);
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
     *  Get a PC component list for specific user
     *
     * @param userId            User ID for which the component list should be found
     * @return                  the PC component list
     */
    @Secured("ROLE_USER")
    @GetMapping("/components/{userId}")
    public Page<ComponentDTO> getComponents(@PathVariable Long userId,
                                            @RequestParam(defaultValue = "0") int pageNumber,
                                            @RequestParam(defaultValue = "10") int pageSize ) {
        return  componentService.getUserComponents(userId, pageNumber, pageSize); }

    /**
     *
     *  Update existing PC component in database.
     *  This action is allowed just logged users.
     *
     * @param Id                    Id of PC compoment to be updated
     * @param updatedComponentDTO   PC component data that update existing PC component in database
     * @param images                a list of advertisement images to be updated on server
     * @return                      updated PC component from database
     */
    @Secured("ROLE_USER")
    @PutMapping(value = "/component/{Id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ComponentDTO updateComponent( @RequestPart(value = "images") List<MultipartFile> images,
                                         @RequestPart("data") ComponentDTO updatedComponentDTO,
                                         @PathVariable Long Id) {

        return componentService.updateComponent(Id, updatedComponentDTO, images);
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

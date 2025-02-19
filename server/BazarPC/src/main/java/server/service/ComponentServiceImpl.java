package server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import server.dto.ComponentDTO;
import server.dto.mapper.ComponentMapper;
import server.dto.mapper.UserMapper;
import server.entity.ComponentEntity;
import server.entity.UserEntity;
import server.entity.repository.ComponentRepository;
import server.entity.repository.UserRepository;
import server.service.exceptions.NotFoundException;
import server.service.exceptions.UnsupportedMediaException;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class ComponentServiceImpl implements ComponentService{

    @Autowired
    ComponentMapper componentMapper;

    @Autowired
    UserMapper userMapper;

    @Autowired
    ComponentRepository componentRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    FileStorageService fileStorageService;

    private ComponentDTO addAdditionalData(ComponentDTO componentDTO) {

        UserEntity userEntity;
       try {
           // get user entity for user detail
           userEntity = userRepository.getReferenceById(componentDTO.getUserId());

           // set user detail
           componentDTO.setUserDetail(userMapper.toDTONoPassword(userEntity));

           List<byte[]> imageFiles = new ArrayList<>();

           for(String imageNames : componentDTO.getImageNames()) {
               // read files from storage and store it in DTO
               imageFiles.add( getImage(imageNames));
           }

           // get images from storage
           componentDTO.setImageFiles(imageFiles);
       } catch (RuntimeException e) {
           System.err.println("Error: " + e.getMessage());
           throw e;
       }

        return componentDTO;
    }
    /**
     *
     *  The method find PC component in database according its Id
     *
     * @param Id        PC component Id
     * @return          found PC component entity
     */
    private ComponentEntity getComponentFromDb(Long Id) {

        ComponentEntity componentEntity;

        try{
            // read out PC component from database according its Id
            componentEntity = componentRepository.findById(Id).orElseThrow(() -> new NotFoundException("PC component was not found in database"));

        } catch (NotFoundException e) {
            System.err.println("Error: " + e.getMessage());
            throw e;
        }

        return  componentEntity;
    }

    /**
     *
     *  The method saves image on server
     *
     * @param   image               image to be stored on server
     * @return                      unique identifier file name
     *
     */
    private String saveImage(MultipartFile image) {

        try {
            // save image on server and set image name in DTO
            return fileStorageService.saveFile(image, FileType.IMAGE);
        } catch (IOException e) {
            System.err.println("Error: " + e.getMessage());
            throw new UnsupportedMediaException("IO exception while image storing");
        }
    }

    private byte[] getImage(String fileName) {

        try {
            return fileStorageService.getFile(fileName);
        } catch (IOException e) {
            System.err.println("Error: " + e.getMessage());
            throw new NotFoundException("The image was not found in storage");
        }
    }

    /**
     *
     *  The service method add a new PC component to database
     *
     * @param componentDTO  PC component data to be added to database
     * @param images        a list of advertisement images to be stored on server
     *
     * @return              PC component data which has been added to database
     */
    @Override
    public ComponentDTO addComponent(ComponentDTO componentDTO,
                                     List<MultipartFile> images) {

        List<String> imageNames = new ArrayList<>();

        // save images
        for(MultipartFile image : images) {
            imageNames.add(saveImage(image));
        }

        // store image names to DTO
        componentDTO.setImageNames( imageNames );

        // prepare data for saving to database, convert DTO to entity
        ComponentEntity componentEntity = componentMapper.toEntity(componentDTO);

        // save data to database and return value
        return componentMapper.toDTO(componentRepository.save(componentEntity));
    }

    /**
     *
     *  The service method reads all existing PC components from the database and return the list of them
     *
     * @return          the list of PC components
     */
    @Override
    public List<ComponentDTO> getAllComponents() {

        // get all PC components from database
        List<ComponentEntity> componentEntities = componentRepository.findAll();

        // Prepare a list for component DTOs
        List<ComponentDTO> componentDTOs = new ArrayList<>();

        // convert entities to DTOs
        for(ComponentEntity entity : componentEntities) {
            // convert entity to DTO
            ComponentDTO componentDTO = componentMapper.toDTO(entity);

            // add additional data to component DTO
            ComponentDTO componentDTOComplete = addAdditionalData(componentDTO);

            // add component to the list
            componentDTOs.add(componentDTOComplete);
        }

        // return the list of component DTOs
        return componentDTOs;
    }

    /**
     *
     *  The service method reads out PC component according its Id
     *
     * @param Id        PC component Id according the component will be found in the database
     * @return          PC component DTO
     */
    @Override
    public ComponentDTO getComponent(Long Id) {

        // get PC component data from database
        ComponentDTO componentDTO = componentMapper.toDTO(getComponentFromDb(Id));

        // add additional data to component DTO and return
        return addAdditionalData(componentDTO);
    }

    /**
     *
     *  Read PC component list associated with a specific user
     *
     * @param userId        User ID for which the component list should be found
     * @return              the PC component list that belongs to user
     */
    @Override
    public List<ComponentDTO> getUserComponents(Long userId) {

        // read out PC component list associated to specific user
        List<ComponentEntity> componentEntities = componentRepository.findByUserId(userId);

        // prepare empty list of component DTOs
        List<ComponentDTO> componentDTOs = new ArrayList<>();

        // convert PC component entities to PC component DTOs
        for(ComponentEntity componentEntity : componentEntities) {

            ComponentDTO componentDTO = componentMapper.toDTO(componentEntity);

            // add additional data to component DTO
            ComponentDTO componentDTOComplete = addAdditionalData(componentDTO);

            componentDTOs.add(componentDTOComplete);
        }

        return componentDTOs;
    }

    /**
     *
     *  Update PC component stored on server
     *
     * @param Id            PC component Id
     * @param componentDTO  updated PC component data
     * @param images        updated PC component images
     * @return              updated PC component DTO
     */
    @Override
    public ComponentDTO updateComponent( Long Id,
                                         ComponentDTO componentDTO,
                                         List<MultipartFile> images) {

        // read out image names from server
        List<String> imageNames = componentDTO.getImageNames();

        // delete images
        for(String imageName : imageNames) {
            fileStorageService.deleteFile(imageName);
        }

        // delete image names from the local list
        imageNames.clear();

        // save images
        for(MultipartFile image : images) {
            imageNames.add(saveImage(image));
        }

        // set new image names
        componentDTO.setImageNames( imageNames );

        // search PC component in database if exists
        ComponentEntity componentEntity = getComponentFromDb(Id);

        // set Id to PC component DTO
        componentDTO.setId(Id);

        // prepare entity for saving to database, update entity by data from DTO
        componentMapper.updateEntity(componentDTO, componentEntity);

        // save entity to repository
        componentRepository.save(componentEntity);


        // return updated PC component saved to database
        return componentMapper.toDTO(componentRepository.getReferenceById(Id));
    }

    /**
     *
     *  Remove PC component from database
     *
     * @param Id            PC component Id
     */
    @Override
    public void removeComponent(Long Id) {

        // get PC component entity from database
        ComponentEntity componentEntity = getComponentFromDb(Id);

        // delete images
        for(String imageName : componentEntity.getImageNames()) {
            fileStorageService.deleteFile(imageName);
        }

        // remove PC component in database
        componentRepository.delete( componentEntity);
    }
}

package server.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.FileStore;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileStorageServiceImpl implements FileStorageService {

    // images folder where all images are stored
    private final Path rootLocation = Paths.get("uploads");

    /**
     *  The method reads out the file extension
     *
     * @param fileName      file name
     *
     * @return              file extension
     */
    private String getFileExtension(String fileName) {
        return fileName.substring(fileName.lastIndexOf(".") + 1);
    }

    /**
     *  The method assigns unique name to image and it stores the file on server
     *
     * @param file          the file to be stored on server
     * @param fileType      the expected file type
     *
     * @return              unique identifier file name
     *
     * @throws IOException  the file type or the file extension is not valid
     */
    @Override
    public String saveFile(MultipartFile file,
                           FileType fileType) throws IOException {

        // read out file extension
        String fileExtension = getFileExtension(file.getOriginalFilename());

        // check what file type is required
        if(fileType == FileType.IMAGE) {

            // validate image extension
            if(  (fileExtension.equalsIgnoreCase("jpeg"))
               ||(fileExtension.equalsIgnoreCase("jpg"))
               ||(fileExtension.equalsIgnoreCase("webp"))
               ||(fileExtension.equalsIgnoreCase("png"))) {


                // obtain unique identifier for image
                String fileName = UUID.randomUUID() + "." + fileExtension;

                // save image on server
                Files.copy(file.getInputStream(), this.rootLocation.resolve(fileName));

                return fileName;
            }

            // image extension is not valid
            throw new IOException("Unsupported image extension");
        }

        // file type is not valid
        throw new IOException("Unsupported file type");
    }

    @Override
    public byte[] getFile(String fileName) throws IOException {

        // get file path
        Path filePath = Paths.get(String.valueOf(rootLocation), fileName);

        // return file bytes
        return Files.readAllBytes(filePath);
    }

    @Override
    public void deleteFile(String filename) {

        try {
            Files.deleteIfExists(this.rootLocation.resolve(filename));
        } catch (IOException e) {
            System.err.println("File deletion error: " + e.getMessage());
        }
    }
}

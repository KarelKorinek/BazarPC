package server.service;

import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

public interface FileStorageService {

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
    String saveFile(MultipartFile file,
                    FileType fileType) throws IOException;

    byte[] getFile(String fileName) throws IOException;
}

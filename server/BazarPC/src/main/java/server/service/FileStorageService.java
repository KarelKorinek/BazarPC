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

    /**
     *  Get file from server
     *
     * @param fileName          name of file
     * @return                  binary data of file
     * @throws IOException      error while getting file from server
     */
    byte[] getFile(String fileName) throws IOException;

    /**
     *  Delete file from server
     *
     * @param filename          name of file
     */
    void deleteFile(String filename);
}

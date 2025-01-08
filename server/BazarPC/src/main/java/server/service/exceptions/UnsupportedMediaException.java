package server.service.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;


@ResponseStatus(HttpStatus.UNSUPPORTED_MEDIA_TYPE)
public class UnsupportedMediaException extends RuntimeException {

    public UnsupportedMediaException(String message) {
        super(message);
    }
}

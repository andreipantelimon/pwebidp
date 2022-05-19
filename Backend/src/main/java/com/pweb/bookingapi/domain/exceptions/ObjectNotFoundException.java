package com.pweb.bookingapi.domain.exceptions;

public class ObjectNotFoundException extends Exception {
    public ObjectNotFoundException() {
        super("Not found.");
    }
}

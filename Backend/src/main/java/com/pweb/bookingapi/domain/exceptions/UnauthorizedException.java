package com.pweb.bookingapi.domain.exceptions;

public class UnauthorizedException extends Exception {
    public UnauthorizedException() {
        super("Unauthorized");
    }
}

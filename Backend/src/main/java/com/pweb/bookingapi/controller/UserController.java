package com.pweb.bookingapi.controller;

import com.google.firebase.auth.FirebaseAuthException;
import com.pweb.bookingapi.domain.exceptions.ObjectNotFoundException;
import com.pweb.bookingapi.domain.User;
import com.pweb.bookingapi.domain.exceptions.UnauthorizedException;
import com.pweb.bookingapi.service.UserService;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<User>> findAll() {
        return ResponseEntity.status(HttpStatus.OK).body(userService.findAll());
    }

    @GetMapping("/{username}")
    public ResponseEntity<User> findById(@PathVariable String username) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.findByEmail(username));
    }

    @GetMapping("/me")
    public ResponseEntity<User> findAuthenticatedUser(@RequestHeader(name="Authorization") String header) throws FirebaseAuthException {
        return ResponseEntity.status(HttpStatus.OK).body(userService.findAuthenticatedUser(header));
    }

    @PutMapping
    public ResponseEntity<User> updateUser(@RequestBody User user) throws ObjectNotFoundException {
        final User newUser = userService.updateUser(user);
        return ResponseEntity.status(HttpStatus.OK).body(newUser);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<User> deleteUser(@PathVariable String id,
                                           @RequestHeader(name="Authorization") String header) throws ObjectNotFoundException, UnauthorizedException {
//        User user = userService.findAuthenticatedUser(header);
//        if (!user.getUserRole().equals(UserRole.ADMIN)) {
//            throw new UnauthorizedException();
//        }
        return ResponseEntity.status(HttpStatus.OK).body(userService.deleteUser(id));
    }
}

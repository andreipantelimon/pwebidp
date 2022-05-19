package com.pweb.bookingapi.controller;

import com.google.firebase.auth.FirebaseAuthException;
import com.pweb.bookingapi.domain.User;
import com.pweb.bookingapi.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/register")
public class RegistrationController {

	private final UserService userService;

	@PostMapping
	public ResponseEntity<String> registrationRequest(@RequestBody User user) throws FirebaseAuthException {
		userService.register(user);
		return ResponseEntity.status(HttpStatus.CREATED).body("Registration successful");
	}

}

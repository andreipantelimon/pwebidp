package com.pweb.bookingapi.service;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import com.google.firebase.auth.UserRecord;
import com.pweb.bookingapi.domain.User;
import com.pweb.bookingapi.domain.UserRole;
import com.pweb.bookingapi.domain.exceptions.ObjectNotFoundException;
import com.pweb.bookingapi.domain.transfer.UserDto;
import com.pweb.bookingapi.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

	public static final String TOKEN_PREFIX = "Bearer ";

	private final UserRepository userRepository;

	public List<User> findAll() {
		return userRepository.findAll()
				.stream()
				.filter(user -> !user.getUserRole().equals(UserRole.ADMIN))
				.collect(Collectors.toList());
	}

	public User findAuthenticatedUser(String header) throws FirebaseAuthException {

		String authToken = header.replace(TOKEN_PREFIX, StringUtils.EMPTY);

		FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(authToken);

		return findByEmail(decodedToken.getEmail());
	}

	public User updateUser(User user) throws ObjectNotFoundException {
		Optional<User> oldUser = userRepository.findById(user.getId());

		if (!oldUser.isPresent()) {
			throw new ObjectNotFoundException();
		}

		if (user.getPassword() == null) {
			user.setPassword(oldUser.get().getPassword());
		}

		return userRepository.save(user);
	}

	public User findByEmail(String username) {
		return userRepository.findByEmail(username);
	}

	public void register(User user) throws FirebaseAuthException {

		UserRecord.CreateRequest request = new UserRecord.CreateRequest()
				.setEmail(user.getEmail())
				.setEmailVerified(false)
				.setPassword(user.getPassword())
				.setPhoneNumber(user.getPhone())
				.setDisplayName(user.getFullName())
				.setDisabled(false);

		UserRecord userRecord = FirebaseAuth.getInstance().createUser(request);

		UserDto created = UserDto.fromUserRecord(userRecord);

		if (user.getUserRole() == null) {
			user.setUserRole(UserRole.REFUGEE);
		} else {
			created.setUserRole(user.getUserRole());
		}

		userRepository.save(UserDto.toEntity(created));
		log.info("{} registered successfully!", user.getEmail());
	}

	public User deleteUser(String id) throws ObjectNotFoundException {
		Optional<User> oldUser = userRepository.findById(id);
		if (!oldUser.isPresent()) {
			throw new ObjectNotFoundException();
		} else {
			userRepository.deleteById(id);
		}
		return oldUser.get();
	}

}

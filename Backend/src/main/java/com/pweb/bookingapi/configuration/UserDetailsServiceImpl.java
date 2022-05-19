package com.pweb.bookingapi.configuration;

import com.pweb.bookingapi.domain.UserRole;
import com.pweb.bookingapi.domain.transfer.UserDto;
import com.pweb.bookingapi.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Objects;

@Slf4j
@Service(value = "UserService")
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

	private final UserService userService;

	@Override
	public UserDetails loadUserByUsername(String email) {

		final UserDto authenticatedUser = UserDto.fromEntity(userService.findByEmail(email));

		if (Objects.isNull(authenticatedUser)) {
			throw new UsernameNotFoundException("Invalid username or password.");
		}

		final String authenticatedEmail = authenticatedUser.getEmail();
		final String authenticatedPassword = authenticatedUser.getPassword();
		final UserRole userRole = authenticatedUser.getUserRole();
		final SimpleGrantedAuthority grantedAuthority = new SimpleGrantedAuthority(userRole.name());

		return new User(authenticatedEmail, authenticatedPassword, Collections.singletonList(grantedAuthority));
	}
}

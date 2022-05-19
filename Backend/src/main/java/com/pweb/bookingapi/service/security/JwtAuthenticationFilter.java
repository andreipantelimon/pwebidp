package com.pweb.bookingapi.service.security;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import com.pweb.bookingapi.domain.User;
import com.pweb.bookingapi.domain.security.FirebaseAuthenticationToken;
import com.pweb.bookingapi.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.lang.NonNull;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Objects;

@Slf4j
@Service
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

	public static final String TOKEN_PREFIX = "Bearer ";
	public static final String HEADER_STRING = "Authorization";
	public static final String LOGIN_REQUEST_URI = "/login";
	public static final String REGISTRATION_REQUEST_URI = "/register";

	private final UserService userService;

	@Override
	protected void doFilterInternal(HttpServletRequest req, @NonNull HttpServletResponse res, @NonNull FilterChain chain) throws IOException, ServletException {
		final String requestURI = req.getRequestURI();

		if (requestURI.contains(LOGIN_REQUEST_URI) || requestURI.contains(REGISTRATION_REQUEST_URI)) {
			chain.doFilter(req, res);
			return;
		}

		final String header = req.getHeader(HEADER_STRING);

		if (Objects.nonNull(header) && header.startsWith(TOKEN_PREFIX)) {
			String authToken = header.replace(TOKEN_PREFIX, StringUtils.EMPTY);

			try {
				FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(authToken);
				User user = userService.findByEmail(decodedToken.getEmail());

				if (user != null) {
					Authentication authentication = new FirebaseAuthenticationToken(decodedToken.getUid(), decodedToken);
					SecurityContextHolder.getContext().setAuthentication(authentication);
				}
			}
			catch (Exception e) {
				log.error("Authentication Exception : {}", e.getMessage());
			}
		}

		chain.doFilter(req, res);
	}
}

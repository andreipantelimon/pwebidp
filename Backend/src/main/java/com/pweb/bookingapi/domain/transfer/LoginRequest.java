package com.pweb.bookingapi.domain.transfer;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;

@Getter
@Setter
@NoArgsConstructor
public class LoginRequest {

	@NotEmpty(message = "{login_username_not_empty}")
	private String email;

	@NotEmpty(message = "{login_password_not_empty}")
	private String password;

}

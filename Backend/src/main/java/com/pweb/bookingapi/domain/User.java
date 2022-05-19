package com.pweb.bookingapi.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "users")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class User {

	@Id
	private String id;

	@Column(nullable = false, unique = true)
	private String email;

	@Column
	private String password;

	@Column(nullable = false)
	private String fullName;

	@Column(nullable = false)
	private String phone;

	@Column(name = "description", length = 500)
	private String description;

	@Column(columnDefinition = "boolean default false")
	private Boolean hasAccommodation;

	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private UserRole userRole;

	@PrePersist
	public void prePersist() {
		hasAccommodation = false;
	}
}

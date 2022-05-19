package com.pweb.bookingapi.repository;

import com.pweb.bookingapi.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {

	User findByEmail(String email);

	boolean existsByEmail(String email);

}



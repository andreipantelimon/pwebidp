package com.pweb.bookingapi.repository;

import com.pweb.bookingapi.domain.Accommodation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccommodationRepository extends JpaRepository<Accommodation, Long> {
}

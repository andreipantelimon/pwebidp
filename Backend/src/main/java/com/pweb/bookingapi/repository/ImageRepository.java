package com.pweb.bookingapi.repository;

import com.pweb.bookingapi.domain.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Long> {
}

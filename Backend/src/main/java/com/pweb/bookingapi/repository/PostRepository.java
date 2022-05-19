package com.pweb.bookingapi.repository;

import com.pweb.bookingapi.domain.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
}

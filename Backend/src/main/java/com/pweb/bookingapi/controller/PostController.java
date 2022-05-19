package com.pweb.bookingapi.controller;

import com.google.firebase.auth.FirebaseAuthException;
import com.pweb.bookingapi.domain.Post;
import com.pweb.bookingapi.domain.exceptions.ObjectNotFoundException;
import com.pweb.bookingapi.domain.transfer.Filters;
import com.pweb.bookingapi.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/posts")
public class PostController {

    private final PostService postService;

    @PostMapping
    public ResponseEntity<Post> createPost(@RequestHeader(name="Authorization") String header,
                                           @RequestBody Post post) throws FirebaseAuthException {
        return ResponseEntity.status(HttpStatus.CREATED).body(postService.createPost(post, header));
    }

    @GetMapping
    public ResponseEntity<List<Post>> getAllPosts(@RequestHeader(name="Authorization") String header,
                                                  @RequestParam(required = false) Date startDate,
                                                  @RequestParam(required = false) Date endDate,
                                                  @RequestParam(required = false) String city,
                                                  @RequestParam(required = false) String keywords,
                                                  @RequestParam(required = false) Boolean shared,
                                                  @RequestParam(required = false) Boolean available,
                                                  @RequestParam(required = false) Integer numberOfPeople) throws FirebaseAuthException {
        Filters filters = new Filters(startDate, endDate, city, keywords, shared, available, numberOfPeople);
        return ResponseEntity.status(HttpStatus.OK).body(postService.getAllPosts(header, filters));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Post> getById(@PathVariable Long id) throws ObjectNotFoundException {
        return ResponseEntity.status(HttpStatus.OK).body(postService.getById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Post> delete(@PathVariable Long id) throws ObjectNotFoundException {
        return ResponseEntity.status(HttpStatus.OK).body(postService.delete(id));
    }

    @PutMapping
    public ResponseEntity<Post> update(@RequestHeader(name="Authorization") String header,
                                       @RequestBody Post post) throws ObjectNotFoundException, FirebaseAuthException {
        Post updated = postService.update(post, header);
        if (updated == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        }
        return ResponseEntity.status(HttpStatus.OK).body(updated);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Post> book(@RequestHeader(name="Authorization") String header,
                                     @PathVariable Long id,
                                     @RequestParam Integer numPeople) throws FirebaseAuthException, ObjectNotFoundException {
        return ResponseEntity.status(HttpStatus.OK).body(postService.book(id, header, numPeople));
    }
}

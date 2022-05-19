package com.pweb.bookingapi.service;

import com.google.firebase.auth.FirebaseAuthException;
import com.pweb.bookingapi.domain.Post;
import com.pweb.bookingapi.domain.User;
import com.pweb.bookingapi.domain.UserRole;
import com.pweb.bookingapi.domain.exceptions.ObjectNotFoundException;
import com.pweb.bookingapi.domain.transfer.Filters;
import com.pweb.bookingapi.domain.transfer.MailDto;
import com.pweb.bookingapi.listener.EmailProducer;
import com.pweb.bookingapi.repository.AccommodationRepository;
import com.pweb.bookingapi.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;

    private final AccommodationRepository accommodationRepository;

    private final UserService userService;

    private final EmailProducer sender;

    public Post createPost(Post post, String header) throws FirebaseAuthException {
        User user = userService.findAuthenticatedUser(header);
        post.setCreatedBy(user);

        accommodationRepository.save(post.getAccommodation());
        return postRepository.save(post);
    }

    public Post getById(Long id) throws ObjectNotFoundException {
        return postRepository.findById(id).orElseThrow(ObjectNotFoundException::new);
    }

    public Post delete(Long id) throws ObjectNotFoundException {
        Post post = postRepository.findById(id).orElseThrow(ObjectNotFoundException::new);
        postRepository.deleteById(id);
        return post;
    }

    public Post update(Post post, String header) throws FirebaseAuthException, ObjectNotFoundException {
        Post oldPost = postRepository.findById(post.getId()).orElseThrow(ObjectNotFoundException::new);

        User user = userService.findAuthenticatedUser(header);
        if (!oldPost.getCreatedBy().getId().equals(user.getId())) {
            return null;
        }

        post.setTimestamp(oldPost.getTimestamp());
        post.setCreatedBy(oldPost.getCreatedBy());
        post.getAccommodation().setId(oldPost.getAccommodation().getId());

        return postRepository.save(post);
    }

    public Post book(Long id, String header, Integer numberOfPeople) throws ObjectNotFoundException, FirebaseAuthException {
        User user = userService.findAuthenticatedUser(header);
        Post post = postRepository.findById(id).orElseThrow(ObjectNotFoundException::new);

        if (post.getAccommodation().getMaxPeople() - post.getAccommodation().getCurrentPeople() < numberOfPeople) {
            throw new IllegalArgumentException("Too many people");
        }

        post.getAccommodation().getGuests().add(user);
        post.getAccommodation().addPeople(numberOfPeople);
        user.setHasAccommodation(true);
        if (post.getAccommodation().getCurrentPeople().equals(post.getAccommodation().getMaxPeople())) {
            post.setAvailable(false);
        }

        sender.send(new MailDto("Rezervare Subiect", "Continut mail", "pantelimon.andy@gmail.com"));

        return postRepository.save(post);
    }

    public List<Post> getAllPosts(String header, Filters filters) throws FirebaseAuthException {
        User user = userService.findAuthenticatedUser(header);

        List<Post> posts = postRepository.findAll();
        checkAvailable(posts);
        posts = applyFilters(user, posts, filters);

        return posts;
    }

    private void checkAvailable(List<Post> posts) {
        Date current = new java.sql.Date(System.currentTimeMillis());

        posts.forEach(post -> {
            if (post.getAccommodation().getEndDate().before(current)) {
                post.setAvailable(false);
                postRepository.save(post);
            }
        });
    }

    private List<Post> applyFilters(User user, List<Post> posts, Filters filters) {
        if (user.getUserRole().equals(UserRole.HOST)) {
            posts = filterByCreator(user, posts);
        } else {
//            posts = filterByAvailable(true, posts);
        }

        if (filters.getShared() != null && !filters.getShared()) {
            posts = filterByShared(posts);
        }

        if (filters.getCity() != null) {
            posts = filterByCity(filters.getCity(), posts);
        }

        posts = filterByDays(filters.getStartDate(), filters.getEndDate(), posts);

        if (filters.getNumberOfPeople() != null) {
            posts = filterByNumberOfPeople(filters.getNumberOfPeople(), posts);
        }

        if (filters.getAvailable() != null) {
            posts = filterByAvailable(filters.getAvailable(), posts);
        } else {
//            posts = filterByAvailable(true, posts);
        }

        return posts;
    }

    private List<Post> filterByShared(List<Post> posts) {
        return posts.stream().filter(post -> post.getAccommodation().getGuests().isEmpty())
                .collect(Collectors.toList());
    }

    private List<Post> filterByCity(String city, List<Post> posts) {
        return posts.stream().filter(post -> post.getAccommodation().getCity().equals(city))
                .collect(Collectors.toList());
    }

    private List<Post> filterByNumberOfPeople(Integer numberOfPeople, List<Post> posts) {
        return posts.stream().filter(post -> post.getAccommodation().getMaxPeople() - post.getAccommodation().getCurrentPeople() >= numberOfPeople)
                .collect(Collectors.toList());
    }

    private List<Post> filterByDays(Date startDate, Date endDate, List<Post> posts) {
        return posts.stream().filter(post -> {
            Boolean startCondition = startDate == null || !startDate.before(post.getAccommodation().getStartDate());
            Boolean endCondition = endDate == null || !endDate.after(post.getAccommodation().getEndDate());
            return startCondition && endCondition;
        })
                .collect(Collectors.toList());
    }

    private List<Post> filterByAvailable(Boolean available, List<Post> posts) {
        return posts.stream().filter(post -> post.getAvailable() == available)
                .collect(Collectors.toList());
    }

    private List<Post> filterByCreator(User user, List<Post> posts) {
        return posts.stream().filter(post -> post.getCreatedBy().getId().equals(user.getId()))
                .collect(Collectors.toList());
    }
}

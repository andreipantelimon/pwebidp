package com.pweb.bookingapi.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "accommodations")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Accommodation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "address", nullable = false, length = 70)
    private String address;

    @Column(name = "city", nullable = false, length = 35)
    private String city;

    @Column(name = "county", length = 30)
    private String county;

    @Column(name = "description", length = 500)
    private String description;

    private Integer maxPeople;

    private Integer currentPeople;

    private Date startDate;

    private Date endDate;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "accommodation_id")
    private List<User> guests = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "accommodation_id")
    private List<Image> images = new ArrayList<>();

    @PrePersist
    public void prePersist() {
        currentPeople = 0;
    }

    public void addPeople(Integer numberOfPeople) {
        currentPeople += numberOfPeople;
    }

}

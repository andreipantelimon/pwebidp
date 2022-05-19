package com.pweb.bookingapi.domain.transfer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Filters {
    private Date startDate;
    private Date endDate;
    private String city;
    private String keywords;
    private Boolean shared;
    private Boolean available;
    private Integer numberOfPeople;
}

package com.pweb.bookingapi.domain.transfer;

import com.google.firebase.auth.UserRecord;
import com.pweb.bookingapi.domain.User;
import com.pweb.bookingapi.domain.UserRole;
import lombok.*;

@AllArgsConstructor
@Getter
@Setter
@Builder
@NoArgsConstructor
public class UserDto {
    private String id;
    private String fullName;
    private String phone;
    private String password;
    private UserRole userRole;
    private String email;
    private String description;
    private Boolean hasAccommodation;

    public static UserDto fromUserRecord(UserRecord userRecord) {
        return UserDto.builder()
                .id(userRecord.getUid())
                .fullName(userRecord.getDisplayName())
                .phone(userRecord.getPhoneNumber())
//                .password(userRecord.get)
                .email(userRecord.getEmail())
                .build();
    }

    public static UserDto fromEntity(User user) {
        return UserDto.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .phone(user.getPhone())
                .userRole(user.getUserRole())
//                .password(userRecord.get)
                .email(user.getEmail())
                .description(user.getDescription())
                .hasAccommodation(user.getHasAccommodation())
                .build();
    }

    public static User toEntity(UserDto userDto) {
        return User.builder()
                .id(userDto.getId())
                .fullName(userDto.getFullName())
                .phone(userDto.getPhone())
                .userRole(userDto.getUserRole())
//                .password(userRecord.get)
                .email(userDto.getEmail())
                .description(userDto.getDescription())
                .hasAccommodation(userDto.getHasAccommodation())
                .build();
    }
}

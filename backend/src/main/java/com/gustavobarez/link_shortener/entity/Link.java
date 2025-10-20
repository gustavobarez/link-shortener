package com.gustavobarez.link_shortener.entity;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document(collection = "links")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Link {

    @Id
    private String id;

    private String originalUrl;

    private String shortUrl;

    private String publicId;

    private String password;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private LocalDateTime deletedAt;

}

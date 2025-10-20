package com.gustavobarez.link_shortener.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.gustavobarez.link_shortener.entity.Link;

@Repository
public interface LinkRepository extends MongoRepository<Link, String> {
    Optional<Link> findByOriginalUrl(String originalUrl);

    Optional<Link> findByShortUrl(String shortUrl);

    Optional<Link> findByPublicId(String publicId);
}
